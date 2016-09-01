angular.module('app').config(['$routeProvider', routes]);

function routes($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/friends.index.html'
        })
        .when('/show/:id', {
            templateUrl: 'partials/friend.show.html'
        })
        .when('/edit/:id', {
            templateUrl: 'partials/friend.edit.html'
        })
        .when('/create', {
            templateUrl: 'partials/friend.create.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}
