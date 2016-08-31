(function() {
    'use strict';

    angular
        .module('app')
        .controller('BucketsIndexController', BucketsIndexController);

    BucketsIndexController.$inject = [
        '$location',
        '$cookies',
        '$route',
        'userFactory',
        'bucketFactory'
    ];

    /* @ngInject */
    function BucketsIndexController($location, $cookies, $route, userFactory,
            bucketFactory) {
        var vm = this;

        vm.bucket = null;
        vm.buckets = [];
        vm.checked = {};
        vm.checkStyle = checkStyle;
        vm.complete = completeBucket;
        vm.create = createBucket;
        vm.logout = logout;
        vm.name = name;
        vm.show = showUser;
        vm.users = [];

        activate();

        function activate() {
            var name = $cookies.get('name');

            if (!name) {
                $location.url('/');
            } else {
                vm.bucket = new defaultBucket();
                vm.name = vm.bucket.owner = name;

                bucketFactory.show(name, (err, data) => {
                    if (err) {
                        // do something
                    } else {
                        vm.buckets = data.buckets;
                    }
                });

                userFactory.index((err, data) => {
                    if (err) {
                        // do something
                    } else {
                        vm.users = data.users;
                        vm.bucket.tagged = name;
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

        function completeBucket(id) {
            var completed = vm.checked[id];

            bucketFactory.complete(id, completed, (err, data) => {
                if (err) {
                    // do something
                }
            });
        }

        function createBucket() {
            bucketFactory.create(vm.bucket, (err, data) => {
                if (err) {
                    // do something
                } else {
                    // update list
                    activate();
                }
            });
        }

        function defaultBucket(name) {
            this.owner = name;
            this.title = '';
            this.description = '';
            this.complete = false;
            this.tagged = '';
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

        function showUser(name) {
            $location.url('/bucket/' + name);
        }
    }
})();
