(function () {
    'use strict';

    angular
        .module('feature.chat.detail')
        .controller('detailController', detailController);

    detailController.$inject = ['chatService', '$stateParams'];
    function detailController(chatService, $stateParams) {
        /**
         * Variable de contexto.
         */
        var vm = this;

        /**
         * Variable que obtiene la informacion del chat.
         */
        vm.chat = chatService.get($stateParams.chatId);

    }
})();