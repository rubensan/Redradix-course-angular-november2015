describe('footer', function() {
  
	var elm, scope;

	beforeEach(function (){

		// Module dependences
		module('gnasDirectives');
		module('htmlTemplates');

		inject(function($injector, $compile, $rootScope) {
			elm = angular.element('<div id="footer" footer></div>');
			scope = $rootScope.$new();
			$compile(elm)(scope);
			scope.$digest();
		});
	});
  
	it('should compile correctly the element', function() {
		/*'<div>
			The © Copyright the <a rel="license" href="https://opensource.org/licenses/MIT" target="_blank" style="text-decoration: underline;">MIT license</a> and so on...
		</div>';*/
	    var mitLicenseLink = elm.find('a');
	    expect(mitLicenseLink.text()).toEqual('MIT license');
	    expect(mitLicenseLink.length).toBe(1);
	});

});