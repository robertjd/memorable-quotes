(function () {
	'use strict';

	angular.module('app.menu')
	.config(config);

	config.$inject = ['$stateProvider'];
	/* @ngInject */
	function config($stateProvider) {
		$stateProvider
		.state('menu', {
			url: '/menu',
			abstract: true,
			templateUrl: 'js/menu/menu-template.html',
			controller: 'MenuCtrl as mc'
		});
	}
    
})();
