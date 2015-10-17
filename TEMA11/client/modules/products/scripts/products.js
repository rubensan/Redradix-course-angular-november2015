var products = angular.module('products', ['productsDirectives']);  

products.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('/products/', '/products');

	$stateProvider
	    
	    //////////////////////////
		// State Configurations //
		//////////////////////////
	    
        .state('products', {
        	abstract: true,
        	url: '/products',
			template: '<products></products>' // This is the 'Web Component' Products
        })	
        	// Nested Views
        	.state('products.list', {
	        	url: '',
				template: '<index></index>' // This is the 'Web Component' Products Index
        	})
        	.state('products.open', {
	        	url: '/:productName',
				template: '<product></product>'	// This is the 'Web Component' Product
        	})
})
