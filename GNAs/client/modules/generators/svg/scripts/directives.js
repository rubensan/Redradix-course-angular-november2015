/* A module for directives */
var gnaSvgDirectives = angular.module('gnaSvgDirectives', ['gnaSvgServices', 'messengerServices']);	

/* Creating a new directive */	
gnaSvgDirectives.directive('gnaSvg', function($interval, $q, gnaSvgService, messengerService) {
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
              '<div class="btn title" ng-click="generateRandomNumber()">Generar Numero Aleatorio</div>' +
              '<gna-display number="{{randomNumber}}" mod="{{mod}}" interval="{{interval}}"></gna-display>',
              
              
    link: function (scope, element, attrs) {

      var intervalSvg, button, SERVICE_OK, SERVICE_ERROR, SERVICE_DELAY, newGenerationBlocked;
      
      /*******************************/
      /* Waits the SVG to be loaded  */
      /*******************************/

      scope.$on('$includeContentLoaded', function () { init(); });


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
        scope.serviceSelection = gnaSvgService.getWorkingServiceUrl();
        scope.services = [
          { id: 'service-up', text: 'OK', serviceName: SERVICE_OK },
          { id: 'service-down', text: 'ERROR', serviceName: SERVICE_ERROR },
          { id: 'service-delay', text: 'DELAY', serviceName: SERVICE_DELAY }
        ];
        scope.$on('$destroy', function () { $interval.cancel(intervalSvg); intervalSvg = undefined; messengerService.popMessage('info', 'Exit Generation', ''); }); 
      }

      function allowNewGenerations(){ newGenerationBlocked = false; }
      function blockNewGenerations(){ newGenerationBlocked = true; }
      function isNewGenerationBlocked() { return newGenerationBlocked; }

      scope.generateRandomNumber = function() {

        if (intervalSvg == undefined){
          // We trigger the interval
          intervalSvg = $interval(function() {
            
            if (!isNewGenerationBlocked()){

              // Lets use that to know if we wait for a long time
              var wait = undefined;
              var svgServicePromise = gnaSvgService.startService(scope.mod, scope.serviceSelection);
             
              // We just made a new call, so we block passible calls triggered by the $interval
              blockNewGenerations();

              /***********/
              /* promise */
              /***********/

              // The Resolve Reject and Notify
              svgServicePromise.then(function(randomNumber) {
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
                if (intervalSvg != undefined) {  
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
          $interval.cancel(intervalSvg);
          intervalSvg = undefined;
          // And set the original text of the button
          button.text('Generar Numero Aleatorio');
          // We clear up possible messeges
          messengerService.popMessage('info', 'Stopping Generation', '');
        }
      };
      scope.seclectService = function(service) { 
        if (service == SERVICE_OK) { scope.serviceSelection = gnaSvgService.getWorkingServiceUrl(); }
        if (service == SERVICE_ERROR) { scope.serviceSelection = gnaSvgService.getErrorServiceUrl(); }
        if (service == SERVICE_DELAY) { scope.serviceSelection = gnaSvgService.getDelayServiceUrl(); }
      };
    }
  };
});

gnaSvgDirectives.directive('gnaDisplay', function() {
  return {
    restrict: 'E',
    scope: {
      randomNumber: '@number',
      mod: '@',
      interval: '@'
    },
    template: function (elem, attrs) { return '<div id="gna-wrapper"><div id="gna-svg" ng-include="\'/images/gna-display.svg\'"></div></div>';  },
    link: function (scope, element, attrs) {

      var receiverLeftAntenna, receiverRightAntenna, randomNumberId, modId, intervalId, evenId
      scope.$on('$includeContentLoaded', function () {  init(); });

      function init() {
        receiverLeftAntenna = element.find('#ng-receiver-left-antenna');
        receiverLeftAntenna.attr('class', 'animated fadeOut');
        receiverRightAntenna = element.find('#ng-receiver-right-antenna');
        receiverRightAntenna.attr('class', 'animated fadeOut');
        randomNumberId = element.find('#ng-random-number');
        randomNumberId.attr('text-anchor', 'middle');
        modId = element.find('#ng-mod');
        modId.attr('text-anchor', 'middle');
        intervalId = element.find('#ng-interval');
        intervalId.attr('text-anchor', 'middle');
        evenId = element.find('#ng-even');
        evenId.attr('class', 'animated fadeOut');
        evenId.attr('text-anchor', 'middle');
        
        attrs.$observe('number', function(value){
          if(value){
            (randomNumberId.attr('class') ==  (undefined || 'animated pulse')) ? randomNumberId.attr('class', 'animated fadeIn') : randomNumberId.attr('class', 'animated pulse');
            (receiverLeftAntenna.attr('class') ==  (undefined || 'animated fadeOut')) ? receiverLeftAntenna.attr('class', 'animated fadeIn') : receiverLeftAntenna.attr('class', 'animated fadeOut');
            (receiverRightAntenna.attr('class') ==  (undefined || 'animated fadeOut')) ? receiverRightAntenna.attr('class', 'animated fadeIn') : receiverRightAntenna.attr('class', 'animated fadeOut');
            if (value % 2 == 0) { evenId.attr('class', 'animated fadeIn'); }
            else { evenId.attr('class', 'animated fadeOut'); }
          }
        });
      }
    }
  }
})  