angular.module('app').controller('AssociationsController',
    ['playerFactory', 'teamFactory', AssociationsController]);

function AssociationsController(playerFactory, teamFactory) {
    var vm = this;

    vm.add = addAssociation;
    vm.delete = deleteAssociation;
    vm.players = [];
    vm.teams = [];
    vm.associations = [];

    getData();
    createAssociations();

    function addAssociation() {
        var playerIndex = vm.players.indexOf(vm.player);
        var teamIndex = vm.teams.indexOf(vm.team);

        if (playerIndex < 0 || teamIndex < 0) {
            return;
        }

        playerFactory.addTeam(playerIndex, vm.teams[teamIndex]);
        teamFactory.addPlayer(teamIndex, vm.players[playerIndex]);

        createAssociations();
    }

    function createAssociations() {
        vm.associations = [];

        for (var i = 0, len = vm.players.length; i < len; i++) {
            if (vm.players[i]._team) {
                vm.associations.push({name: vm.players[i].name,
                        team: vm.players[i]._team});
            }
        }
    }

    function deleteAssociation(index) {
        playerFactory.deleteTeam(index);

        createAssociations();
    }

    function getData() {
        playerFactory.index(function(data) {
            vm.players = data;
        });
        teamFactory.index(function(data) {
            vm.teams = data;
        });
    }
}

function findIndex(arr, key, value) {
    var i = 0;

    while (i <= arr.length && arr[i][key] != value) {
        i++;
    }

    if (i == arr.length) {
        i = -1;
    }

    return i;
}
