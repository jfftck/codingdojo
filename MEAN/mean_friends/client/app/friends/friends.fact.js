(function() {
    'use strict';

    angular
        .module('app')
        .factory('friendFactory', friendFactory);

    friendFactory.$inject = ['$http', '$log'];

    /* @ngInject */
    function friendFactory($http, $log) {
        var service = {
            create: createFriend,
            delete: deleteFriend,
            index: friendsIndex,
            show: showFriend,
            update: updateFriend
        };
        var cachedIndex = [];

        return service;

        function createFriend(data, callback) {
            $log.debug(data);

            $http.post('/friends', data).then(success, failed);

            function success(response) {
                callback(response.data.create);
            }

            function failed(response) {
                callback(response.data);
            }
        }

        function deleteFriend(index, callback) {
            getIdFromCachedIndex(index, function(id) {
                $http.delete('/friends/' + id).then(success, failed);
            });

            function success(response) {
                callback(response.data.delete);
            }

            function failed(response) {
                callback(response.data);
            }
        }

        function friendsIndex(callback) {
            $http.get('/friends').then(success, failed);

            function success(response) {
                cachedIndex = response.data.index;
                callback(response.data.index);
            }

            function failed(response) {
                callback(response.data);
            }
        }

        function getIdFromCachedIndex(index, callback) {
            if (cachedIndex.length < 1) {
                friendsIndex(function(data) {
                    callback(cachedIndex[index]._id);
                });
            } else {
                callback(cachedIndex[index]._id);
            }
        }

        function showFriend(index, callback) {
            getIdFromCachedIndex(index, function(id) {
                $http.get('/friends/' + id).then(success, failed);
            });

            function success(response) {
                callback(response.data.show);
            }

            function failed(response) {
                callback(response.data);
            }
        }

        function updateFriend(index, data, callback) {
            getIdFromCachedIndex(index, function(id) {
                $http.put('/friends/' + id, data).then(success, failed);
            });

            function success(response) {
                callback(response.data.update);
            }

            function failed(response) {
                callback(response.data);
            }
        }
    }
})();
