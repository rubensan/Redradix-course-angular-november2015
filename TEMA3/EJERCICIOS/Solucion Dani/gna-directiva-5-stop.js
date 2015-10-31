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
      
      var numberId, button, intervalPromise;

      init();

      function init() {

        // DOM
        numberId = element.find('.number');
        button = element.find('.btn');

        scope.mod = attrs.mod;
        scope.interval = attrs.interval;
        scope.randomNumber = '-';
        scope.$on('$destroy', function () { $interval.cancel(intervalPromise); }); 
      }

      scope.generateRandomNumber = function() {
        
        function generateRandomNumber (){ return Math.floor((Math.random() * attrs.mod) + 1) }

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
    }
  };
});