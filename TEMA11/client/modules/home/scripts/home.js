var home = angular.module('home', ['homeDirecives']);  

home.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('/home/*path', '/home');

	$stateProvider
	    
	    //////////////////////////
		// State Configurations //
		//////////////////////////
	    
	    .state('home', {
	    	abstract: false,
	        url: '/home',
	        templateUrl: 'modules/home/views/home.html'
	    })
})