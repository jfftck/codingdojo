(function() {
    'use strict';

    angular
        .module('app')
        .factory('gameFactory', gameFactory);

    gameFactory.$inject = ['$http'];

    /* @ngInject */
    function gameFactory($http) {
        var service = {
            create: createGame,
            index: gamesIndex
        };

        return service;

        function createGame(game, callback) {
            $http.post('/games', {game: game}).then(success, failed);

            function success(response) {
                callback(null, response.data);
            }

            function failed(response) {
                var err = response.data.error;

                callback(err, null);
            }
        }

        function gamesIndex(callback) {
            $http.get('/games').then(success, failed);

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
