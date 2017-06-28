(function () {
	"use strict";

    angular
        .module('quala')
    	.run(run);

    run.$inject = ['$rootScope', '$ionicPlatform', 'MFPInit', 'messagesProvider', '$ionicConfig', '$ionicLoading'];

    function run($rootScope, $ionicPlatform, MFPInit, messagesProvider, $ionicConfig, $ionicLoading) {
        
		var bind = Function.prototype.bind;

		$rootScope.$on('$stateChangeSuccess', handleStateChangeSuccess);

		function handleStateChangeSuccess(event, toState, toParams) {
			Function.prototype.bind = bind;
		}
		$ionicConfig.views.swipeBackEnabled(false);

		$ionicPlatform.registerBackButtonAction(function () {
			event.preventDefault();
		}, 100);

		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}

		});
		/**
		 * @Description
		 * Update rootScope and asign root messages from a service
		 */
		messagesProvider.getMessages().then(function (data) {
			$rootScope.root_messages = data;
		});


	}


})();
