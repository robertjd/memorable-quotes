(function () {
	'use strict';

	angular.module('app.pass')
	.controller('ForgotpassCtrl', ForgotpassCtrl)
	.controller('PasswordResetCtrl', PasswordResetCtrl)
	.controller('ChgpassCtrl', ChgpassCtrl);

	ForgotpassCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopup', '$user'];
	/* @ngInject */
	function ForgotpassCtrl($rootScope, $scope, $state, $ionicPopup, $user) {
		var vm = this;

		vm.doSend = function(user) {
			$user.passwordResetRequest(user)
			.then(passwordResetRequestSuccess, passwordResetRequestError);
		}

		function passwordResetRequestSuccess(response) {
			$ionicPopup.alert({
				title: 'Password sent',
				template: response.statusText
			});
		}

		function passwordResetRequestError(reason) {
			showError(reason);
		}

		function showError(reason) {
			$ionicPopup.alert({
				title: 'Send password failed.',
				template: reason.data.error || reason.data.errorMessage
			});
		}
	}
	
	PasswordResetCtrl.$inject = ['$scope', '$state', '$stateParams', '$ionicPopup', '$user'];
	/* @ngInject */
	function PasswordResetCtrl($scope, $state, $stateParams, $ionicPopup, $user) {
		var vm = this;

		vm.doReset = function(user) {
			var token = $stateParams.sptoken;
			
			$user.resetPassword(token, user)
			.then(resetPasswordSuccess, resetPasswordError);
		}

		function resetPasswordSuccess(response) {
			$state.go('login');
		}

		function resetPasswordError(reason) {
			showError(reason);
		}

		function showError(reason) {
			$ionicPopup.alert({
				title: 'Reset password failed.',
				template: reason.data.error || reason.data.errorMessage
			});
		}
	}

	ChgpassCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopup', '$user', 'mtUserSrv'];
	/* @ngInject */
	function ChgpassCtrl($rootScope, $scope, $state, $ionicPopup, $user, mtUserSrv) {
		var vm = this;

		vm.doReset = function(user) {
			
			if(typeof(user) === 'undefined' ||
				 typeof(user.currentPassword) === 'undefined' ||
				 typeof(user.newPassword) === 'undefined' ||
				 typeof(user.confirmPassword) === 'undefined') {
				return showError({data: {error: 'current password, new password and confirm password are required'}});
			}
			
			if(user.newPassword !== user.confirmPassword) {
				return showError({data: {error: 'new password and confirm password don\'t match'}});
			}
			
			mtUserSrv.changePassword($rootScope.user, user.currentPassword, user.newPassword)
			.then(changePasswordSuccess, changePasswordError);
		};
		
		function changePasswordSuccess(response) {
			$ionicPopup.alert({
				title: 'Password changed',
				template: response.statusText
			});
		}

		function changePasswordError(reason) {
			showError(reason);
		}

		function showError(reason) {
			$ionicPopup.alert({
				title: 'Change password failed.',
				template: reason.data.error || reason.data.errorMessage
			});
		}
	}
    
})();