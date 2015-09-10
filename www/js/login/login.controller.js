(function () {
    'use strict';
    
    angular.module('app.login')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', '$ionicPopup', 'store', '$auth'];
    /* @ngInject */
    function LoginCtrl($scope, $state, $ionicPopup, store, $auth) {
			var vm = this;

			// Form data for the login
			vm.user = {};

			// Perform the login action when the user submits the login form
			vm.doLogin = function(formData) {
				$auth.authenticate(formData)
				.then(oauthTokenSuccess, oauthTokenError);
			};

			function oauthTokenSuccess(response) {
//				store.set('token', response.data.token);
				$state.go('menu.home', {}, {reload: true});
			}

			function oauthTokenError(reason) {
				showError(reason);
			}

			function showError(reason) {
				console.log(reason);
				$ionicPopup.alert({
						title: 'Login failed.',
						template: reason.data.message || reason.data.errorMessage
				});
			}
    }
})();