(function () {
    "use strict";

    angular
        .module('quala')
        .config(routes);

    routes.$inject = ['$urlRouterProvider'];

    function routes($urlRouterProvider) {
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');
    }
})();