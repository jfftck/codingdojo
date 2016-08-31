angular.module('app').factory('teamFactory', teamFactory);

function teamFactory() {
    var factory = {};
    var teams = [];

    factory.add = addTeam;
    factory.addPlayer = addPlayer;
    factory.delete = deleteTeam;
    factory.deletePlayer = deletePlayer;
    factory.index = teamsIndex;

    function addPlayer(index, player) {
        if (teams[index]) {
            teams[index]._players.push(player);
        } else {
            throw new RangeError('Invalid index.');
        }
    }

    function addTeam(team) {
        if (!team._players && !Array.isArray(team._players)) {
            team._players = [];
        }

        teams.push(team);
    }

    function deletePlayer(index, player) {
        var teamPlayers = teams[index]._players;

        teamPlayers.splice(teamPlayers.indexOf(player), 1);
    }

    function deleteTeam(index) {
        teams.splice(index, 1);
    }

    function teamsIndex(callback) {
        callback(teams);
    }

    return factory;
}
