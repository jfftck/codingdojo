(function() {
    'use strict';

    angular
        .module('app')
        .controller('GamesDashboardController', GamesDashboardController);

    GamesDashboardController.$inject = [
        '$location',
        '$cookies',
        '$customMessaging',
        '$route',
        'userFactory',
        'gameFactory'
    ];

    /* @ngInject */
    function GamesDashboardController($location, $cookies, $customMessaging,
            $route, userFactory, gameFactory) {
        var vm = this;

        vm.games = [];
        vm.logout = logout;
        vm.message = null;
        vm.newGame = newGame;
        vm.newQuestion = newQuestion;
        vm.percentage = percentage;
        vm.score = score;
        vm.search = '';

        activate();

        function activate() {
            var name = $cookies.get('name');

            if (!name) {
                $location.url('/');
            } else {
                gameFactory.index((err, data) => {
                    vm.games = data.games;
                });

                if ($customMessaging.hasMessages()) {
                    vm.message = $customMessaging.pop();
                }
            }
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

        function newGame() {
            $location.url('/play');
        }

        function newQuestion() {
            $location.url('/newquestion');
        }

        function percentage(correct, total) {
            var percent = ((correct/total) * 100).toPrecision(3);

            return `${percent}%`;
        }

        function score(correct, total) {
            return `${correct}/${total}`;
        }
    }
})();
