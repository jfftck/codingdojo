angular.module('app').config(routes);

function routes($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/edit.html'
        })
        .when('/users', {
            templateUrl: 'partials/users.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}
