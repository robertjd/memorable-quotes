(function () {
    'use strict';
    
    angular.module('app.login')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', '$ionicPopup', 'store', 'mtAuthSrv'];
    /* @ngInject */
    function LoginCtrl($scope, $state, $ionicPopup, store, mtAuthSrv) {
        var vm = this;
        
        // Form data for the login
        vm.user = {};

        // Perform the login action when the user submits the login form
        vm.doLogin = function() {
            mtAuthSrv.login(vm.user)
            .then(authSuccess, authError);
        };
        
        function authSuccess(response) {
            store.set('token', response.data.token);
            $state.go('menu.home', {}, {reload: true});
        }

        function authError(reason) {
            showError(reason);
        }
        
        function showError(reason) {
            $ionicPopup.alert({
                title: 'Login failed.',
                template: reason.data
            });
        }
    }
})();