(function () {
    "use strict";
    angular
        .module('quala', [
            'ionic',
            'ngCordova',
            'oc.lazyLoad',
            /* MODULES FEATURE */
            'feature.quala'
        ]);
})();