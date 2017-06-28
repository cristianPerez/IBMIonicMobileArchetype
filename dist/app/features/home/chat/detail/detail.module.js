(function () {
    "use strict";
    angular
        .module('feature.chat.detail', [])
        .config(routes);
    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'app/features/home/chat/detail/detail.view.html',
                        controller: 'detailController',
                        controllerAs: 'ChatDetailCtrl',
                        resolve: {
                            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['app/features/home/chat/detail/detail.controller.js']);
                            }]
                        }
                    }
                }
            });
    }
})();