(function() {
    'use strict';

    angular
        .module('app')
        .factory('userFactory', userFactory);

    userFactory.$inject = ['$http', '$log', '$cookies'];

    /* @ngInject */
    function userFactory($http, $log) {
        var service = {
            login: login,
            logout: logout
        };

        return service;

        function login(name, callback) {
            $http.post('/login', {name: name}).then(success, failed);

            function success(response) {
                callback(null, response.data);
            }

            function failed(response) {
                var err = response.data.error;

                callback(err, null);
            }
        }

        function logout(name, callback) {
            $http.post('/logout', {name: name}).then(success, failed);

            function success(response) {
                callback(null, response.data);
            }

            function failed(response) {
                var err = response.data.error;

                callback(err, null);
            }
        }
    }
})();
