angular.module('app').config(reviewAndSubmitRoute);
reviewAndSubmitRoute.$inject = ['$stateProvider'];

function reviewAndSubmitRoute($stateProvider) {
  $stateProvider.state('review-and-submit', {
    url: '/review-and-submit.html',
    templateUrl: '/view/review-and-submit.html',
    controller: 'ReviewAndSubmitRouteController',
    controllerAs: 'vm',
      data: {
        title: 'REVIEW and SUBMIT'
      }
  });
}