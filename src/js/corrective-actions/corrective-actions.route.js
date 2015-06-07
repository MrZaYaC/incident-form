angular.module('app').config(correctiveActionsRoute);
correctiveActionsRoute.$inject = ['$stateProvider'];

function correctiveActionsRoute($stateProvider) {
    $stateProvider.state('corrective-actions', {
        url: '/corrective-actions.html',
        templateUrl: '/view/corrective-actions.html',
        controller: 'CorrectiveActionsController',
        controllerAs: 'vm',
        data: {
            title: 'Corrective actions'
        }
    });
}