process.title = 'catApp';

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('config');

const express = require('express');
let app = express();

mongoose.connect(config.DBHost, { useMongoClient: true, promiseLibrary: global.Promise }).then(function(db) {
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('connected to mongo');
    });
}).catch(function() {
    console.log("meh connection");
});

let db = mongoose.connection;

let catSchema = mongoose.Schema({ name: String });
let Cat = mongoose.model('Cat', catSchema);

//don't show the log when testing
if (config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => {
    res.json({message: "works"});
    console.log(app.get('env'));
});
app.get("/5", (req, res) => res.json({message: "works 5"}));

// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
