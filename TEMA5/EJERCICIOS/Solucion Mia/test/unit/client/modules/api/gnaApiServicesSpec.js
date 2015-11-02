describe('gnaApiServices', function() {

	var gnaApiService, $rootScope, $httpBackend;

	beforeEach(function (){

		// Module dependences
		module('gnaApiServices');

		// The injector unwraps the underscores (_) from around the parameter names when matching
		inject(function(_$httpBackend_, _$rootScope_, _gnaApiService_) {
	 		$rootScope = _$rootScope_;
			gnaApiService = _gnaApiService_;
			// Set up the mock http service responses
     		$httpBackend = _$httpBackend_;
     		// Spying on the broadcasting to test if we listen the events correctly
	        spyOn($rootScope, '$broadcast').and.callThrough();
		});
	
	});
    
	describe('subscriptionEvent', function() {

	    it('should return the event that is broadcasted with a new random number', function (){
	    	var subscriptionEvent = gnaApiService.subscriptionEvent();
	      	expect(subscriptionEvent).toBe('event:newRandomNumberApiModule'); 
	    });
	});

    describe('startService that calls API throught $http', function() {

	    it('should broadcast a random number when the service is started', function (){
	    	var randomNumber = '100';
	    	$httpBackend.expectGET('/api/gna/250').respond(randomNumber);
	    	gnaApiService.startService(250);
	    	$httpBackend.flush();
	      	// expected to broadcast the random number
	      	expect($rootScope.$broadcast).toHaveBeenCalledWith(gnaApiService.subscriptionEvent(), randomNumber);
	    });
	});
});   
