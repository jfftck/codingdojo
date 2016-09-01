(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppointmentsIndexController', AppointmentsIndexController);

    AppointmentsIndexController.$inject = [
        '$location',
        '$log',
        '$cookies',
        '$route',
        'appointmentFactory',
        'userFactory'
    ];

    /* @ngInject */
    function AppointmentsIndexController($location, $log, $cookies, $route,
            appointmentFactory, userFactory) {
        var vm = this;

        vm.appointments = [];
        vm.create = createAppointment;
        vm.delete = deleteAppointment;
        vm.filter = filter;
        vm.logout = logout;
        vm.name = null;
        vm.search = '';

        activate();

        function activate() {
            var name = $cookies.get('name');

            $log.debug(name);

            if (!name) {
                $location.url('/');
            } else {
                vm.name = name;

                appointmentFactory.index((err, data) => {
                    if (err) {
                        $log.debug(err);
                    }
                    vm.appointments = data.appointments;
                });
            }
        }

        function createAppointment() {
            $location.url('/appointment');
        }

        function deleteAppointment(id) {
            appointmentFactory.delete(id, (err, data) => {
                if (err) {
                    alert(err);
                } else {
                    activate();
                }
            })
        }

        function filter(item) {
            if (!vm.search ||
                    item.name.toLowerCase().indexOf(vm.search.toLowerCase()) > -1 ||
                    item.complain.toLowerCase().indexOf(vm.search.toLowerCase()) > -1) {
                return true;
            }
            return false;
        }

        function logout() {
            userFactory.logout(vm.name, (err, data) => {
                if (err) {
                    alert(err);
                } else {
                    $route.reload();
                }
            })
        }
    }
})();
