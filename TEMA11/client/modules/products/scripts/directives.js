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

productsDirectives.directive('descriptiveElement', function($compile) {
  return {
    restrict: 'E',
    scope: {
      info: '='  // Using the same name as the attribute
    },
    compile: function compile(tElement, tAttrs, transclude) {
    
      function createHtmlSubelementText(text, classes) {
        var html = '<div class="descriptive-subelement-wrapper ' + classes + '"> <div class="descriptive-subelement">' + text + '</div></div>';
        return html;
      }

      function createHtmlSubelementImage(src, classes) {
        var html = '<div class="descriptive-subelement-wrapper ' + classes + '"><div class="descriptive-subelement"><img class="img-responsive" alt="" src="' + src + '"></div></div>';
        return html;     
      }

      function createHtml(descriptiveElement) {
        var html;
        if (descriptiveElement.type == 'text-image') {
          html = '<div class="descriptive-element" style="background:' + descriptiveElement.background + '">' + createHtmlSubelementText(descriptiveElement.description, 'left') + createHtmlSubelementImage(descriptiveElement.image, 'right') + '</div>';
          return html;
            
        }
        else if (descriptiveElement.type == 'image-text') {
          html = '<div class="descriptive-element" style="background:' + descriptiveElement.background + '">' + createHtmlSubelementImage(descriptiveElement.image, 'left') +createHtmlSubelementText(descriptiveElement.description, 'right') +  '</div>';
          return html;
            
        }
        else if (descriptiveElement.type == 'text') {
          html = '<div class="descriptive-element" style="background:' + descriptiveElement.background + '">' + createHtmlSubelementText(descriptiveElement.description, 'center') + '</div>';
          return html;
            
        }
        else { 
          html = '<div class="descriptive-element" style="background:' + descriptiveElement.background + '">' + createHtmlSubelementImage(descriptiveElement.image, 'center') + '</div>';
          return html;
        } 
      }

      return {
        pre: function preLink(scope, iElement, iAttrs) { 
          var html = createHtml(scope.info)
          iElement.append(html);
        },
        post: function postLink(scope, iElement, iAttrs) { }
      }
    }
  };
});

productsDirectives.directive('technicalSpecifications', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='  // Using the same name as the attribute
    },
    templateUrl: 'modules/products/views/technical-specifications.html',
    controller: function($scope) {
      $scope.$watch('info', function() { 
        if ($scope.info != undefined) { $scope.design = $scope.info.design; } 
      })
    }  
  };
});