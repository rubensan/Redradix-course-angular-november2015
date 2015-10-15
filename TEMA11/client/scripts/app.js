'use strict';

angular.module('app', [
	'ui.router',
	'home',
	'products'
])
.config(
  [ '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

		/////////////////////////////
		// Redirects and Otherwise //
		/////////////////////////////
 		
 		$locationProvider.html5Mode(true);

		// Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
		$urlRouterProvider
			.when('/', '/home')
        	.otherwise('/');	// If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state

    }
  ]
);