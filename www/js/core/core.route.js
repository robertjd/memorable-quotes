(function () {
    'use strict';

    // Ionic Starter App
    angular.module('app.core')
    .config(config);

    config.$inject = ['$urlRouterProvider', '$httpProvider', 'jwtInterceptorProvider'];
    /* @ngInject */
    function config($urlRouterProvider, $httpProvider, jwtInterceptorProvider) {
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
        
//        jwtInterceptorProvider.tokenGetter = function(store) {
//            return store.get('token');
//        }
//
//        $httpProvider.interceptors.push('jwtInterceptor');
    }
    
})();
