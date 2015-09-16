'use strict';

var express = require('express');

module.exports = function(app) {
    
	return chgPassCb;
};

function chgPassCb(req, res) {
	
	var account = {
		username: req.user.username,
		password: req.body.currentPassword
	};
	
	var app = req.app.get('stormpathApplication');
	app.authenticateAccount(account, authAccountCb);
}

function authAccountCb(err, authenticationResult) {
	
	if(err) {
		// tell the user that their password is invalid
		console.log(err);
	} else {
		req.user.password = req.body.newPassword;
		req.user.save(savecb);
	}
}

function saveCb(err) {
	
	if(err) {
		// may be that their password is too short, etc
		console.log(err);
	} else {
		console.log('password was saved');
	}
}