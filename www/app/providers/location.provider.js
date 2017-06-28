(function () {
    'use strict';

    angular
        .module('quala')
        .factory('locationProvider', locationProvider);

    locationProvider.$inject = ['$cordovaGeolocation', '$q'];
    function locationProvider($cordovaGeolocation, $q) {

        /**
         * contexto del provider.
         */
        var vm = this;

        /**
         * Objeto que retorna y publica las funciones.
         */
        vm.service = {
            getLocation: getLocation
        };

        /**
         * Funcion para obtener la ubicación.
         */
        function getLocation() {
            var defered = $q.defer(),
                promise = defered.promise,
                posOptions = { timeout: 10000, enableHighAccuracy: true };

            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    var lat = position.coords.latitude
                    var long = position.coords.longitude

                    //FIXME LOGGER
                    console.log(lat + "," + long);
                    defered.resolve({ latitude: lat, longitude: long });
                }, function (err) {
                    // FIXME LOGGER
                    console.log('ERROR::');
                    console.log(err);
                    defered.reject(err);
                });

            return promise;

        }

        /**
         * Retorno del servicio.
         */
        return vm.service;
    }
})();