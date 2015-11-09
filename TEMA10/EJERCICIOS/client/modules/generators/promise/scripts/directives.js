/* A module for directives */
var gnaPromiseDirectives = angular.module('gnaPromiseDirectives', ['gnaPromiseServices', 'messengerServices']);	

/* Creating a new directive */	
gnaPromiseDirectives.directive('gnaPromise', function($interval, $q, gnaPromiseService, messengerService) {
  return {
    restrict: 'EA',
    scope: {},
    template: '<div id="service-selector-container">' +
              '<h4 class="title">Api Services</h4>' +
              '<span ng-repeat="service in services" ng-click="seclectService(service.serviceName)">' + 
              '<input id="{{ service.id }}" class="radio-custom" name="radio-group" type="radio" ng-checked="service.serviceName == 0">' +
              '<label for="{{ service.id }}" class="radio-custom-label">{{ service.text }}</label>' +
              '</span>' +
              '</div>' +
              '<table class="gna-table">' +
              '<thead><tr><th>MOD</th><th>TIME</th></tr></thead>' +
              '<tbody><tr><td data-label="Mod">{{ mod }}</td><td data-label="Time"> {{ interval }} ms</td></tr></tbody> ' +
              '</table>' +
              '<div class="btn title" ng-click="generateRandomNumber()">Generar Numero Aleatorio</div>' +
              '<h3 class="number"> {{randomNumber}} </h3>',
    link: function (scope, element, attrs) {

      var intervalPromise, button, SERVICE_OK, SERVICE_ERROR, SERVICE_DELAY, newGenerationBlocked;
      
      init();

      function init() {
  
        // DOM
        button = element.find('.btn');
        
        // VARIABLES        
        SERVICE_OK = 0; SERVICE_ERROR = 1; SERVICE_DELAY = 2;
        allowNewGenerations();
 
        // SCOPE
        scope.mod = attrs.mod;
        scope.interval = attrs.interval;
        scope.randomNumber = '-';
        scope.serviceSelection = gnaPromiseService.getWorkingServiceUrl();
        scope.services = [
          { id: 'service-up', text: 'OK', serviceName: SERVICE_OK },
          { id: 'service-down', text: 'ERROR', serviceName: SERVICE_ERROR },
          { id: 'service-delay', text: 'DELAY', serviceName: SERVICE_DELAY }
        ];
        scope.$on('$destroy', function () { $interval.cancel(intervalPromise); intervalPromise = undefined; messengerService.popMessage('info', 'Exit Generation', ''); }); 
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

              /***********/
              /* PROMISE */
              /***********/
              promiseService = gnaPromiseService.startService(scope.mod, scope.serviceSelection);
             
              // We just made a new call, so we block passible calls triggered by the $interval
              blockNewGenerations();

              // The Resolve Reject and Notify
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
              /***********/
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
      scope.seclectService = function(service) { 
        if (service == SERVICE_OK) { scope.serviceSelection = gnaPromiseService.getWorkingServiceUrl(); }
        if (service == SERVICE_ERROR) { scope.serviceSelection = gnaPromiseService.getErrorServiceUrl(); }
        if (service == SERVICE_DELAY) { scope.serviceSelection = gnaPromiseService.getDelayServiceUrl(); }
      };
    }
  };
});