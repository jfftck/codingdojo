angular.module('app').factory('playerFactory', playerFactory);

function playerFactory() {
    var factory = {};
    var players = [];

    factory.add = addPlayer;
    factory.addTeam = addTeam;
    factory.delete = deletePlayer;
    factory.deleteTeam = deleteTeam;
    factory.index = playersIndex;

    function addPlayer(player) {
        if (!player._team) {
            player._team = null;
        }

        players.push(player);
    }

    function addTeam(index, team) {
        players[index]._team = team;
    }

    function deletePlayer(index) {
        players.splice(index, 1);
    }

    function deleteTeam(index) {
        players[index]._team = null;
    }

    function playersIndex(callback) {
        callback(players);
    }

    return factory;
}
