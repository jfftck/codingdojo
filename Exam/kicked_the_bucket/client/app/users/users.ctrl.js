(function() {
    'use strict';

    angular
        .module('app')
        .controller('UsersController', UsersController);

    UsersController.$inject = [
        '$location',
        '$cookies',
        'userFactory'
    ];

    /* @ngInject */
    function UsersController($location, $cookies, userFactory) {
        var vm = this;

        vm.login = login;
        vm.name = '';

        activate();

        function activate() {
            var name = $cookies.get('name');

            if (name) {
                $location.url('/bucket');
            }
        }

        function login() {
            userFactory.login(vm.name, (err, data) => {
                if (err) {
                    // do something
                } else {
                    activate();
                }
            });
        }
    }
})();
