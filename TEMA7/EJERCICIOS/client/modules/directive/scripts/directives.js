/* A Module for directives */
var gnaAsDirectiveDirecives = angular.module('gnaAsDirectiveDirecives', []);  

/* Creating a new directive */  
gnaAsDirectiveDirecives.directive('gnaDirectiveModuleDirective', function($interval) {
  return {
    restrict: 'EA',
    template: '<table class="gna-table">' +
              '<thead><tr><th>MOD</th><th>TIME</th></tr></thead>' +
              '<tbody><tr><td data-label="Mod">{{ mod }}</td><td data-label="Time">{{ interval }} ms</td></tr></tbody> ' +
              '</table>' +
              '<div class="btn title" ng-click="generateRandomNumber()">Generar Numero Aleatorio</div>' +
              '<h3 class="number"> {{randomNumber}} </h3>',
    link: function (scope, element, attrs) {
      
      var numberId = element.find('.number');
      var button = element.find('.btn');
      var intervalPromise;

      function generateRandomNumber (){return Math.floor((Math.random() * attrs.mod) + 1)}
      scope.mod = attrs.mod;
      scope.interval = attrs.interval;
      scope.randomNumber;

      scope.generateRandomNumber = function() {
        if (intervalPromise == undefined){
          // We trigger the interval
          intervalPromise = $interval(function() {
            console.log("directive interval")
            scope.randomNumber = generateRandomNumber();
            if (scope.randomNumber % 2 == 0) { numberId.addClass('even'); }
            else { numberId.removeClass('even'); }
          }, scope.interval);
          // And turn the button into the stop button
          button.text('STOP');
        }
        else {
          // We stop the interval
          $interval.cancel(intervalPromise);
          intervalPromise = undefined;
          // And set the original text of the button
          button.text('Generar Numero Aleatorio');
        }
      }; 
      scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
    }
  };
});

