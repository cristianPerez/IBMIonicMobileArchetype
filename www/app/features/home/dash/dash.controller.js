(function () {
    'use strict';

    angular
        .module('feature.dash')
        .controller('dashController', dashController);

    dashController.$inject = ['$scope', 'locationProvider'];
    function dashController($scope, locationProvider) {
        /**
         * Variable de contexto.
         */
        var vm = this;

        /**
         * Metodo para cuando entra a la vista.
         */
        $scope.$on('$ionicView.enter', function () {
            locationProvider.getLocation().then(function (location) {
                console.log('ENTER::::' + JSON.stringify(location));
            }).catch(function (error) {
                //FIXME ERROR
                console.log(JSON.stringify(error))
            });

        });

    }
})();