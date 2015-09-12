(function () {
	'use strict';

	angular.module('app.core')
	.factory('loadingInterceptor', loadingInterceptor);

	loadingInterceptor.$inject = ['$rootScope', '$q'];
	/* @ngInject */
	function loadingInterceptor($rootScope, $q) {
		
		return {
			request: function(config) {
				$rootScope.$broadcast('loading:show');
				return config;
			},
			requestError: function(rejection) {
				$rootScope.$broadcast('loading:hide');
				return $q.reject(rejection);
			},
			response: function(response) {
				$rootScope.$broadcast('loading:hide');
				return response;
			},
			responseError: function(rejection) {
				$rootScope.$broadcast('loading:hide');
				return $q.reject(rejection);
			}
		};
	}

})();