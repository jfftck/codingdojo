(function() {
    'use strict';

    angular
        .module('app')
        .factory('questionFactory', questionFactory);

    questionFactory.$inject = ['$http'];

    /* @ngInject */
    function questionFactory($http) {
        var service = {
            create: createQuestion,
            index: questionsIndex
        };

        return service;

        function createQuestion(question, callback) {
            $http.post('/questions', {question: question}).then(success, failed);

            function success(response) {
                callback(null, response.data);
            }

            function failed(response) {
                var err = response.data.error;

                callback(err, null);
            }
        }

        function questionsIndex(callback) {
            $http.get('/questions').then(success, failed);

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
