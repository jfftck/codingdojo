(function() {
    'use strict';

    angular
        .module('app')
        .controller('SurveysCreateController', SurveysCreateController);

    SurveysCreateController.$inject = [
        '$location',
        '$log',
        '$cookies',
        'surveyFactory'
    ];

    /* @ngInject */
    function SurveysCreateController($location, $log, $cookies, surveyFactory) {
        var vm = this;
        var name = null;

        vm.create = createSurvey;
        vm.goBack = goBack;
        vm.survey = {name: '',
            option1: {option: ''},
            option2: {option: ''},
            option3: {option: ''},
            option4: {option: ''},
            question: ''
        };

        activate();

        function activate() {
            name = $cookies.get('name');

            $log.debug(name);

            if (!name) {
                $location.url('/');
            } else {
                vm.survey.name = name;
            }
        }

        function createSurvey() {
            surveyFactory.create(vm.survey, data => {
                if (!data) {
                    alert(surveyFactory.error());
                }
            });
        }

        function goBack() {
            $location.url('/surveys');
        }
    }
})();
