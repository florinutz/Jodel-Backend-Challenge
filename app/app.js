process.title = 'catapp';

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('config');
const redis = require('redis');
const apicache = require('apicache');

const cat = require('./route/cat');

const app = require('express')();

mongoose.connect(config.DBHost, { useMongoClient: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// The enviroment variable NODE_ENV is test against test to disable morgan log in the command line
// or it would interfere with the test output.
let testing = config.util.getEnv('NODE_ENV') === 'test';
if (!testing) {
    app.use(morgan('combined')); //'combined' outputs the Apache style logs
}

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => res.json({message: "better try /cat"}) );

const redisClient = redis.createClient("redis://redis");
redisClient.on('error', function (err) {
    console.log('Redis client error: ' + err)
});

let cacheWithRedis = apicache.options({
        redisClient: redisClient,
        headers: { 'cache-control': 'no-cache' }
    }).middleware;

let shouldBeCached = (req, res) => {
    return res.statusCode === 200 && !testing;
};
const cache = cacheWithRedis('10 seconds', shouldBeCached);

app.route("/cat")
    .get(cache, cat.getCats)
    .post(cat.postCat);

module.exports = app;
