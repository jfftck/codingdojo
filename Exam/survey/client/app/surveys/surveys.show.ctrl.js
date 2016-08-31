(function() {
    'use strict';

    angular
        .module('app')
        .controller('SurveysShowController', SurveysShowController);

    SurveysShowController.$inject = [
        '$location',
        '$log',
        '$cookies',
        '$routeParams',
        'surveyFactory'
    ];

    /* @ngInject */
    function SurveysShowController($location, $log, $cookies, $routeParams,
            surveyFactory) {
        var vm = this;
        var name = null;

        vm.goBack = goBack;
        vm.survey = {};
        vm.vote = vote;

        activate();

        function activate() {
            name = $cookies.get('name');

            $log.debug(name);

            if (!name || !$routeParams.id) {
                $location.url('/');
            } else {
                surveyFactory.show($routeParams.id, data => {
                    vm.survey = data.survey;
                });
            }
        }

        function goBack() {
            $location.url('/surveys');
        }

        function vote(index) {
            surveyFactory.vote($routeParams.id, index, name, data => {
                if (data) {
                    goBack();
                }
            });
        }
    }
})();
