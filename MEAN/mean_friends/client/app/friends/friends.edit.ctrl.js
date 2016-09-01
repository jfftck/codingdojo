(function() {
    'use strict';

    angular
        .module('app')
        .controller('FriendsEditController', FriendsEditController);

    FriendsEditController.$inject = ['$location', '$routeParams', 'friendFactory'];

    /* @ngInject */
    function FriendsEditController($location, $routeParams, friendFactory) {
        var vm = this;

        vm.friend = {
            firstName: '',
            lastName: '',
            birthday: ''
        }
        vm.goBack = goBack;
        vm.update = updateFriend;

        activate();

        function activate() {
            if ($routeParams.id) {
                friendFactory.show($routeParams.id, function(data) {
                    vm.friend = data;
                })
            }
        }

        function goBack() {
            $location.url('/');
        }

        function updateFriend() {
            friendFactory.update($routeParams.id, vm.friend, function(data) {
                if (data.error) {
                    vm.error = data.error;
                    return;
                }

                goBack();
            });
        }
    }
})();
