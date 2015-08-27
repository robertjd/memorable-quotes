(function () {
    'use strict';
    
    angular.module('app.home')
    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$interval', '$state', 'store', 'jwtHelper', 'mtUserSrv'];
    /* @ngInject */
    function HomeCtrl($scope, $interval, $state, store, jwtHelper, mtUserSrv) {
        var vm = this;
        
        //vm.token = store.get('token');
        //vm.decodedToken = jwtHelper.decodeToken(vm.token);
        
        // Random background
        setRandomBg();
        var rbgIvl = $interval(setRandomBg, 60000);
        
        // Clock
        clockModule.update();
        var cIvl = $interval(clockModule.update, 30000);
        
        // Random quote
        setRandomQuote();
        var rqIvl = $interval(setRandomQuote, 10000);
        
        function setRandomBg() {
            var bgelm = document.querySelector('.splash');
            var data = dataModule.db.tables[1].data;
            var bg = data[ Math.floor(Math.random() * data.length) ];
            bgelm.style.backgroundImage = 'url(' + bg.imglarge + ')';
        }

        function setRandomQuote() {
            var qelm = document.querySelector('#random-quote');
            var data = dataModule.db.tables[0].data;
            var q = data[ Math.floor(Math.random() * data.length) ];
            qelm.innerHTML = q.quote;
        }
    }
    
})();