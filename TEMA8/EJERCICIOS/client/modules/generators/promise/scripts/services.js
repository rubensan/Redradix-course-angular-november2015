/* A module for services */
var gnaPromiseServices = angular.module('gnaPromiseServices', []);	

/* Creating a new service */
gnaPromiseServices.factory('gnaPromiseService', function($rootScope, $q, $http, $interval) {

  var API_OK_URL = '/api/gna/';
  var API_ERROR_URL = '/api/gna/error/';
  var API_DELAY_URL = '/api/gna/delay/'; 

  return {
    getWorkingServiceUrl: function () { return API_OK_URL; },
    getErrorServiceUrl: function () { return API_ERROR_URL; },
    getDelayServiceUrl: function () { return API_DELAY_URL; },
    startService: function (mod, api) { 
      
      var deferred = $q.defer();
      
      var intervalNotification = $interval(function() { 
        deferred.notify('Still working...');
      }, 2000);

      $http({
        url: api + mod, 
        method: 'GET'
        }).success(function(randomNumber) {
          $interval.cancel(intervalNotification);
          deferred.resolve(randomNumber);
        }).error(function() {
          deferred.reject('Ups...problems with the server...');
      });

      return deferred.promise;
    }
  };
});


    