var homeDirecives = angular.module('homeDirecives', []);  

homeDirecives.directive('home', function() {
  return {
    restrict: 'E',
    templateUrl: 'modules/home/views/home.html'
  };
});