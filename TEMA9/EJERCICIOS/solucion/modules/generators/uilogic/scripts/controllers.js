var gnaUIlogicControllers = angular.module('gnaUIlogicControllers', []);	

gnaUIlogicControllers.controller('gnaUIlogicCtrl', function ($scope, $interval){
    function generateRandomNumber (){return Math.floor((Math.random() * 10) + 1)}
    $scope.randomNumber = '-';
    var intervalPromise;
    $scope.generateRandomNumber = function() {  
        intervalPromise = $interval(function() {
            $scope.randomNumber = generateRandomNumber();
        }, 1000);
    };
    $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });      
});