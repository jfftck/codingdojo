(function() {
    'use strict';

    angular.module('app').config(['$routeProvider', routes]);

    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/login.html'
            })
            .when('/questions', {
                templateUrl: '/partials/questions.index.html'
            })
            .when('/question', {
                templateUrl: '/partials/questions.create.html'
            })
            .when('/question/:id', {
                templateUrl: '/partials/questions.show.html'
            })
            .when('question/:id/answer', {
                templateUrl: '/partials/answers.create.html'
            })
            .otherwise({
                redirectTo: '/questions'
            })
    }
})();
