angular.module('app').config(appRoute);
appRoute.$inject = ['$stateProvider'];

function appRoute($stateProvider) {
    $stateProvider.state('404', {
        url: '/404',
        templateUrl: '/view/404.html',
        data: {
            title: 'Page not found'
        }
    });
}