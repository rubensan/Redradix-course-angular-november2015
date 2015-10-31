/* Our App is an Angular Module */
var gnaAsDirective = angular.module('gnaAsDirective', []);  

/* Creating a new directive for aur app */  
gnaAsDirective.directive('gna', function($interval) {
  return {
    restrict: 'A',
    template:  ' <div id="gna-container"> ' +
               '   <div class="btn title" ng-click="generateRandomNumber()">Generar Numero Aleatorio</div> ' +
               '   <h3 class="number"> {{randomNumber}} </h3> ' +
               ' </div> ',
    link: function (scope, element, attrs) {
      
      numberId = element.find('.number');

      function generateRandomNumber (mod){ return Math.floor((Math.random() * mod) + 1) }
      scope.mod = attrs.mod;
      scope.interval = attrs.interval;
      scope.randomNumber = '-';
      var intervalPromise;

      scope.generateRandomNumber = function() {
        intervalPromise = $interval(function() {
          scope.randomNumber = generateRandomNumber(scope.mod);
          if (scope.randomNumber % 2 == 0) { numberId.addClass('even'); }
          else { numberId.removeClass('even'); }
        }, scope.interval);
      };
      scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });         
    }
  };
});