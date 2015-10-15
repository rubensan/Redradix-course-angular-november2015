var homeDirecives = angular.module('homeDirecives', []);  

homeDirecives.directive('home', function($interval) {
  return {
    restrict: 'E',
    templateUrl:  'home.html'
  };
});