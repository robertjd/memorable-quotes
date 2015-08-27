(function () {
    'use strict';

    angular.module('app.api')
    .factory('mtUserSrv', mtUserSrv);
    
    mtUserSrv.$inject = ['$http', '$q', 'API_PREFIX', 'API_USERS', 'API_USERS_CHGPASS'];
    /* @ngInject */
    function mtUserSrv($http, $q, API_PREFIX, API_USERS, API_USERS_CHGPASS) {
        
        var service = {
            create: create,
            chgpass: chgpass
        };
        return service;
        
        function create(user) {
            
            var deferred = $q.defer();
            var opts = {
                url: API_PREFIX + API_USERS,
                method: 'POST',
                data: { user: user }
            };
            $http(opts)
            .then(createSuccess, createError);
            
            function createSuccess(response) {
                deferred.resolve(response);
            }

            function createError(response) {
                deferred.reject(response);
            }
            
            return deferred.promise;
        }
        
        function chgpass(token, password, newPassword, confirmPassword) {
            
            var deferred = $q.defer();
            
            if(typeof(password) === 'undefined') {
                deferred.reject({data: 'Please type your current password'});
                return deferred.promise;
            }
            
            if(typeof(newPassword) === 'undefined' || 
               typeof(confirmPassword) === 'undefined') {
                deferred.reject({data: 'Please type your new and confirmation password'});
                return deferred.promise;
            }
            
            if(newPassword !== confirmPassword) {
                deferred.reject({data: 'New and confirmation password do not match'});
                return deferred.promise;
            }
            
            var opts = {
                url: API_PREFIX + API_USERS_CHGPASS,
                method: 'PATCH',
                data: {
                    token: token,
                    password: password,
                    newPassword: newPassword
                }
            };
            
            $http(opts)
            .then(chgpassSuccess, chgpassError);
            
            function chgpassSuccess(response) {
                deferred.resolve(response);
            }

            function chgpassError(response) {
                deferred.reject(response);
            }
            
            return deferred.promise;
        }
    }
    
})();
