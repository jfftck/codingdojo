'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

log('Setting up Express routes', DEBUG);

var users = require('./../controllers/users.ctrl.js');;
var bucket = require('./../controllers/buckets.ctrl.js');;

exports = module.exports = routes;

function routes(app) {
    app.post('/login', users.login);
    app.post('/logout', users.logout);
    app.get('/users', users.index);
    app.post('/bucket', bucket.create);
    app.put('/bucket/:id', bucket.complete);
    app.get('/bucket/:user', bucket.show);
}
