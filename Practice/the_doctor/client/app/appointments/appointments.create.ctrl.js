(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppointmentsCreateController', AppointmentsCreateController);

    AppointmentsCreateController.$inject = [
        '$location',
        '$log',
        '$cookies',
        'appointmentFactory'
    ];

    /* @ngInject */
    function AppointmentsCreateController($location, $log, $cookies,
            appointmentFactory) {
        var vm = this;

        vm.appointment = {
            name: '',
            date: '',
            time: '',
            complain: ''
        }
        vm.create = createAppointment;
        vm.goBack = goBack;
        vm.minDate = new minDate();

        activate();

        function activate() {
            var name = $cookies.get('name');

            $log.debug(name);

            if (!name) {
                $location.url('/');
            } else {
                vm.appointment.name = name;
            }
        }

        function createAppointment() {
            appointmentFactory.create(vm.appointment, (err, data) => {
                if (err) {
                    errorMessage = [];
                    if (err.name == 'ValidationError') {
                        for (var i = 0; i < err.errors.length; i++) {
                            errorMessage.push(err.errors[i].message);
                        }
                    } else {
                        errorMessage.push(err);
                    }

                    alert(errorMessage.join('\n'));
                } else {
                    goBack();
                }
            })
        }

        function goBack() {
            $location.url('/appointments');
        }

        function minDate() {
            var date = new Date();
            var formattedDate = [];

            formattedDate.push(date.getFullYear());
            formattedDate.push(date.getMonth());
            formattedDate.push(date.getDate());

            return  formattedDate.join('-');
        }
    }
})();
