// Ionic taotrack App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'taotrack' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'taotrack.controllers' is found in controllers.js
angular.module('taotrack', ['ionic', 'taotrack.controllers', 'taotrack.services'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

      // Each tab has its own nav history stack:

      .state('tab.cycles', {
        url: '/cycles',
        views: {
          'tab-cycles': {
            templateUrl: 'templates/tab-cycles.html',
            controller: 'CyclesCtrl'
          }
        }
      })

      .state('tab.elements', {
        url: '/elements',
        views: {
          'tab-elements': {
            templateUrl: 'templates/tab-elements.html',
            controller: 'ElementsCtrl'
          }
        }
      })
      .state('tab.elements-detail', {
        url: '/elements/:elementName',
        views: {
          'tab-elements': {
            templateUrl: 'templates/element-detail.html',
            controller: 'ElementDetailCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/cycles');

  });
