(function () {
    "use strict";
    angular
        .module('feature.account', [])
        .config(routes);
    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'app/features/home/account/account.view.html',
                        controller: 'accountController',
                        controllerAs: 'AccountCtrl',
                        resolve: {
                            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['app/features/home/account/account.controller.js']);
                            }]
                        }
                    }
                }
            });
    }
})();