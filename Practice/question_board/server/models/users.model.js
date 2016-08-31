'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: {type: String, required: true, minlength: 4},
    _questions: [{type: Schema.Types.ObjectId, ref: 'questions'}],
    _answers: [{type: Schema.Types.ObjectId, ref: 'answers'}]
});

mongoose.model('users', UserSchema);
