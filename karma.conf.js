// Karma configuration
// Generated on Wed Aug 16 2017 09:18:22 GMT-0500 (-05)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'www/lib/angular/angular.js',
      'www/lib/angular-ui-router/release/angular-ui-router.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/lib/ionic/js/ionic.bundle.js',
      'www/lib/oclazyload/dist/ocLazyLoad.min.js',
      'www/app/features/home/chat/detail/detail.module.js',
      'www/app/features/home/dash/dash.module.js',
      'www/app/features/home/chat/chat.module.js',
      'www/app/features/home/chat/chat.controller.js',
      'www/app/features/home/chat/chat.filter.js',
      'www/app/features/home/account/account.module.js',
      'www/app/features/home/home.module.js',
      'www/app/app.module.js',
      'www/app/providers/messages.provider.js',
      'www/app/providers/location.provider.js',
      'www/app/features/feature.modules.js',
      'www/app/app.routes.js',
      'www/app/app.config.js',
      'www/app/features/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'www/app/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
