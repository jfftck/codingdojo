'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GamesSchema = Schema({
    name: {type: String, required: true},
    correct: {type: Number},
    total: {type: Number}
},
{timestamps: true});

mongoose.model('games', GamesSchema);
