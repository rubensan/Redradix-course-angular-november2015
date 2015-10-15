var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('content', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/content.html'
  };
});

appDirectives.directive('foot', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/foot.html'
  };
});