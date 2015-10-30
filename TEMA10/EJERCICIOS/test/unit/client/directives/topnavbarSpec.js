describe('navbar', function() {
  
	var elm, scope, $location;

	beforeEach(function (){

		// Module dependences
		module('ui.router');
		module('gnasDirectives');
		module('htmlTemplates');

		inject(function($injector, $compile, _$location_) {
			$rootScope = $injector.get('$rootScope');
			$location = _$location_;
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
	    var modulePromiseIdLink = elm.find('#promise-idLink');
	    expect(modulePromiseIdLink.length).toBe(1);
	  });

    it('should be active the link that corresponds to the current module in the URL', function (){ 
		
		function goTo(url) { $location.url(url); }

		var isolateScope = elm.isolateScope();
		var MANUAL=5; UILOGIC=4; DIRECTIVE=3; SERVICE=2; API=1; PROMISE=0;

		// This is mocking the initial routing of the router
		goTo(isolateScope.modules[PROMISE].title);
		$rootScope.$broadcast('$stateChangeSuccess');
		expect(isolateScope.currentModuleName).toBe('promise');

    	// When Manual
    	// Testing goToModule function
		goTo(isolateScope.modules[MANUAL].title);
			// Testing the scope.$on("$stateChangeSuccess")
			$rootScope.$broadcast('$stateChangeSuccess');
			expect($rootScope.$broadcast).toHaveBeenCalledWith('$stateChangeSuccess');
			// Now currentModuleName should contain the module MANUAL
			expect(isolateScope.currentModuleName).toBe('manual');

		// When UILogic
		// Testing goToModule function
		goTo(isolateScope.modules[UILOGIC].title);
			// Testing the scope.$on("$stateChangeSuccess")
			$rootScope.$broadcast('$stateChangeSuccess');
			expect($rootScope.$broadcast).toHaveBeenCalledWith('$stateChangeSuccess');
			// Now currentModuleName should contain the module UILOGIC
			expect(isolateScope.currentModuleName).toBe('uilogic');
		
		// When Directive
		// Testing goToModule function
		goTo(isolateScope.modules[DIRECTIVE].title);
			// Testing the scope.$on("$stateChangeSuccess")
			$rootScope.$broadcast('$stateChangeSuccess');
			expect($rootScope.$broadcast).toHaveBeenCalledWith('$stateChangeSuccess');
			// Now currentModuleName should contain the module DIRECTIVE
			expect(isolateScope.currentModuleName).toBe('directive');

		// When Service
		// Testing goToModule function
		goTo(isolateScope.modules[SERVICE].title);
			// Testing the scope.$on("$stateChangeSuccess")
			$rootScope.$broadcast('$stateChangeSuccess');
			expect($rootScope.$broadcast).toHaveBeenCalledWith('$stateChangeSuccess');
			// Now currentModuleName should contain the module SERVICE
			expect(isolateScope.currentModuleName).toBe('service')

		// When API
		// Testing goToModule function
		goTo(isolateScope.modules[API].title);
			// Testing the scope.$on("$stateChangeSuccess")
			$rootScope.$broadcast('$stateChangeSuccess');
			expect($rootScope.$broadcast).toHaveBeenCalledWith('$stateChangeSuccess');
			// Now currentModuleName should contain the module API
			expect(isolateScope.currentModuleName).toBe('api');

		// When Promise
		// Testing goToModule function
		goTo(isolateScope.modules[PROMISE].title);
			// Testing the scope.$on("$stateChangeSuccess")
			$rootScope.$broadcast('$stateChangeSuccess');
			expect($rootScope.$broadcast).toHaveBeenCalledWith('$stateChangeSuccess');
			// Now currentModuleName should contain the module API
			expect(isolateScope.currentModuleName).toBe('promise');
    });	
});