(function() {
    'use strict';

    angular
        .module('app')
        .service('$customMessaging', Messaging);

    /* @ngInject */
    function Messaging() {
        var serv = this;
        var messages = [];

        serv.add = addMessage;
        serv.hasMessages = hasMessages;
        serv.pop = popMessage;

        function addMessage(message) {
            messages.push(message);
        }

        function hasMessages() {
            return messages.length > 0;
        }

        function popMessage() {
            return messages.pop();
        }
    }
})();
