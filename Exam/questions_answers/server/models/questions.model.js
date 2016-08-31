'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = Schema({
    question: {type: String, required: true, minlength: 10},
    description: {type: String},
    _user: {type: Schema.Types.ObjectId, ref: 'user'},
    _answers: [{type: Schema.Types.ObjectId, ref: 'answers'}]
});

mongoose.model('questions', QuestionSchema);
