'ues strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

var mongoose = require('mongoose');

log('Getting FriendsController', DEBUG);

module.exports = new FriendsController();

function FriendsController() {
    var ctrl = this;
    var Friends = mongoose.model('friends');

    ctrl.create = createFriend;
    ctrl.delete = deleteFriend;
    ctrl.index = friendsIndex;
    ctrl.show = showFriend;
    ctrl.update = updateFriend;

    function createFriend(request, response) {
        var Friend = new Friends(request.body);

        Friend.save((err, friend) => {
            if (err) {
                response.status(500).json({error: err});
            } else {
                response.json({create: friend});
            }
        });
    }

    function deleteFriend(request, response) {
        Friends.remove({_id: request.params.id}, (err) => {
            if (err) {
                response.status(500).json({error: err});
            } else {
                response.json({delete: request.params.id});
            }
        });
    }

    function friendsIndex(request, response) {
        Friends.find({}, (err, friends) => {
            if (err) {
                response.status(500).json({error: err});
            } else {
                response.json({index: friends});
            }
        });
    }

    function showFriend(request, response) {
        Friends.findOne({_id: request.params.id}, (err, friend) => {
            if (err) {
                response.status(500).json({error: err});
            } else {
                response.json({show: friend});
            }
        })
    }

    function updateFriend(request, response) {
        var Friend = new Friends(request.body);
        var updateDoc = Friend.toObject();

        delete updateDoc._id;

        Friends.update({_id: request.params.id}, updateDoc, (err, friend) => {
            if (err) {
                response.status(500).json({error: err});
            } else {
                response.json({update: friend});
            }
        });
    }
}
