angular.module('app').config(['$routeProvider', routes]);

function routes($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/players'
        })
        .when('/players', {
            templateUrl: 'partials/players.html'
        })
        .when('/teams', {
            templateUrl: 'partials/teams.html'
        })
        .when('/associations', {
            templateUrl: 'partials/associations.html'
        })
        .otherwise({
            redirectTo: '/players'
        })
}
