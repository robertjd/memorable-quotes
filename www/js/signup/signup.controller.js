(function () {
    'use strict';
    
    angular.module('app.signup')
    .controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['$ionicPopup', '$state', '$user'];
    /* @ngInject */
    function SignupCtrl($ionicPopup, $state, $user) {
        var vm = this;
        
        // User data for the signup
        //vm.user = {};

        vm.doSignup = function(user) {
            // User form validations
            if(!vm.confPass ||
							 !user.username ||
               !user.password ||
               !user.givenName ||
               !user.surname ||
               !user.email ||
               !user.customData.birthdate ||
               !user.customData.gender) {
                return showError({data: {error: 'User data is required'}});
            }
            
            if(user.password !==  vm.confPass)
                return showError({data: {error: 'Password does not match'}});
            
						$user.create(user)
						.then(signupSuccess, signupError);
        };
        
        function signupSuccess(created) {
					if(created){
						// The account is enabled and ready to use
						$state.go('login', {}, {reload: true});
						
					} else {
						// The account requires email verification
						//$state.go('login', {}, {reload: true});
						// At the moment we don't require email verification
						console.log(created);
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