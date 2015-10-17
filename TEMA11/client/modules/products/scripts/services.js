var productsServices = angular.module('productsServices', []);

productsServices.factory('Products', function ($http, $q, $state, $location){
	
	var productsList;
	var products;

	// This function mocks the db task of finding a specific element of a collection
	function auxiliaryServiceFinder(productName){
		for (var i=0; i<products.length; i++){
			if (products[i].name == productName){ return products[i]; }
		}
		return -1;
	}

	return {
		list: function(){
			var deferred = $q.defer();
			// This is mocking a db request by getting the info from a json static file on client side
			$http({ method: 'GET', url: '/data/productsList.json' })
				.then(function successCallback(response) { 
					productsList = response.data.productsList;
					deferred.resolve(productsList);                     
			  	}, function errorCallback(response) {
			  		deferred.reject("Ups, looks like we are having some troubles right now, please try in a few minutes."); // Lets supose a 500 internal server error
				});
			return deferred.promise;	
		},
		open: function(productName){		
			var deferred = $q.defer();
			// This is mocking a db request by getting the info from a json static file on client side
			$http({ method: 'GET', url: '/data/products.json' })
				.then(function successCallback(response) { 
					products = response.data.products;
					var product = auxiliaryServiceFinder(productName);
					if (product == -1) {
						var path = $location.path();
						$state.go('products.list', { path: path });
					}
					else { deferred.resolve(product); }
			  	}, function errorCallback(response) {
			  		$state.go('products.list'); // Lets supose a 404 not found
				});
			return deferred.promise;
		}
	}
});