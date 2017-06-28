(function () {
    'use strict';

    angular
        .module('feature.chat')
        .service('chatService', chatService);

    chatService.$inject = [];
    function chatService() {

        /**
         * Contexto del controlador
         */
        var vm = this;

        /**
         * Variable que alamacena los chats.
         */
        vm.chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        /**
         * Inicializo las funciones.
         */
        vm.all = all;
        vm.remove = remove;
        vm.get = get;

        /**
         * Función que me retorna los chats.
         */
        function all() {
            return vm.chats;
        }

        /**
         * Funcion para remover un chat de la base de datos local.
         * @param {*} chat 
         */
        function remove(chat) {
            chats.splice(chats.indexOf(chat), 1);
        }

        /**
         * Funcion para remover un chat de la base de datos local.
         * @param {*} chatId 
         */
        function get(chatId) {
            for (var i = 0; i < vm.chats.length; i++) {
                if (vm.chats[i].id === parseInt(chatId)) {
                    return vm.chats[i];
                }
            }
            return null;
        }

    }
})();