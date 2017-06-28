(function () {
  "use strict";

  angular
    .module('quala')

    .factory('MFPInit', MFPInit);

  MFPInit.$inject = ['$q'];

  function MFPInit($q) {
    /* Setup a Promise to allow code to run in other places anytime after MFP CLient SDK is ready
       Example: MFPClientPromise.then(function(){alert('mfp is ready, go ahead and use WL.* APIs')});
    */
    return window.MFPClientDefer.promise;
  }

  window.Messages = {
    // Add here your messages for the default language.
    // Generate a similar file with a language suffix containing the translated messages.
    // key1 : message1,
  };

  window.wlInitOptions = {
    // Options to initialize with the WL.Client object.
    // For initialization options please refer to IBM MobileFirst Platform Foundation Knowledge Center.
  };

  window.MFPClientDefer = angular.injector(['ng']).get('$q').defer();
  //window.wlCommonInit = window.MFPClientDefer.resolve;
  window.wlCommonInit = function() {
      window.MFPClientDefer.resolve();
  };
  window.MFPClientDefer.promise.then(function() {
    // Common initialization code goes here or use the angular service MFPClientPromise

    //alert('MobileFirst Client SDK Initilized');
    mfpMagicPreviewSetup();
  });

  function mfpMagicPreviewSetup() {
    var platform;
    //nothing to see here :-), just some magic to make ionic work with mfp preview, similar to ionic serve --lab
    if (WL.StaticAppProps.ENVIRONMENT === 'preview') {
      //running mfp preview (MBS or browser)
      platform = WL.StaticAppProps.PREVIEW_ENVIRONMENT === 'android' ? 'android' : 'ios';
      if (location.href.indexOf('?ionicplatform=' + platform) < 0) {
        location.replace(location.pathname + '?ionicplatform=' + platform);
      }
    }
  }
})();