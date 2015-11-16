describe('footer', function() {

  var elm, scope;

  beforeEach(function (){

    // Module dependences
    module('ngRoute');
    module('gnasDirectives');
    module('htmlTemplates');

    inject(function($injector, $compile) {
      $rootScope = $injector.get('$rootScope');
      elm = angular.element('<div id="footer" footer></div>');
      scope = $rootScope.$new();
      $compile(elm)(scope);
      scope.$digest();
    });
  });
  
  it('should render correctly the footer', function() {   
    var footerDiv = elm.find('div');
    expect(footerDiv.length).toBe(1);
    var footerLink = elm.find('a');
    expect(footerDiv.length).toBe(1);
  });
  
});