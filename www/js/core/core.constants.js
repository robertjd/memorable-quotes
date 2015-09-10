(function () {
    'use strict';
    
    angular.module('app.core')
    .constant('SP_API_PREFIX', 'http://localhost:9000')
		.constant('SP_API_OAUTH', '/oauth/token');
    
})();
