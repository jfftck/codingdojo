(function() {
    'use strict';

    angular
        .module('app')
        .controller('SurveysIndexController', SurveysIndexController);

    SurveysIndexController.$inject = [
        '$location',
        '$log',
        '$cookies',
        'userFactory',
        'surveyFactory'
    ];

    /* @ngInject */
    function SurveysIndexController($location, $log, $cookies, userFactory,
            surveyFactory) {
        var vm = this;
        var name = null;

        vm.delete = deleteSurvey;
        vm.filter = {question: ''};
        vm.logout = logout;
        vm.name = null;
        vm.surveys = [];

        activate();

        function activate() {
            name = $cookies.get('name');

            $log.debug(name);

            if (!name) {
                $location.url('/');
            } else {
                vm.name = name;

                surveyFactory.index(data => {
                    $log.debug(data);

                    vm.surveys = data.surveys;
                });
            }
        }

        function deleteSurvey(item) {
            surveyFactory.delete(item._id, data => {
                activate();
            });
        }

        function logout() {
            userFactory.logout(name, data => {
                if (!data) {
                    $log.error(userFactory.error());
                } else {
                    activate();
                }
            });
        }
    }
})();
