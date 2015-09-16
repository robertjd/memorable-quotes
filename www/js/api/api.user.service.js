(function () {
	'use strict';

	angular.module('app.api')
	.factory('mtUserSrv', mtUserSrv);

	mtUserSrv.$inject = ['$http', '$q', '$spFormEncoder', 'SP_API_PREFIX', 'SP_API_CHNGPASS'];
	/* @ngInject */
	function mtUserSrv($http, $q, $spFormEncoder, SP_API_PREFIX, SP_API_CHNGPASS) {

		var service = {
			changePassword: changePassword
		};

		return service;

		function changePassword(user, cpass, npass) {
			var deferred = $q.defer();
			
			var opts = {
				url: SP_API_PREFIX + SP_API_CHNGPASS,
				method: 'POST',
				data: {user: user, currentPassword: cpass, newPassword: npass}
			};

			var form = $spFormEncoder.formPost({
				url: SP_API_PREFIX + SP_API_CHNGPASS,
				method: 'POST',
				data: {user: user, currentPassword: cpass, newPassword: npass}
			});
			
			$http(form)
			.then(changePasswordSuccess, changePasswordError);

			function changePasswordSuccess(response) {
				deferred.resolve(response);
			}

			function changePasswordError(response) {
				deferred.reject(response);
			}

			return deferred.promise;
		}
	}

})();
