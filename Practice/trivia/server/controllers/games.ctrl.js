'use strict';

var logger = require('./../../logger/logger');
const DEBUG = logger.levels.DEBUG;
const WARN = logger.levels.WARN;
var log = logger.Logger().log;

log('Loading games controller', DEBUG);

var mongoose = require('mongoose');

exports = module.exports = new GamesController();

function GamesController() {
    var ctrl = this;
    var Games = mongoose.model('games');

    this.create = createGame;
    this.index = gamesIndex;

    function createGame(request, response) {
        var game = new Games(request.body.appointment);

        game.save((err) => {
            if (err) {
                response.status(403).json({error: err});
            } else {
                response.json({game: game});
            }
        });
    }

    function gamesIndex(request, response) {
        Games.find({}, (err, games) => {
            if (err) {
                response.status(403).json({error: err});
            } else {
                response.json({games: games});
            }
        });
    }
}
