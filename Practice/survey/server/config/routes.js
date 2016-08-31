'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

log('Setting up Express routes', DEBUG);

var users = require('./../controllers/users.ctrl.js');;
var surveys = require('./../controllers/surveys.ctrl.js');;

exports = module.exports = routes;

function routes(app) {
    app.post('/login', users.login);
    app.post('/logout', users.logout);
    app.get('/surveys', surveys.index);
    app.get('/surveys/:id', surveys.show);
    app.post('/surveys', surveys.create);
    app.post('/surveys/:id/:oidx', surveys.vote);
    app.delete('/surveys/:id', surveys.delete);
}
