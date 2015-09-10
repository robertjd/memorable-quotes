(function () {
	'use strict';

	angular.module('app.api')
	.factory('mtAuthSrv', mtAuthSrv);

	mtAuthSrv.$inject = ['$http', '$q', 'SP_API_PREFIX', 'SP_API_OAUTH', '$spFormEncoder'];
	/* @ngInject */
	function mtAuthSrv($http, $q, SP_API_PREFIX, SP_API_OAUTH, $spFormEncoder) {

		var service = {
			oauthToken: oauthToken
		};

		return service;

		function oauthToken(user) {
			var deferred = $q.defer();

			if(!user.username || !user.password)
					deferred.resolve({data: 'Username and Passwore are required'});
			
			var opts = {
				url: SP_API_PREFIX + SP_API_OAUTH,
				method: 'POST',
				data: { username: user.username, password: user.password }
			};

			var form = $spFormEncoder.formPost({
				url: SP_API_PREFIX + SP_API_OAUTH,
				method: 'POST',
				withCredentials: true,
				data: user,
				params: {
					'grant_type': 'password'
				}
			});
			
			$http(form)
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
