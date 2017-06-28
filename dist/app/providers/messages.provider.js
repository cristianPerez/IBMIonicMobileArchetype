/**
 * @ngdoc factory
 * @name messagesProvider
 * @function
 *
 * @description
 * Factory que sirve para consumir desde un archivo json todos los mensajes de text de la app.
 * 
 * @return
 * Un objeto con todos los mensajes de la app.
 */
(function() {
'use strict';

    angular
        .module('quala')
        .factory('messagesProvider', messagesProvider);

    messagesProvider.$inject = ['$q', '$http', '$ionicLoading'];
    function messagesProvider($q, $http, $ionicLoading) {
        
        var vm = this;

        /**
         * Inicializamos los metodos.
         */
        vm.getMessages = getMessages;

        /**
         * @description
         * Metodo que obtiene los mensajes desde un archivo .json
         * @returns
         * Una promesa que se cumple solo cuando el objeto es cargado en memoria.
         */
        function  getMessages () {
            var deferred = $q.defer();
            $http.get('app/messages_ES.json', {
                cache: true
            }).success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        };

    
        return {
            getMessages : vm.getMessages,
        };
    }
})();