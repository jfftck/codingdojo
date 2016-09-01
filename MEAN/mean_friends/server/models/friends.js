'use strict';

var mongoose = require('mongoose');

var FriendsSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthday: {type: String, required: true}
}, {
    timestamps: true
});

mongoose.model('friends', FriendsSchema);
