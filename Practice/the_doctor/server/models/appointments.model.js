'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentsSchema = Schema({
    name: {type: String, required: true, minlength: 4},
    date: {type: Date, required: true},
    time: {type: Date, required: true},
    complain: {type: String, required: true, minlength:10}
},
{timestamp: true});

mongoose.model('appointments', AppointmentsSchema);
