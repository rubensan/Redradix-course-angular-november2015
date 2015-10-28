/* A module for services */
var gnaPromiseServices = angular.module('gnaPromiseServices', []);	

/* Creating a new service */
gnaPromiseServices.factory('gnaPromiseService', function($rootScope, $q, $http, $interval) {

  var API_UP = 0; var API_UP_URL = '/api/gna/';
  var API_DOWN = 1; var API_DOWN_URL = '/api/gna/error/';
  var API_DELAY = 2; var API_DELAY_URL = '/api/gna/delay/'; 

  var currentApi;

  return {
    startService: function (mod, api) { 
      
      var deferred = $q.defer();
      
      var intervalNotification = $interval(function() { 
        deferred.notify('Still working...');
      }, 2000);

      if (api == API_UP) { currentApiUrl = API_UP_URL; }
      if (api == API_DOWN) { currentApiUrl = API_DOWN_URL; }
      if (api == API_DELAY) { currentApiUrl = API_DELAY_URL; }

      $http({
        url: currentApiUrl + mod, 
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


    