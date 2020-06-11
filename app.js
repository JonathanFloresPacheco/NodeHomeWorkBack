const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config/config');
const app = express();

const startupdebug = require('debug')('app:startup');

// Routing
var listjobs = require('./routes/listjobs');
var matery = require('./routes/matery');
var teachers = require('./routes/teachers');
// Conection to BD
mongoose.connect(config.dbUrl)
    .then((conn) => // we're connected!
        {
            startupdebug('connected to dB');
        })
    .catch(err => console.error('Connection Error', err));
// Url
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true})); 
app.use(bodyParser.json());

app.use(morgan('dev'));
//CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT','DELETE'); //,DELETE,OPTIONS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes
app.use('/api/listjobs', listjobs);
app.use('/api/matery', matery);
app.use('/api/teachers', teachers);

var port = process.env.PORT || 8080;

app.listen(port, () => {
    startupdebug('Listening @', port);
});
