(function () {
    "use strict";
    angular
        .module('feature.home', [])
        .config(routes);
    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'app/features/home/home.view.html'
            })
    }
})();