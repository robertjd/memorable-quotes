(function () {
	'use strict';

	angular.module('app.signup')
	.config(config);

	config.$inject = ['$stateProvider'];
	/* @ngInject */
	function config($stateProvider) {
		$stateProvider
		.state('signup', {
			url: '/signup',
			templateUrl: 'js/signup/signup-template.html',
			controller: 'SignupCtrl as sc',
			cache: false
		});
	}
    
})();
