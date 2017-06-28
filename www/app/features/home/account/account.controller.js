(function () {
    'use strict';

    angular
        .module('feature.account')
        .controller('accountController', accountController);

    accountController.$inject = [];
    function accountController() {
        /**
         * Variable de contexto.
         */
        var vm = this;

        /**
         * Variable que almacena las settings
         */
        vm.settings = {
            enableFriends: true
        };

    }
})();