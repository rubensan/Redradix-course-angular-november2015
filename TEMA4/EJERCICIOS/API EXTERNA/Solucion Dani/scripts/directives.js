/* A module for directives */  
var gnaApiDirectives = angular.module('gnaApiDirectives', ['gnaApiServices']);  

/* Creating a new directive */  
gnaApiDirectives.directive('gnaApi', function($interval, gnaApiService) {
  return {
    restrict: 'A',
    template:  ' <div id="gna-container"> ' +
               '   <div class="btn title" ng-click="generateRandomNumber()">Generar Numero Aleatorio</div> ' +
               '   <h3 class="number"> {{randomNumber}} </h3> ' +
               ' </div> ',
    link: function (scope, element, attrs) {
      
      var intervalPromise, button;

      init();

      function init() {

        // DOM
        button = element.find('.btn');

        // SCOPE
        scope.$on(gnaApiService.subscriptionEvent(), function($event, randomNumber){ scope.randomNumber = randomNumber; });
        scope.mod = attrs.mod;
        scope.interval = attrs.interval;
        scope.randomNumber = '-';
        scope.$on('$destroy', function () { $interval.cancel(intervalPromise); }); 
      }

      scope.generateRandomNumber = function() {
        if (intervalPromise == undefined){
          // We trigger the interval
          intervalPromise = $interval(function() {
            gnaApiService.startService(attrs.mod);
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

gnaApiDirectives.directive('foot', function() {
  return {
    restrict: 'E',
    template: '<div> The © Copyright the <a rel="license" href="https://opensource.org/licenses/MIT" target="_blank" style="text-decoration: underline;">MIT license</a> and so on... </div>'
  };
});