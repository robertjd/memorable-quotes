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
    
    ChgpassCtrl.$inject = ['$scope', '$state', '$ionicPopup', '$user'];
    /* @ngInject */
    function ChgpassCtrl($scope, $state, $ionicPopup, $user) {
			var vm = this;

			vm.doReset = function() {
			};
    }
    
})();