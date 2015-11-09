/* A module for directives */  
var gnaWithServiceDirectives = angular.module('gnaWithServiceDirectives', ['gnaWithServiceServices']);  

/* Creating a new directive */  
gnaWithServiceDirectives.directive('gnaDirectiveModuleService', function($interval, gnaService) {
  return {
    restrict: 'EA',
    scope: {},
    template: '<table class="gna-table">' +
              '<thead><tr><th>MOD</th><th>TIME</th></tr></thead>' +
              '<tbody><tr><td data-label="Mod">{{ mod }}</td><td data-label="Time">{{ interval }} ms</td></tr></tbody> ' +
              '</table>' +
              '<div class="btn title" ng-click="generateRandomNumber()">Generar Numero Aleatorio</div>' +
              '<h3 class="number"> {{randomNumber}} </h3>',
    link: function (scope, element, attrs) {
      
      var intervalPromise, button;

      init();

      function init() {

        // DOM
        button = element.find('.btn');

        // SCOPE
        scope.$on(gnaService.subscriptionEvent(), function($event, randomNumber){ scope.randomNumber = randomNumber; });
        scope.mod = attrs.mod;
        scope.interval = attrs.interval;
        scope.randomNumber = '-';
        scope.$on('$destroy', function () { $interval.cancel(intervalPromise); }); 
      }

      scope.generateRandomNumber = function() {
        if (intervalPromise == undefined){
          // We trigger the interval
          intervalPromise = $interval(function() {
            gnaService.startService(attrs.mod);
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