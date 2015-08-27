(function () {
    'use strict';

    // Ionic Starter App
    angular.module('app.core')
    .run(run);
    
    run.$inject = ['$ionicPlatform', '$httpBackend', '$rootScope', '$state', 'store', 'jwtHelper', '$stormpath'];
    /* @ngInject */
    function run($ionicPlatform, $httpBackend, $rootScope, $state, store, jwtHelper, $stormpath) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        
        // Enable to get templates
        $httpBackend.whenGET(/\**.html/).passThrough();
        
        // You can make GET, POST, PUT, PATCH, DELETE to the api
//        var usrRegExp = /\/api\/users\/*/;
//        $httpBackend.whenGET(usrRegExp).passThrough();
//        $httpBackend.whenPOST(usrRegExp).passThrough();
//        $httpBackend.whenPUT(usrRegExp).passThrough();
//        $httpBackend.whenPATCH(usrRegExp).passThrough();
//        $httpBackend.whenDELETE(usrRegExp).passThrough();
			
				var apiRegExp = /\/*\/*/;
        $httpBackend.whenGET(apiRegExp).passThrough();
        $httpBackend.whenPOST(apiRegExp).passThrough();
        $httpBackend.whenPUT(apiRegExp).passThrough();
        $httpBackend.whenPATCH(apiRegExp).passThrough();
        $httpBackend.whenDELETE(apiRegExp).passThrough();
        
//        $rootScope.$on('$stateChangeStart', function(e, next) {
//            if (next.data && next.data.requiresLogin) {
//                if (!store.get('token') || jwtHelper.isTokenExpired(store.get('token'))) {
//                    e.preventDefault();
//                    $state.go('login');
//                }
//            }
//        });
				
//				$stormpath.uiRouter({
//					loginState: 'login',
//					defaultPostLoginState: 'main'
//				});
    }
    
})();
