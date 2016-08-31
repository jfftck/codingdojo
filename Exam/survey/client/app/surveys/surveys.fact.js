(function() {
    'use strict';

    angular
        .module('app')
        .factory('surveyFactory', surveyFactory);

    surveyFactory.$inject = ['$http'];

    /* @ngInject */
    function surveyFactory($http) {
        var service = {
            create: createSurvey,
            delete: deleteSurvey,
            error: surveyError,
            index: surveysIndex,
            show: showSurvey,
            vote: vote
        };
        var err = null;

        return service;

        function createSurvey(survey, callback) {
            err = null;

            survey.options = [
                survey.option1,
                survey.option2,
                survey.option3,
                survey.option4
            ];

            $http.post('/surveys', survey).then(success, failed);

            function success(response) {
                callback(response.data);
            }

            function failed(response) {
                err = response.data.error;

                callback(null);
            }
        }

        function deleteSurvey(id, callback) {

            $http.delete('/surveys/' + id).then(success, failed);

            function success(response) {
                callback(response.data);
            }

            function failed(response) {
                err = response.data.error;

                callback(null);
            }
        }

        function showSurvey(index, callback) {
            $http.get('/surveys/' + index).then(success, failed);

            function success(response) {
                callback(response.data);
            }

            function failed(response) {
                err = response.data.error;

                callback(null);
            }
        }

        function surveyError() {
            return err;
        }

        function surveysIndex(callback) {
            $http.get('/surveys').then(success, failed);

            function success(response) {
                callback(response.data);
            }

            function failed(response) {
                err = response.data.error;

                callback(null);
            }
        }

        function vote(index, optionIndex, name, callback) {
            var url = '/surveys/' + index + '/' +optionIndex;
            $http.post(url, {name: name}).then(success, failed);

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
