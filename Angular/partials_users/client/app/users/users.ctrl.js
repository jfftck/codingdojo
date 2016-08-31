angular.module('app').controller('UserListsController', UserListsController);

function UserListsController(userFactory) {
    var vm = this;

    vm.users = [];

    getUsers();

    function getUsers() {
        userFactory.index(function(data) {
            vm.users = data;
        })
    }
}
