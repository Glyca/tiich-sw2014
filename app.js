var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'partials/search.html',
            controller: 'SearchCtrl'
        })

        .when('/search/:words?', {
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

    $scope.search = function() {
        console.log("ici");
        $location.path('/search/' + $scope.words);
    }

}]);


app.controller('ResultCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {

    $scope.words = $routeParams.words;
    $scope.workshops = workshops; // on prend nos fake workshops
    $scope.expanded = false;
    $scope.otherWorkshops = workshops;

}]);


app.controller('WorkshopCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {

    $scope.workshop = workshops[$routeParams.id ? $routeParams.id : 0]; // on pick un fake workshop
    $scope.users = users;

}]);


app.controller('UserCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {

    $scope.user = users[$routeParams.id];
    $scope.workshops = workshops;

}]);
