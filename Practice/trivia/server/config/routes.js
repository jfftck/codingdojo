'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

log('Setting up Express routes', DEBUG);

var users = require('./../controllers/users.ctrl.js');
var games = require('./../controllers/games.ctrl.js');
var questions = require('./../controllers/questions.ctrl.js');

exports = module.exports = routes;

function routes(app) {
    app.post('/login', users.login);
    app.post('/logout', users.logout);
    app.get('/games', games.index);
    app.post('/games', games.create);
    app.get('/questions', questions.index);
    app.post('/questions', questions.create);
}
