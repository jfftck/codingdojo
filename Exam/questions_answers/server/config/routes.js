'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

log('Setting up Express routes', DEBUG);

var users = require('./../users/users.ctrl.js');;
// var questions = require('./../questions/questions.ctrl.js');;
// var answers = require('./../answers/answersl.ctrl.js');;

exports = module.exports = routes;

function routes(app) {
    app.post('/login', users.login);
    app.post('/logout', users.logout);
    app.get('/session', users.session);
    // app.get('/questions', questions.index);
    // app.get('/questions/:id', questions.show);
    // app.post('/questions', questions.create);
    // app.get('/answers', answers.index);
    // app.get('/answers/:id', answers.show);
    // app.post('/answers', answers.create);
}
