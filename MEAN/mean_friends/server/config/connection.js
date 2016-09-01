'use strict';

var logger = require('./../../logger/logger');
const CRITICAL = logger.levels.CRITICAL;
const DEBUG = logger.levels.DEBUG;
const log = logger.Logger().log;
/*
*  database information
*/
const dbURI = 'localhost/friends';

log('mongo connection, mongoose setup', DEBUG);
//This file is complete other than changing our DB
var mongoose = require('mongoose');
/*
*  require file-system so that we can load, read, require all of the model files
*/
var fs = require('fs');
/*
*  utilize path for easy dir/file joining
*/
var path = require('path');
/*
*  Dir where our models are located
*/
var models_path = path.join(__dirname, "../models");
/*
*   Regular expression that checks for .js extension
*/
var jsExtRegEx = new RegExp(".js$", "i");
/*
* Connect to the database
*/
mongoose.connect('mongodb://' + dbURI);
/*
*  CONNECTION EVENTS
*  When successfully connected
*/
mongoose.connection.on('connected', function () {
  log(`Mongoose default connection open to ${ dbURI }`);
});
/*
*  If the connection throws an error
*/
mongoose.connection.on( 'error', function ( err ) {
  log(`Mongoose default connection error: ${ err }`, CRITICAL);
});
/*
*  When the connection is disconnected
*/
mongoose.connection.on( 'disconnected', function () {
  log('Mongoose default connection disconnected');
});
/*
*  If the Node process ends, close the Mongoose connection
*/
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
/*
*  read all of the files in the models dir and
*  check if it is a javascript file before requiring it
*/
fs.readdirSync(models_path).forEach(function(file) {
  if(jsExtRegEx.test(file)) {
    require(path.join(models_path, file));
  }
});
