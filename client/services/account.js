angular.module('MyApp')
  .factory('Account', function($http) {
    var profilePromise;// = $http.get('/api/me');;

    return {
      getProfile: function() {
        if ( angular.isDefined( profilePromise ) )
        {
          console.log('profile promise exists:',profilePromise);
         return profilePromise;
        }
        console.log('profile promise not defined yet, we lets send a http request!'); 
        return profilePromise = $http.get('/api/me');
      },

      updateProfile: function(profileData) {
        return $http.put('/api/me', profileData);
      }
    };
  });