angular.module('app').controller('CustomizeUsersController', CustomizeUsersController);

function CustomizeUsersController($location, userFactory) {
    var vm = this;

    vm.users = [];
    vm.create = createUser;
    vm.delete = deleteUser;

    getUsers();

    function createUser() {
        userFactory.create({
            firstName: vm.firstName,
            lastName: vm.lastName,
            favLang: vm.favLang
        });

        $location.url('/users');
    }

    function deleteUser(index) {
        userFactory.delete(index);
    }

    function getUsers() {
        userFactory.index(function(data) {
            vm.users = data;
        });
    }
}
