'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = Schema({
    answer: {type: String, required: true, minlength: 10},
    details: {type: String},
    _questions: [{type: Schema.Types.ObjectId, ref: 'questions'}],
    _users: [{type: Schema.Types.ObjectId, ref: 'users'}],
    _likes: [{type: Schema.Types.ObjectId, ref: 'users'}]
});

mongoose.model('answers', AnswerSchema);
