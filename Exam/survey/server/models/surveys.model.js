'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = Schema({
    question: {type: String, required: true, minlength: 8},
    user: {type: String},
    options: [{
        option: {type: String, required: true, minlength: 3},
        votes: [{
            name: {type: String}
        }]
    }]
},
{timestamp: true});

mongoose.model('surveys', SurveySchema);
