(function () {
	'use strict';

	angular.module('app.core')
	.run(run);

	run.$inject = ['$ionicPlatform', '$rootScope', '$httpBackend', '$state', '$ionicLoading', '$stormpath'];
	/* @ngInject */
	function run($ionicPlatform, $rootScope, $httpBackend, $state, $ionicLoading, $stormpath) {
		
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

		$stormpath.uiRouter({
			loginState: 'login',
			defaultPostLoginState: 'menu.home'
		});
		
		$rootScope.$on('$currentUser', function(event, user) {
			$state.go('menu.home', {}, {reload: true});
		});
		
		$rootScope.$on('$authenticated', function(event, user) {
			//console.log(user);
		});
		
		$rootScope.$on('$notLoggedin', function(event) {
			$state.go('login');
		});
		
		$rootScope.$on('loading:show', function() {
			$ionicLoading.show({template: 'loading ...'});
		});

		$rootScope.$on('loading:hide', function() {
			$ionicLoading.hide();
		});
		
		// Enable to get templates
		$httpBackend.whenGET(/\**.html/).passThrough();

		// You can make GET, POST, PUT, PATCH, DELETE to the api
		var apiRegExp = /\/*\/*/;
		$httpBackend.whenGET(apiRegExp).passThrough();
		$httpBackend.whenPOST(apiRegExp).passThrough();
		$httpBackend.whenPUT(apiRegExp).passThrough();
		$httpBackend.whenPATCH(apiRegExp).passThrough();
		$httpBackend.whenDELETE(apiRegExp).passThrough();
	}
    
})();
