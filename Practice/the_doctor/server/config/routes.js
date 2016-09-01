'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

log('Setting up Express routes', DEBUG);

var users = require('./../controllers/users.ctrl.js');;
var appointments = require('./../controllers/appointments.ctrl.js');;

exports = module.exports = routes;

function routes(app) {
    app.post('/login', users.login);
    app.post('/logout', users.logout);
    app.get('/appointments', appointments.index);
    app.post('/appointments', appointments.create);
    app.delete('/appointments/:id', appointments.delete);
}
