'use strict';

var express = require('express');
var controller = require('./auth.controller');

module.exports = function(app) {
    
	var router = express.Router();
	var appCtrl = controller(app);

	router.post('/login', appCtrl.login);
	router.get('/logout', appCtrl.logout);
	router.post('/register', appCtrl.register);
	
	return router;
};
