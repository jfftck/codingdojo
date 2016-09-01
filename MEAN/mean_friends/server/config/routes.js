'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
var log = logger.Logger().log;

var friends = require('./../friends/friends.ctrl');

log('Setting up Express routes', DEBUG);

exports = module.exports = routes;

function routes(app) {
    app.get('/friends', friends.index);
    app.get('/friends/:id', friends.show);
    app.post('/friends', friends.create);
    app.put('/friends/:id', friends.update);
    app.delete('/friends/:id', friends.delete);
}
