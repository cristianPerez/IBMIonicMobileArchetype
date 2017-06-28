(function () {
    "use strict";
    angular
        .module('feature.chat', [])
        .config(routes);
    routes.$inject = ['$stateProvider'];
    function routes($stateProvider) {
        $stateProvider
            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'app/features/home/chat/chat.view.html',
                        controller: 'chatController',
                        controllerAs: 'ChatsCtrl',
                        resolve: {
                            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['app/features/home/chat/chat.controller.js', 'app/features/home/chat/chat.service.js']);
                            }]
                        }
                    }
                }
            });
    }
})();