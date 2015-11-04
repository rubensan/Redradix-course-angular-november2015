'use strict';

angular.module('gnasApp', [
	'ngRoute',
	// GNAs Container
	'gnasDirectives',
      // Common Modules,
      'messenger',
	// GNAs Modules
	'gnaUIlogic', 	// UIlogic Module
	'gnaAsDirective',	// As Directive Module
	'gnaWithService',	// Service Module
	'gnaApi',         // Api Module
      'gnaPromise'      // Promise Module
])
.config(function($locationProvider, $routeProvider) {
	$routeProvider

            // route for Module GNA Manual
            .when('/manual', { templateUrl : 'modules/generators/manual/views/manual.html'})

            // route for Module GNA Programmed
            .when('/uilogic', { templateUrl : 'modules/generators/uilogic/views/uilogic.html'})

            // route for Module GNA Directive
            .when('/directive', { templateUrl : 'modules/generators/directive/views/directive.html'})

			// route for Module GNA Service
            .when('/service', { templateUrl : 'modules/generators/service/views/service.html'})

            // route for Module GNA External Api
            .when('/api', { templateUrl : 'modules/generators/api/views/external-api.html'})

            // route for Module Promise + External Api
            .when('/promise', { templateUrl : 'modules/generators/promise/views/promise.html'})

            // Otherwise -> go to Module GNA Manual
            .otherwise({redirectTo: '/promise'});

    $locationProvider.html5Mode({
	  enabled: true	});
})