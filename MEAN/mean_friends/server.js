'use strict';

const PORT = process.env.PORT || 8000;

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('./logger/logger');

const DEBUG = logger.levels.DEBUG;
const log = logger.Logger(DEBUG).log;

var app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.json());

require('./server/config/connection.js');
require('./server/config/routes.js')(app);

var listener = app.listen(PORT, () => {
    log(['Listening on port:', listener.address().port]);
});
