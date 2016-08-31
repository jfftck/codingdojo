angular.module('app').controller('PlayersController',
    ['playerFactory', PlayersController]);

function PlayersController(playerFactory) {
    var vm = this;

    vm.add = addPlayer;
    vm.delete = deletePlayer;
    vm.players = [];

    getPlayers();

    function addPlayer() {
        playerFactory.add({name: vm.name});
    }

    function deletePlayer(index) {
        playerFactory.delete(index);
    }

    function getPlayers() {
        playerFactory.index(function(data) {
            vm.players = data;
        })
    }
}
