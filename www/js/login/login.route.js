(function () {
    'use strict';

    angular.module('app.login')
    .config(config);

    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "js/login/login-template.html",
            controller: 'LoginCtrl as lc',
            cache: false
        });
    }
    
})();
