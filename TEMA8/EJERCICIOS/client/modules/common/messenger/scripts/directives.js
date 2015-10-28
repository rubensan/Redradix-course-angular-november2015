/* A module for directives */
var messengerDirectives = angular.module('messengerDirectives', ['messengerServices']);	

/* Creating a new directive */	
messengerDirectives.directive('messenger', function($timeout, messengerService) {
  return {
    restrict: 'A',
    scope: {},
    template: '<h4 id="message" class="{{ message.type }}"> {{ message.text }} </h4>',
    controller: function ($scope, $element, $attrs) {
      $scope.message = { 'type': '', 'title': '', 'text': '' };
      $scope.$on(messengerService.subscribe(), function(event, message) {
        $scope.message.type = message.type;
        $scope.message.title = message.title;
        $scope.message.text = message.text;

        // We clear up after 1700ms
        $timeout(function() { 
          //$scope.message.text = '';
        }, 1700);
      });
    }      
  };
});
