'use strict';

const PORT = process.env.PORT || 8000;

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var logger = require('./logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger(DEBUG).log;

var app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));

require('./server/config/connection');
require('./server/config/routes')(app);

var listener = app.listen(PORT, server);

function server() {
    log('Listening on port:', listener.address().port);
}
