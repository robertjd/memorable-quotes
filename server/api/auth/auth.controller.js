/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /auth              ->  index
 * GET     /auth/:id          ->  show
 * POST    /auth              ->  create
 * PUT     /auth/:id          ->  update
 * DELETE  /auth/:id          ->  destroy
 */

'use strict';

// Auth Controller
module.exports = function(app) {
	
	return {
		login: login,
		logout: logout,
		register: register
	};
	
	// Authenticate a user.
	function login(req, res) {
		
	}
	
	// Logout the user authenticated
	function logout(req, res) {
		
	}
	
	// Register a user
	function register(req, res) {
		
	}
	
	// Error codes
	// http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
	function internalServerError(res, err) {
		return res.status(500).send(err);
	}

	function badRequest(res, err) {
		return res.status(400).send(err);
	}

	function notFound(res, err) {
		return res.status(404).send(err);
	}

	function notAcceptable(res, err) {
		return res.status(406).send(err);
	}
}