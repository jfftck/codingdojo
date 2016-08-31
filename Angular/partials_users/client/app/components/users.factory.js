angular.module('app').factory('userFactory', userFactory);

function userFactory() {
    var factory = {};
    var users = [];

    factory.create = createUser;
    factory.delete = deleteUser;
    factory.index = indexUsers;
    factory.show = showUser;

    function createUser(user) {
        users.push(user);
    }

    function deleteUser(index) {
        users.splice(index, 1);
    }

    function indexUsers(callback) {
        callback(users);
    }

    function showUser(index, callback) {
        callback(users[index]);
    }

    return factory;
}
