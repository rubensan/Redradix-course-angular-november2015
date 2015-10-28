/* A module for directives */
var gnaPromiseDirectives = angular.module('gnaPromiseDirectives', ['gnaPromiseServices', 'messengerServices']);	

/* Creating a new directive */	
gnaPromiseDirectives.directive('gnaPromise', function($interval, $q, gnaPromiseService, messengerService) {
  return {
    restrict: 'EA',
    scope: {},
    template: '<div id="api-selector-container">' +
              '<h4 class="title">APIs</h4>' +
              '<span ng-repeat="api in apis" ng-click="seclectApi(api.apiName)">' + 
              '<input id="{{ api.id }}" class="radio-custom" name="radio-group" type="radio" ng-checked="api.apiName == 0">' +
              '<label for="{{ api.id }}" class="radio-custom-label">{{ api.text }}</label>' +
              '</span>' +
              '</div>' +
              '<table class="gna-table">' +
              '<thead><tr><th>MOD</th><th>TIME</th></tr></thead>' +
              '<tbody><tr><td data-label="Mod">{{ mod }}</td><td data-label="Time"> {{ interval }} ms</td></tr></tbody> ' +
              '</table>' +
              '<div class="btn title" ng-click="generateRandomNumber()">Generar Numero Aleatorio</div>' +
              '<h3 class="number"> {{randomNumber}} </h3>',
    link: function (scope, element, attrs) {

      var intervalPromise, button, API_UP, API_DOWN, API_DELAY, newGenerationBlocked;
      
      init();

      function init() {
  
        // DOM
        button = element.find('.btn');
        
        // VARIABLES        
        API_UP = 0; API_DOWN = 1; API_DELAY = 2;
        allowNewGenerations();
 
        // SCOPE
        scope.mod = attrs.mod;
        scope.interval = attrs.interval;
        scope.randomNumber = '-';
        scope.apiSelection = API_UP;
        scope.apis = [
          { id: 'api-up', text: 'UP', apiName: API_UP },
          { id: 'api-down', text: 'DOWN', apiName: API_DOWN },
          { id: 'api-delay', text: 'DELAY', apiName: API_DELAY }
        ];
        scope.$on('$destroy', function () { $interval.cancel(intervalPromise); }); 
      }

      function allowNewGenerations(){ newGenerationBlocked = false; }
      function blockNewGenerations(){ newGenerationBlocked = true; }
      function isNewGenerationBlocked() { return newGenerationBlocked; }

      scope.generateRandomNumber = function() {

        if (intervalPromise == undefined){
          // We trigger the interval
          intervalPromise = $interval(function() {
            
            if (!isNewGenerationBlocked()){

              // Lets use that to know if we wait for a long time
              var wait = undefined;

              /* PROMISE */
              promiseService = gnaPromiseService.startService(scope.mod, scope.apiSelection);
              //We just made a new call, so we block passible calls triggered by the $interval
              blockNewGenerations();

              promiseService.then(function(randomNumber) {
                messengerService.popMessage('info', 'Operation Success', '');
                wait = undefined;
                scope.randomNumber = randomNumber;
                // We got the response from the server. We can continue calling it
                allowNewGenerations();
              }, function(reason) {
                messengerService.popMessage('error', 'Server error', reason);
                // We got the response from the server. We can continue calling it
                allowNewGenerations();
              }, function(update) {
                if (intervalPromise != undefined) {  
                  console.log(wait); 
                  if (wait == undefined) { messengerService.popMessage('warning', 'Delay', 'Don´t panic!, still working...'); wait = 'long'; }
                  else if (wait == 'long') { messengerService.popMessage('warning', 'Delay', 'Yeah...this is taking long...'); wait = 'super long'; }
                  else { messengerService.popMessage('warning', 'Delay', 'But don´t panic! We´ll get it!'); }
                }
              });
              /***********/

            }

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
          // We clear up possible messeges
          messengerService.popMessage('info', 'Stopping Generation', '');
        }
      };
      scope.seclectApi = function(api) { scope.apiSelection = api; };
    }
  };
});