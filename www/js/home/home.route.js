(function () {
    'use strict';

    angular.module('app.home')
    .config(config);

    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider
        .state('menu.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'js/home/home-template.html',
                    controller: 'HomeCtrl as hc',

                }
            },
            sp: {
                authenticate: true
            }
        });
    }

})();
