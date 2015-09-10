(function () {
    'use strict';

    // Ionic Starter App
    angular.module('app.core')
    .config(config);

    config.$inject = ['$urlRouterProvider', 'STORMPATH_CONFIG', 'SP_API_PREFIX', 'jwtInterceptorProvider'];
    /* @ngInject */
    function config($urlRouterProvider, STORMPATH_CONFIG, SP_API_PREFIX, jwtInterceptorProvider) {
			
			STORMPATH_CONFIG.ENDPOINT_PREFIX = SP_API_PREFIX;
			
			// if none of the above states are matched, use this as the fallback
			$urlRouterProvider.otherwise('/login');

//			jwtInterceptorProvider.tokenGetter = function(store) {
//					return store.get('token');
//			}
//
//			$httpProvider.interceptors.push('jwtInterceptor');
    }
    
})();
