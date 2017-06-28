(function () {
    "use strict";
    angular
        .module('feature.dash', [])
        .config(routes);
    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'app/features/home/dash/dash.view.html',
                        controller: 'dashController',
                        controllerAs: 'DashCtrl',
                        resolve: {
                            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['app/features/home/dash/dash.controller.js']);
                            }]
                        }
                    }
                }
            });
    }
})();