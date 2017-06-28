(function () {
    "use strict";

    angular
        .module('quala')
        .config(routes);

    routes.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    function routes($stateProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider

            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');
    }
})();