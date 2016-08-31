(function() {
    'use strict';

    angular.module('app').config(['$routeProvider', routes]);

    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/login.html'
            })
            .when('/bucket', {
                templateUrl: '/partials/buckets.index.html'
            })
            .when('/bucket/:user', {
                templateUrl: '/partials/buckets.show.html'
            })
            .otherwise({
                redirectTo: '/'
            })
    }
})();
