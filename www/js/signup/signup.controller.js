(function () {
    'use strict';
    
    angular.module('app.signup')
    .controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['$ionicPopup', '$state', '$auth'];
    /* @ngInject */
    function SignupCtrl($ionicPopup, $state, $auth) {
        var vm = this;
        
        // User data for the signup
        vm.user = {};

        vm.doSignup = function() {
            // User form validations
            if(!vm.confPass ||
							 !vm.user.username ||
               !vm.user.password ||
               !vm.user.givenName ||
               !vm.user.surname ||
               !vm.user.email ||
               !vm.user.customData.birthdate ||
               !vm.user.customData.gender) {
                return showError({data: {error: 'User data is required'}});
            }
            
            if(vm.user.password !==  vm.confPass)
                return showError({data: {error: 'Password does not match'}});
            
						$auth.create(vm.user)
						.then(signupSuccess, signupError);
        };
        
        function signupSuccess(created) {
					if(created){
						// The account is enabled and ready to use
						$state.go('login', {}, {reload: true});
						
					} else {
						// The account requires email verification
					}
        }

        function signupError(reason) {
            showError(reason);
        }
        
        function showError(reason) {
            $ionicPopup.alert({
                title: 'Signup failed.',
                template: reason.data.error || reason.data.errorMessage
            });
        }
    }
})();