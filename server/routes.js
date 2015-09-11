/**
 * Main application routes
 */

'use strict';

var stormpathExpressSdk = require('stormpath-sdk-express');
var spMiddleware = stormpathExpressSdk.createMiddleware({
	allowedOrigins: ['http://192.168.1.220:8100']
});
var spConfig = {
  appHref: process.env['STORMPATH_APP_HREF'],
  apiKeyId: process.env['STORMPATH_API_KEY_ID'],
  apiKeySecret: process.env['STORMPATH_API_KEY_SECRET']
};
//var tokenExchanger = stormpathExpressSdk.AuthenticateApiKeyForToken(spConfig);

module.exports = function(app) {
	
	spMiddleware.attachDefaults(app);
	
	// Insert API routes below
	app.use('/api/quotes', spMiddleware.authenticate, require('./api/quote')(app));
	app.use('/api/bgs', spMiddleware.authenticate, require('./api/bg')(app));
};
