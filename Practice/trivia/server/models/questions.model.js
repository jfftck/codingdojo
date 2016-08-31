'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionsSchema = Schema({
    question: {type: String, required: true, minlength: 15},
    correctAnswer: {type: String, required: true},
    fake1: {type: String, required: true},
    fake2: {type: String, required: true}
},
{timestamps: true});

mongoose.model('questions', QuestionsSchema);
