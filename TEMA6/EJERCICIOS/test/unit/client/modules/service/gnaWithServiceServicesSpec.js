describe('GNA With Service services', function() {

    var gnaService, $rootScope;

    beforeEach(function(){

        // Module dependences
        module('gnaWithServiceServices');

        // The injector unwraps the underscores (_) from around the parameter names when matching
        inject(function(_$rootScope_, _gnaService_) {
            $rootScope = _$rootScope_;
            gnaService = _gnaService_;
            spyOn($rootScope, '$broadcast').and.callThrough();
        });

    });

    it('should return the event that is broadcasted with a new random number', function (){
        var subscriptionEvent = gnaService.subscriptionEvent();
        expect(subscriptionEvent).toBe('event:newRandomNumberServiceModule'); 
    });

    it('should broadcast a new randon number', function() {
        gnaService.startService(100);
        expect($rootScope.$broadcast).toHaveBeenCalledWith('event:newRandomNumberServiceModule', jasmine.any(Number));
    });

});