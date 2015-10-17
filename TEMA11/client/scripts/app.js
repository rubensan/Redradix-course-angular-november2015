'use strict';

var app = angular.module('app', [
	'ui.router',
	'home',
	'products'
]);

app.config(
  [ '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

		/////////////////////////////
		// Redirects and Otherwise //
		/////////////////////////////

		// Example of using function rule as param
	    $urlRouterProvider.otherwise(function($injector, $location){
	        return '/' + $location.path();
	    });

		$stateProvider
	    
	    //////////////////////////
		// State Configurations //
		//////////////////////////
	    
	    .state('404', {
	    	url: '/{path:.*}',
	        template: '<page-not-found></page-not-found>'
	    })

		$locationProvider.html5Mode(true); 
    }
  ]
);

app.directive('navbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/navbar.html'
  };
});

app.directive('footer', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/footer.html'
  };
});

app.directive('pageNotFound', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/page-not-found.html',
    controller: function($scope, $state, $location) {
        $scope.pageNotFound = 'http://' + $location.host() + $location.port() + '/' + $state.params.path;
    }
  };
});