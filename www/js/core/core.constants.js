(function () {
    'use strict';
    
    angular.module('app.core')
    .constant('API_PREFIX', 'http://127.0.0.1:9000')
		.constant('API_QUOTES', '/api/quotes')
		.constant('API_BGS', '/api/bgs')
    .constant('API_USERS_ME', '/api/users/me')
    .constant('API_USERS_CHGPASS', '/api/users/chgpass')
    .constant('API_USERS', '/api/users');
    
})();
