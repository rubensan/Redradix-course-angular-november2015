var gnasDirectives = angular.module('gnasDirectives', []);

gnasDirectives.directive('navbar', function($location) {
  return {
    restrict: 'A',  
    scope: {},
    templateUrl: 'views/navbar.html',
    link: function (scope, element) {

      init();

      scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
        scope.currentModuleName = $location.path().substring(1);
      })
      
      function init() {
        scope.currentModuleName = $location.path().substring(1);
        scope.modules = [
          { idLink: 'promise-idLink', title: 'promise', text:'Promise' },
          { idLink: 'api-idLink', title: 'api', text:'Ext API' },
          { idLink: 'service-idLink', title: 'service', text:'Service' },
          { idLink: 'directive-idLink', title: 'directive', text:'Directive' },
          { idLink: 'uilogic-idLink', title: 'uilogic', text:'UIlogic' },
          { idLink: 'manual-idLink', title: 'manual', text:'Manual' }
        ];
      }
    }  
  };
});

gnasDirectives.directive('footer', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/footer.html'
  };
});