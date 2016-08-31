(function() {
    'use strict';

    angular
        .module('app')
        .factory('userFactory', userFactory);

    userFactory.$inject = ['$http', '$log', '$cookies'];

    /* @ngInject */
    function userFactory($http, $log, $cookies) {
        var service = {
            errors: errors,
            login: login,
            logout: logout
        };
        var errors = null;

        return service;

        function errors() {
            return errors;
        }

        function login(name, callback) {
            errors = null;

            $http.post('/login', {name: name}).then(success, failed);

            function success(response) {
                callback(response.data);
            }

            function failed(response) {
                errors = response;

                callback(null);
            }
        }

        function logout(callback) {

        }
    }
})();
