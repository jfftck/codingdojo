angular.module('app').controller('FriendsIndexController',
    ['$location', 'friendFactory', FriendsIndexController]);

function FriendsIndexController($location, friendFactory) {
    var vm = this;

    vm.create = createFriend;
    vm.delete = deleteFriend;
    vm.filter = '';
    vm.filteredFriends = [];
    vm.friends = [];
    vm.show = showFriend;
    vm.update = updateFriend;

    getFriends();

    function createFriend() {
        $location.url('/create');
    }

    function deleteFriend(index) {
        friendFactory.delete(index);
    }

    function getFriends() {
        friendFactory.index(function(data) {
            vm.friends = data;
        })
    }

    function showFriend(index) {
        $location.url('/show/' + index);
    }

    function updateFriend(index) {
        $location.url('/edit/' + index);
    }
}
