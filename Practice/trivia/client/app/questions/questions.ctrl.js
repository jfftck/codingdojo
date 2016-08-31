(function() {
    'use strict';

    angular
        .module('app')
        .controller('QuestionsController', QuestionsController);

    QuestionsController.$inject = [
        '$location',
        '$cookies',
        '$customMessaging',
        '$route',
        'questionFactory',
        'userFactory'
    ];

    /* @ngInject */
    function QuestionsController($location, $cookies, $customMessaging, $route,
            questionFactory, userFactory) {
        var vm = this;

        vm.create = createQuestion;
        vm.home = home;
        vm.logout = logout;
        vm.trivia = {
            question: '',
            correctAnswer: '',
            fake1: '',
            fake2: ''
        }

        activate();

        function activate() {
            name = $cookies.get('name');

            if (!name) {
                $location.url('/');
            }
        }

        function createQuestion() {
            questionFactory.create(vm.trivia, (err, data) => {
                if (err) {
                    // do something
                } else {
                    $location.url('/dashboard');
                }
            });
        }

        function home() {
            $location.url('/dashboard');
        }

        function logout() {
            userFactory.logout(name, (err, data) => {
                if (err) {
                    // do something
                } else {
                    $route.reload();
                }
            });
        }
    }
})();
