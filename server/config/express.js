/**
 * Express configuration
 */

'use strict';

var expressSecret = process.env['EXPRESS_SECRET'];

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var path = require('path');
var config = require('./env');

module.exports = function(app) {
	var env = app.get('env');

	app.use(compression());
	// extended enabled to allow deep object properties such as customData
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(cookieParser());

	app.use(function(err, req, res, next) {
		if (err.name === 'StatusError') {
			res.send(err.status, err.message);
		} else {
			next(err);
		}
	});

	if ('production' === env) {
		console.log('Running production env ...');
	}

	if ('development' === env || 'test' === env) {
		// Serving static files with ionic serve command
		//app.use(express.static(path.join(config.root, 'www')));
		console.log('Running development or test env ...');
	}
};