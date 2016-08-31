angular.module('app').controller('TeamsController',
    ['teamFactory', TeamsController]);

function TeamsController(teamFactory) {
    var vm = this;

    vm.add = addTeam;
    vm.delete = deleteTeam;
    vm.teams = [];

    getTeams();

    function addTeam() {
        teamFactory.add({name: vm.name});
    }

    function deleteTeam(index) {
        teamFactory.delete(index);
    }

    function getTeams() {
        teamFactory.index(function(data) {
            vm.teams = data;
        });
    }
}
