(function () {
	'use strict';

	angular.module('app.core')
	.config(config);

	config.$inject = ['$urlRouterProvider', '$httpProvider', 'STORMPATH_CONFIG', 'SP_API_PREFIX'];
	/* @ngInject */
	function config($urlRouterProvider, $httpProvider, STORMPATH_CONFIG, SP_API_PREFIX) {

		STORMPATH_CONFIG.ENDPOINT_PREFIX = SP_API_PREFIX;

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/login');
		
		$httpProvider.interceptors.push('loadingInterceptor');
	}
    
})();
