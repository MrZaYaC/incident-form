angular.module('app').config(generalInformationRoute);
generalInformationRoute.$inject = ['$stateProvider'];

function generalInformationRoute($stateProvider) {
  $stateProvider.state('general-information', {
    url: '/',
    templateUrl: '/view/general-information.html',
    controller: 'GeneralInformationController',
    controllerAs: 'vm',
      data: {
        title: 'General information'
      }
  });
}