var productsDirectives = angular.module('productsDirectives', ['productsServices']);  

productsDirectives.directive('products', function(Products, $q) {
  return {
    restrict: 'E',
    templateUrl: 'modules/products/views/products.html',
    controller: function($scope) {
      Products.list().then(function(productsList) {
        $scope.productsList = productsList;
      }, function(reason) {
        alert('Failed: ' + reason);
      });     
    }
  };
});

productsDirectives.directive('index', function() {
  return {
    restrict: 'E',
    templateUrl: 'modules/products/views/index.html'
  };
});

productsDirectives.directive('product', function($state, Products) {
  return {
    restrict: 'E',
    templateUrl: 'modules/products/views/product.html',
    controller: function($scope) {
      Products.open($state.params.productName).then(function(product) {
        $scope.product = product;
      });
    }
  };
});