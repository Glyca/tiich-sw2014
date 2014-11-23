var app = angular.module('app', ['ngRoute', 'ngSanitize']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'partials/search.html',
            controller: 'SearchCtrl'
        })

        /*.when('/search/:words?', {
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
        })*/

        .when('/about', {
            templateUrl: 'partials/about.html'
        })


        .otherwise({
            templateUrl: 'partials/soon.html'
        });

    $locationProvider.html5Mode(false).hashPrefix('');

}]);

app.controller('SearchCtrl', ['$scope', '$location', function($scope, $location) {

    $scope.search = function() {
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
    $scope.rating = 4;
    $scope.new_comment = {
        user: 0,
        rating: 1
    };
    $scope.publish_comment = function(new_comment) {
        $scope.workshop.comments.unshift(new_comment);
        $scope.comment_published = true;
    }
    $scope.edit_comment = function(comment) {
        $scope.new_comment = comment;
        $scope.comment_published = false;
        $scope.workshop.comments.splice($scope.workshop.comments.indexOf(comment), 1);
    }

}]);


app.controller('UserCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {

    $scope.user = users[$routeParams.id];
    $scope.workshops = workshops;

}]);

app.directive('starRating',
    function() {
        return {
            restrict : 'A',
            template : '<ul class="rating">'
            + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
            + '\u2605'
            + '</li>'
            + '</ul>',
            scope : {
                ratingValue : '=',
                max : '=',
                onRatingSelected : '&'
            },
            link : function(scope, elem, attrs) {
                var updateStars = function() {
                    scope.stars = [];
                    for ( var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled : i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function(index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating : index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function(oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            }
        };
    }
);