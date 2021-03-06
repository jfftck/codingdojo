'use strict';

const PORT = process.env.PORT || 8000;
const SESS = {
    secret: '5UP3R53KR37',
    resave: false,
    saveUninitialized: true
}

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var logger = require('./logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger(DEBUG).log;

var app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(bodyParser.json());

app.use(session(SESS));

require('./server/config/connection.js');
require('./server/config/routes.js')(app);

var listener = app.listen(PORT, server);

function server() {
    log(['Listening on port:', listener.address().port]);
}
