(function () {
    'use strict';
    
    angular.module('app.menu')
    .controller('MenuCtrl', MenuCtrl);

    MenuCtrl.$inject = ['$scope', '$state', 'store'];
    /* @ngInject */
    function MenuCtrl($scope, $state, store) {
        var vm = this;
        
        vm.doLogout = function() {
            store.remove('token');
            $state.go('login', {}, {reload: true});
        };
    }
    
})();