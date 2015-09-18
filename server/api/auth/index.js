'use strict';

module.exports = function() {

	return chgPassCb;
};

function chgPassCb(req, res) {

	var app = req.app.get('stormpathMiddleware').getApplication();
	var currentPassword = req.body.currentPassword;

	var account = {
		username: req.user.username,
		password: currentPassword
	};

	app.authenticateAccount(account, authAccountCb.bind(null,req, res));
}

function authAccountCb(req, res, err, authenticationResult) {

	if(err) {
		// tell the user that their password is invalid
		res.status(400).json(err);
	} else {
		req.user.password = req.body.newPassword;
		req.user.save(saveCb.bind(null,res));
	}
}

function saveCb(res,err) {

	if(err) {
		// may be that their password is too short, etc
		res.status(400).json(err);
	} else {
		console.log('password was saved');
		res.end();
	}
}