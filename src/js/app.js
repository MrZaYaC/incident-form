'use strict';
angular.module('app', ['ui.router'])
  .config(configure)
  .run(runBlock);

configure.$inject = ['$urlRouterProvider', '$locationProvider'];

function configure($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');
}

runBlock.$inject = ['$rootScope', '$state'];

function runBlock($rootScope, $state){
  $rootScope.pageTitle = 'Incident Form';
  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    //Set page title
    var state = $state.current;
    $rootScope.pageTitle = state.data && state.data.title ? state.data.title : state.title;
  });
}
