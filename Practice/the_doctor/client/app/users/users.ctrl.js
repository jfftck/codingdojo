(function() {
    'use strict';

    angular
        .module('app')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$log', '$location', '$cookies', 'userFactory'];

    /* @ngInject */
    function UsersController($log, $location, $cookies, userFactory) {
        var vm = this;

        vm.login = login;
        vm.name = '';

        activate();

        function activate() {
            var name = $cookies.get('name');

            $log.debug(name);

            if (name) {
                $location.url('/appointments');
            }
        }

        function login() {
            userFactory.login(vm.name, (err, data) => {
                $log.debug(data);
                if (data) {
                    activate();
                }
            });
        }
    }
})();
