(function () {
    'use strict';
    
    angular.module('app.pass')
    .controller('ForgotpassCtrl', ForgotpassCtrl)
    .controller('ChgpassCtrl', ChgpassCtrl);

    ForgotpassCtrl.$inject = ['$scope', '$state', '$ionicPopup'];
    /* @ngInject */
    function ForgotpassCtrl($scope, $state, $ionicPopup) {
        var vm = this;
        
        // Form data for the login
        vm.user = {};
    }
    
    ChgpassCtrl.$inject = ['$scope', '$state', '$ionicPopup', 'store', 'mtUserSrv'];
    /* @ngInject */
    function ChgpassCtrl($scope, $state, $ionicPopup, store, mtUserSrv) {
        var vm = this;
        
        vm.doReset = function() {            
            //var token = jwtHelper.decodeToken(store.get('token'));
            mtUserSrv.chgpass(store.get('token'), vm.password, vm.newPassword, vm.confirmPassword)
            .then(chgpassSuccess, showError);
        };
        
        function chgpassSuccess(response) {
            vm.password = undefined;
            vm.newPassword = undefined;
            vm.confirmPassword = undefined;
            $ionicPopup.alert({
                title: 'Success',
                template: response.data
            });
        }
        
        function showError(reason) {
            $ionicPopup.alert({
                title: 'Change password failed.',
                template: reason.data
            });
        }
    }
    
})();