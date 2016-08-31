(function() {
    'use strict';

    angular
        .module('app')
        .factory('userFactory', userFactory);

    userFactory.$inject = ['$http', '$log', '$cookies'];

    /* @ngInject */
    function userFactory($http, $log) {
        var service = {
            error: userError,
            login: login,
            logout: logout
        };
        var err = null;

        return service;

        function userError() {
            return err;
        }

        function login(name, callback) {
            err = null;

            $http.post('/login', {name: name}).then(success, failed);

            function success(response) {
                callback(response.data);
            }

            function failed(response) {
                err = response.data.error;

                callback(null);
            }
        }

        function logout(name, callback) {
            err = null;

            $http.post('/logout', {name: name}).then(success, failed);

            function success(response) {
                callback(response.data);
            }

            function failed(response) {
                err = response.data.error;

                callback(null);
            }
        }
    }
})();
