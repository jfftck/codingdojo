(function() {
    'use strict';

    angular
        .module('app')
        .factory('appointmentFactory', appointmentFactory);

    appointmentFactory.$inject = ['$http'];

    /* @ngInject */
    function appointmentFactory($http) {
        var service = {
            create: createAppointment,
            delete: deleteAppointment,
            index: appointmentsIndex
        };

        return service;

        function appointmentsIndex(callback) {
            $http.get('/appointments').then(success, failed);

            function success(response) {
                callback(null, response.data.appointments);
            }

            function failed(response) {
                var err = response.data.error || response.data;

                callback(err, null);
            }
        }

        function createAppointment(appointment, callback) {
            $http.post('/appointments', {appointment: appointment})
                .then(success, failed);

            function success(response) {
                callback(null, response.data);
            }

            function failed(response) {
                var err = response.data.error || response.data;

                callback(err, null);
            }
        }

        function deleteAppointment(id, callback) {
            $http.delete('/appointments/' + id).then(success, failed);

            function success(response) {
                callback(null, response.data);
            }

            function failed(response) {
                var err = response.data.error || response.data;

                callback(err, null);
            }
        }
    }
})();
