(function() {
    'use strict';

    angular
        .module('app')
        .controller('FriendsShowController', FriendsShowController);

    FriendsShowController.$inject = ['$location', '$routeParams', 'friendFactory'];

    /* @ngInject */
    function FriendsShowController($location, $routeParams, friendFactory) {
        var vm = this;

        vm.friend = {
            firstName: '',
            lastName: '',
            birthday: ''
        };
        vm.goBack = goBack;

        activate();

        function activate() {
            if ($routeParams.id) {
                friendFactory.show($routeParams.id, function(data) {
                    vm.friend = data;
                });
            }
        }

        function goBack() {
            $location.url('/');
        }
    }
})();
