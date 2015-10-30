describe('navbar', function() {
  
	var elm, scope;

	beforeEach(function (){

		// Module dependences
		module('ngRoute');
		module('gnasDirectives');
		module('htmlTemplates');

		inject(function($injector, $compile) {
			$rootScope = $injector.get('$rootScope');
			elm = angular.element('<div id="navbar" navbar></div>');
			scope = $rootScope.$new();
			$compile(elm)(scope);
			scope.$digest();
			// Spying on the broadcasting to test if we listen the events correctly
	        spyOn($rootScope, '$broadcast').and.callThrough();
		});
	});
  
	it('should render correctly the navbar links', function() {   
	    var moduleManualIdLink = elm.find('#manual-idLink');
	    expect(moduleManualIdLink.length).toBe(1);
	    var moduleUILogicIdLink = elm.find('#uilogic-idLink');
	    expect(moduleUILogicIdLink.length).toBe(1);
	    var moduleDirectiveIdLink = elm.find('#directive-idLink');
	    expect(moduleDirectiveIdLink.length).toBe(1);
	    var moduleServiceIdLink = elm.find('#service-idLink');
	    expect(moduleServiceIdLink.length).toBe(1);
	    var moduleApiIdLink = elm.find('#api-idLink');
	    expect(moduleApiIdLink.length).toBe(1);
	  });

    it('should be active the link that corresponds to the current module in the URL', function (){ 
		
		var isolateScope = elm.isolateScope();
		var MANUAL=0; UILOGIC=1; DIRECTIVE=2; SERVICE=3; API=4;

		// This is mocking the initial routing of the router
		isolateScope.goToModule(isolateScope.modules[MANUAL]);
		$rootScope.$broadcast('$routeChangeSuccess');
		expect(isolateScope.currentModuleName).toBe('manual');

    	// When Manual
    	// Testing goToModule function
		isolateScope.goToModule(isolateScope.modules[MANUAL]);
			// Testing the scope.$on("$routeChangeSuccess")
			$rootScope.$broadcast('$routeChangeSuccess');
			expect($rootScope.$broadcast).toHaveBeenCalledWith('$routeChangeSuccess');
			// Now currentModuleName should contain the module MANUAL
			expect(isolateScope.currentModuleName).toBe('manual');

		// When UILogic
		// Testing goToModule function
		isolateScope.goToModule(isolateScope.modules[UILOGIC]);
			// Testing the scope.$on("$routeChangeSuccess")
			$rootScope.$broadcast('$routeChangeSuccess');
			expect($rootScope.$broadcast).toHaveBeenCalledWith('$routeChangeSuccess');
			// Now currentModuleName should contain the module UILOGIC
			expect(isolateScope.currentModuleName).toBe('uilogic');
		
		// When Directive
		// Testing goToModule function
		isolateScope.goToModule(isolateScope.modules[DIRECTIVE]);
			// Testing the scope.$on("$routeChangeSuccess")
			$rootScope.$broadcast('$routeChangeSuccess');
			expect($rootScope.$broadcast).toHaveBeenCalledWith('$routeChangeSuccess');
			// Now currentModuleName should contain the module DIRECTIVE
			expect(isolateScope.currentModuleName).toBe('directive');

		// When Service
		// Testing goToModule function
		isolateScope.goToModule(isolateScope.modules[SERVICE]);
			// Testing the scope.$on("$routeChangeSuccess")
			$rootScope.$broadcast('$routeChangeSuccess');
			expect($rootScope.$broadcast).toHaveBeenCalledWith('$routeChangeSuccess');
			// Now currentModuleName should contain the module SERVICE
			expect(isolateScope.currentModuleName).toBe('service')

		// When API
		// Testing goToModule function
		isolateScope.goToModule(isolateScope.modules[API]);
			// Testing the scope.$on("$routeChangeSuccess")
			$rootScope.$broadcast('$routeChangeSuccess');
			expect($rootScope.$broadcast).toHaveBeenCalledWith('$routeChangeSuccess');
			// Now currentModuleName should contain the module API
			expect(isolateScope.currentModuleName).toBe('api');

    });	
});