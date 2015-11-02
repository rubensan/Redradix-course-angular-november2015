var gnaApiServices = angular.module('gnaApiServices', []);  

/* Creating a new service */  
gnaApiServices.factory('gnaApiService', function($rootScope, $http) {

  var SUBSCRIPTION = "event:newRandomNumberServiceModule";

  return {
    subscriptionEvent: function () {
      return SUBSCRIPTION;
    },
     startService: function (mod) {
      $http({
        url: 'https://www.random.org/integers/?num=1&min=1&max=' + mod + '&col=1&base=10&format=plain&rnd=new', 
        method: 'GET'
        }).success(function(randomNumber) {
          $rootScope.$broadcast(SUBSCRIPTION, randomNumber);
        }).error(function() {
          console.log('Error trying to retrieve a random number from external API service.');
      });
    }
  };
});


    