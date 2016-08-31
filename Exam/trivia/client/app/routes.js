(function() {
    'use strict';

    angular.module('app').config(['$routeProvider', routes]);

    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/login.html'
            })
            .when('/play', {
                templateUrl: '/partials/games.play.html'
            })
            .when('/dashboard', {
                templateUrl: '/partials/dashboard.html'
            })
            .when('/newquestion', {
                templateUrl: '/partials/question.create.html'
            })
            .otherwise({
                redirectTo: '/'
            })
    }
})();
