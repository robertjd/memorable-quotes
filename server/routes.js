/**
 * Main application routes
 */

'use strict';

var stormpathExpressSdk = require('stormpath-sdk-express');
var spMiddleware = stormpathExpressSdk.createMiddleware({
  allowedOrigins: ['http://192.168.1.227:8100']
});

module.exports = function(app) {

	spMiddleware.attachDefaults(app);

	// Insert API routes below
	//app.use('/api/users', require('./api/user')(app));

	app.use('/api/quotes', spMiddleware.authenticate, require('./api/quote')(app));
	app.use('/api/bgs', spMiddleware.authenticate, require('./api/bg')(app));

};
