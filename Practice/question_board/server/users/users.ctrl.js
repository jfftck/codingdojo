'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
const WARN = logger.levels.WARN;
var log = logger.Logger().log;

log('Loading users controller', DEBUG);

var mongoose = require('mongoose');

exports = module.exports = new UsersController();

function UsersController() {
    var ctrl = this;
    var Users = mongoose.model('users');

    ctrl.login = login;
    ctrl.logout = logout;
    ctrl.session = session;

    function createUser(name) {
        var user = new Users({name: name});

        user.save((err) => {
            if (err) {
                log(err, WARN);
            }
        });
    }

    function login(request, response) {
        log(request, DEBUG);

        var name = request.body.name;

        Users.findOne({name: name}, (err, user) => {
            if (err) {
                response.status(500).json({error: err});
            } else if (!user) {
                createUser(name);
            }

            request.session.name = {name: name};
            response.cookie('name', name, {httpOnly: false});

            response.json({name: name});
        });
    }

    function logout(request, response) {
        if (request.session) {
            response.clearCookie('name');
            delete request.session;
        }

        response.json({logout: true});
    }

    function session() {
        var name = request.session.name || '';

        response.json({name: name});
    }
}
