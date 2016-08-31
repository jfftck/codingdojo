(function() {
    'use strict';

    angular
        .module('app')
        .controller('BucketsShowController', BucketsShowController);

    BucketsShowController.$inject = [
        '$location',
        '$cookies',
        '$routeParams',
        '$route',
        'userFactory',
        'bucketFactory'
    ];

    /* @ngInject */
    function BucketsShowController($location, $cookies, $routeParams, $route,
            userFactory, bucketFactory) {
        var vm = this;

        vm.buckets = [];
        vm.checked = {};
        vm.checkStyle = checkStyle;
        vm.goBack = goBack;
        vm.logout = logout;
        vm.name = '';

        activate();

        function activate() {
            var name = $cookies.get('name');
            var rName = $routeParams.user;

            if (!name || !rName) {
                $location.url('/');
            } else {
                vm.name = rName;

                bucketFactory.show(rName, (err, data) => {
                    if (err) {
                        // do something
                    } else {
                        vm.buckets = data.buckets;
                    }
                });
            }
        }

        function checkStyle(id) {
            if (vm.checked[id]) {
                return {'text-decoration': 'line-through', opacity: 0.5};
            } else {
                return {};
            }
        }

        function goBack() {
            $location.url('/');
        }

        function logout() {
            userFactory.logout(vm.name, (err, data) => {
                if (err) {
                    // do something
                } else {
                    $route.reload();
                }
            });
        }
    }
})();
