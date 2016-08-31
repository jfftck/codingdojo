(function() {
    'use strict';

    angular
        .module('app')
        .controller('QuestionsIndexController', QuestionsIndexController);

    QuestionsIndexController.$inject = ['$location', '$cookies', '$log'];

    /* @ngInject */
    function QuestionsIndexController($location, $cookies, $log) {
        var vm = this;

        vm.name = '';

        activate();

        function activate() {
            var name = $cookies.get('name');

            $log.debug(name);

            if (name) {
                vm.name = name;
            } else {
                $location.url('/');
            }
        }
    }
})();
