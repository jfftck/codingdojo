'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BucketsSchema = Schema({
    title: {type: String, required: true, minlength: 5},
    complete: {type: Boolean},
    description: {type: String, required: true, minlength:10},
    owner: {type: String, required: true},
    tagged: {type: String, required: true}
},
{timestamps: true});

mongoose.model('buckets', BucketsSchema);
