(function() {
    'use strict';

    angular.module('app').config(['$routeProvider', routes]);

    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/login.html'
            })
            .when('/surveys', {
                templateUrl: '/partials/surveys.index.html'
            })
            .when('/survey', {
                templateUrl: '/partials/surveys.create.html'
            })
            .when('/survey/:id', {
                templateUrl: '/partials/surveys.show.html'
            })
            .otherwise({
                redirectTo: '/'
            })
    }
})();
