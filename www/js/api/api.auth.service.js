(function () {
    'use strict';

    angular.module('app.api')
    .factory('mtAuthSrv', mtAuthSrv);
    
    mtAuthSrv.$inject = ['$http', '$q', 'API_PREFIX', 'API_USERS_ME'];
    /* @ngInject */
    function mtAuthSrv($http, $q, API_PREFIX, API_USERS_ME) {
        
        var service = {
            login: login
        };
        return service;
        
        function login(user) {
            var deferred = $q.defer();
						
						if(!user.username || !user.password)
								deferred.resolve({data: 'Username and Passwore are required'});
					
            var opts = {
                url: API_PREFIX + API_USERS_ME,
                method: 'POST',
                data: { user: user }
            };
            
            $http(opts)
            .then(loginSuccess, loginError);
            
            function loginSuccess(response) {
                deferred.resolve(response);
            }

            function loginError(response) {
                deferred.reject(response);
            }
            
            return deferred.promise;
        }
    }
    
})();
