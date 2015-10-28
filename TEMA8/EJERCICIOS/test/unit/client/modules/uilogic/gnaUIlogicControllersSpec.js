describe('GNA UILogic Controllers', function() {

    var gnaUIlogicCtrl, $controller, $interval, $rootScope, $scope;

    beforeEach(function(){

        // Module dependences
        module('gnaUIlogicControllers');

        // The injector unwraps the underscores (_) from around the parameter names when matching
        inject(function(_$controller_, _$interval_, _$rootScope_) {
            $controller = _$controller_;
            $interval = _$interval_;
            $scope = _$rootScope_.$new();
            gnaUIlogicCtrl = $controller('gnaUIlogicCtrl', { $scope: $scope });
        });

    });

    describe('$scope.generateRandomNumber()', function() {

        it('should return a new randon number', function() {
            expect($scope.randomNumber).toBe('-');
            $scope.generateRandomNumber();
            $interval.flush(1000);
            expect($scope.randomNumber).toBeDefined(); 
        });

    });
});
