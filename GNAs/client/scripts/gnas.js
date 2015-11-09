'use strict';

angular.module('gnasApp', [
	'ui.router',
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
.config([ '$stateProvider', '$urlRouterProvider', '$locationProvider',
      function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $urlRouterProvider.when('/', '/promise');

            $urlRouterProvider.otherwise("/promise");
            
            $stateProvider
                
                  //////////////////////////
                  // State Configurations //
                  //////////////////////////
                
                  .state('promise', {
                        url: '/promise',
                        templateUrl : 'modules/generators/promise/views/promise.html' // This is the 'Web Component' Products
                  })
                  .state('api', {
                        url: '/api',
                        templateUrl : 'modules/generators/api/views/external-api.html' // This is the 'Web Component' Products
                  })
                  .state('service', {
                        url: '/service',
                        templateUrl : 'modules/generators/service/views/service.html' // This is the 'Web Component' Products
                  })
                  .state('directive', {
                        url: '/directive',
                        templateUrl : 'modules/generators/directive/views/directive.html' // This is the 'Web Component' Products
                  })
                  .state('uilogic', {
                        url: '/uilogic',
                        templateUrl : 'modules/generators/uilogic/views/uilogic.html' // This is the 'Web Component' Products
                  })
                  .state('manual', {
                        url: '/manual',
                        templateUrl : 'modules/generators/manual/views/manual.html' // This is the 'Web Component' Products
                  })
                  
            $locationProvider.html5Mode(true);
      }
])