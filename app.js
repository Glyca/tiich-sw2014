var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'partials/search.html',
            controller: 'SearchCtrl'
        })

        .when('/search/:words', {
            templateUrl: 'partials/results.html',
            controller: 'ResultCtrl'
        })

        .when('/workshop/:id', {
            templateUrl: 'partials/workshop.html',
            controller: 'WorkshopCtrl'
        })

        .when('/user/:id', {
            templateUrl: 'partials/user.html',
            controller: 'UserCtrl'
        });

    $locationProvider.html5Mode(false).hashPrefix('');

}]);

app.controller('SearchCtrl', ['$scope', '$location', function($scope, $location) {

    console.log("la");

    this.search = function() {
        console.log("ici");
        $location.path('/search/' + $scope.words);
    }

}]);


app.controller('ResultCtrl', ['$scope', function($scope) {

}]);


app.controller('WorkshopCtrl', ['$scope', function($scope) {

}]);


app.controller('UserCtrl', ['$scope', function($scope) {

}]);
