/**
 * Main application routes
 */

'use strict';

var path = require('path');
var stormpath = require('express-stormpath');
var stormpathExpressSdk = require('stormpath-sdk-express');
var spMiddleware = stormpathExpressSdk.createMiddleware({
	allowedOrigins: ['http://localhost:8100'],
	xsrf: false
});
/*var spConfig = {
  appHref: process.env['STORMPATH_APP_HREF'],
  apiKeyId: process.env['STORMPATH_API_KEY_ID'],
  apiKeySecret: process.env['STORMPATH_API_KEY_SECRET']
};*/
//var tokenExchanger = stormpathExpressSdk.AuthenticateApiKeyForToken(spConfig);

module.exports = function(app) {
	
	spMiddleware.attachDefaults(app);
	
	// Insert API routes below
	//app.use('/update', require('./api/user')(app));
	app.post('/changePassword', spMiddleware.authenticate, require('./api/auth')(app));
	app.use('/api/quotes', spMiddleware.authenticate, require('./api/quote')(app));
	app.use('/api/bgs', spMiddleware.authenticate, require('./api/bg')(app));
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
	} else {
		req.user.password = req.body.newPassword;
		req.user.save(savecb);
	}
}

function saveCb(err) {
	
	if(err) {
		// may be that their password is too short, etc
	} else {
		//password was saved
	}
}
