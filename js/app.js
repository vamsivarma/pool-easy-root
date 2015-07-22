var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/index.html',
        controller: 'DefaultCtrl'
    });

    $routeProvider.when('/!/poolOwner', {
        templateUrl: 'templates/poolOwner.html',
        controller: 'PoolOwnerCtrl'
    });
    
    $routeProvider.when('/!/poolBuddy', {
        templateUrl: 'templates/poolBuddy.html',
        controller: 'PoolBuddyCtrl'
    });    

    $routeProvider.otherwise({
        redirectTo: '/'
    });

});