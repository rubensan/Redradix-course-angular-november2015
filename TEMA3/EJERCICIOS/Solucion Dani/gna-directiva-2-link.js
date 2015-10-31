/* Our App is an Angular Module */
var gnaAsDirective = angular.module('gnaAsDirective', []);

/* Creating a new controler for aur app */    
/*gnaAsDirective.controller('gnaAsDirectiveCtrl', function ($scope, $interval){   
    function generateRandomNumber (){ return Math.floor((Math.random() * 10) + 1) }
    $scope.randomNumber = '-';
    var intervalPromise;
    $scope.generateRandomNumber = function() {  
        intervalPromise = $interval(function() {
            $scope.randomNumber = generateRandomNumber();
        }, 1000);
    };
    $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
});*/

/* Creating a new directive for aur app */  
gnaAsDirective.directive('gna', function($interval) {
  return {
    restrict: 'A',
    template:  ' <div id="gna-container"> ' +
               '   <div class="btn title" ng-click="generateRandomNumber()">Generar Numero Aleatorio</div> ' +
               '   <h3 class="number"> {{randomNumber}} </h3> ' +
               ' </div> ',
    link: function (scope) {
      function generateRandomNumber (){ return Math.floor((Math.random() * 10) + 1) }
      scope.randomNumber = '-';
      var intervalPromise;
      scope.generateRandomNumber = function() {  
        intervalPromise = $interval(function() {
          scope.randomNumber = generateRandomNumber();
        }, 1000);
      };
      scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
    }  
  };
});