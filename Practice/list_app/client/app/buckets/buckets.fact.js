(function() {
    'use strict';

    angular
        .module('app')
        .factory('bucketFactory', bucketFactory);

    bucketFactory.$inject = ['$http'];

    /* @ngInject */
    function bucketFactory($http) {
        var service = {
            complete: completeBucket,
            create: createBucket,
            show: showBucket
        };

        return service;

        function completeBucket(id, completed, callback) {
            $http.put('/bucket/' + id, {complete: completed}).then(success, failed);

            function success(response) {
                callback(null, response.data);
            }

            function failed(response) {
                var err = response.data.error;

                callback(err, null);
            }
        }

        function createBucket(bucket, callback) {
            $http.post('/bucket', {bucket: bucket}).then(success, failed);

            function success(response) {
                callback(null, response.data);
            }

            function failed(response) {
                var err = response.data.error;

                callback(err, null);
            }
        }

        function showBucket(name, callback) {
            $http.get('/bucket/' + name).then(success, failed);

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
