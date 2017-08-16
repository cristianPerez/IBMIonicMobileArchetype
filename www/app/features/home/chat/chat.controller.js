(function () {
  'use strict'

  angular
        .module('feature.chat')
        .controller('chatController', chatController);
        
    chatController.$inject = ['chatService'];
    function chatController(chatService) {
    /*  chatController.$inject = ['$scope'];
    function chatController($scope) { */
        /**
         * Variable de contexto.
         */
        var vm = this;

        vm.slideTime = 3000;

        /**
         * Variable que alamacena los chats inciales.
         */
        vm.chats = chatService.all();

        /**
         * Declaro funciones.
         */
        vm.remove = remove;

        /**
         * Funcion empleada para remover un chat
         * @param {*} caht 
         */
        function remove (chat) {
            chatService.remove(chat);
        }

    }
})();