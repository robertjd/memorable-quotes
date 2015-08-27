(function () {
    'use strict';
    
    angular.module('app.signup')
    .controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['$scope', '$ionicPopup', '$state', 'store', 'mtUserSrv'];
    /* @ngInject */
    function SignupCtrl($scope, $ionicPopup, $state, store, mtUserSrv) {
        var vm = this;
        
        // User data for the signup
        vm.user = {};

        vm.doSignup = function() {
            // User form validations
            if(!vm.user.username ||
               !vm.user.password ||
               !vm.confPass ||
               !vm.user.firstname ||
               !vm.user.lastname ||
               !vm.user.birthdate ||
               !vm.user.email ||
               !vm.user.gender) {
                return showError({data: 'User data is required'});
            }
            
            if(vm.user.password !==  vm.confPass)
                return showError({data: 'Password does not match'});
            
            mtUserSrv.create(vm.user)
            .then(signupSuccess, signupError);  
        };
        
        function signupSuccess(response) {
            $state.go('login', {}, {reload: true});
        }

        function signupError(reason) {
            showError(reason);
        }
        
        function showError(reason) {
            $ionicPopup.alert({
                title: 'Signup failed.',
                template: reason.data
            });
        }
    }
})();