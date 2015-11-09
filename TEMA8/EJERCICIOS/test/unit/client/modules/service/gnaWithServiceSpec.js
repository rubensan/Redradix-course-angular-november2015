describe('gna with service', function() {

	var gnaService, $rootScope;

	beforeEach(function (){

		// Module dependences
		module('gnaWithServiceServices');

		// The injector unwraps the underscores (_) from around the parameter names when matching
		inject(function(_$httpBackend_, _$rootScope_, _gnaService_) {
	 		$rootScope = _$rootScope_;
			gnaService = _gnaService_;
			// Set up the mock http service responses
     		$httpBackend = _$httpBackend_;
     		// Spying on the broadcasting to test if we listen the events correctly
	        spyOn($rootScope, '$broadcast').and.callThrough();
		});
	
	});
    
	describe('subscriptionEvent', function() {

	    it('should return the event that is broadcasted with a new random number', function (){
	    	var subscriptionEvent = gnaService.subscriptionEvent();
	      	expect(subscriptionEvent).toBe('event:newRandomNumberServiceModule'); 
	    });
	});

    describe('startService that calls local function that broadcasts a random number', function() {

	    it('should broadcast a random number when the service is started', function (){
	    	var randomNumber = '100';
	    	gnaService.startService(250);
	      	// expected to broadcast the random number
	      	expect($rootScope.$broadcast).toHaveBeenCalled();
	    });
	});
});   
