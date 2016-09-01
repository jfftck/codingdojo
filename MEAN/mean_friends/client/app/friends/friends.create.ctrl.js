(function() {
    'use strict';

    angular
        .module('app')
        .controller('FriendsCreateController', FriendsCreateController);

    FriendsCreateController.$inject = ['$location', 'friendFactory'];

    /* @ngInject */
    function FriendsCreateController($location, friendFactory) {
        var vm = this;

        vm.create = createFriend;
        vm.friend = {
            firstName: '',
            lastName: '',
            birthday: ''
        }
        vm.goBack = goBack;

        function createFriend() {
            friendFactory.create(vm.friend, function(data) {
                if (data.error) {
                    vm.error = data.error;

                    return;
                }

                goBack();
            });
        }

        function goBack() {
            $location.url('/');
        }
    }
})();
