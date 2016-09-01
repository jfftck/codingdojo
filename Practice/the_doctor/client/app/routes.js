(function() {
    'use strict';

    angular.module('app').config(['$routeProvider', routes]);

    function routes($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/login.html'
            })
            .when('/appointments', {
                templateUrl: '/partials/appointments.index.html'
            })
            .when('/appointment', {
                templateUrl: '/partials/appointment.create.html'
            })
            .otherwise({
                redirectTo: '/'
            })
    }
})();
