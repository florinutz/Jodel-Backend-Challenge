process.title = 'catApp';

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cat = require('./route/cat');
const config = require('config');

const app = require('express')();

mongoose.connect(config.DBHost, { useMongoClient: true, promiseLibrary: global.Promise });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// The enviroment variable NODE_ENV is test against test to disable morgan log in the command line
// or it would interfere with the test output.
if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('combined')); //'combined' outputs the Apache style logs
}

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => res.json({message: "try /cat"}) );

app.route("/cat")
    .get(cat.getCats)
    .post(cat.postCat);

module.exports = app;
