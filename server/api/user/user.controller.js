/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /users              ->  index
 * GET     /users/:id          ->  show
 * POST    /users              ->  create
 * POST    /users/me           ->  me
 * PUT     /users/:id          ->  update
 * DELETE  /users/:id          ->  destroy
 * PATCH   /users/:id          ->  chgpass
 */

'use strict';

var tokenUtil = require('../../util/token')();
var passUtil = require('../../util/password')();

// User Controller
module.exports = function(app) {
    
    return {
        index: index,
        show: show,
        create: create,
        update: update,
        destroy: destroy,
        me: me,
        chgpass: chgpass
    };
    
    /**
    * Get a list of system users
    */
    function index(req, res) {
        
        req.getConnection(function(err, conn) {
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }

            var sqlstm = 'select * from mt_user';
            var query = conn.query(sqlstm, function(err, rows) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }
                return res.status(200).json(rows);
            });
        });
    }
    
    /**
    * Get the user info by id
    */
    function show(req, res) {
        if (!req.params.id) {
            return badRequest(res, 'You must send the user id');
        }
        
        req.getConnection(function(err, conn) {
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }
            
            var sqlstm = 'select * from mt_user where user_id = ? ';
            var query = conn.query(sqlstm, [req.params.id], function(err, data) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }
                
                //if user not found
                if(data.length < 1) { 
                    return notFound(res, 'Username not found');
                }

                return res.status(200).json(data[0]);
            });
        });
    }
    
    /**
    * Create a user in the system
    */
    function create(req, res) {
        if (!req.body.user.username || 
            !req.body.user.password ||
            !req.body.user.email ||
            !req.body.user.firstname ||
            !req.body.user.lastname ||
            !req.body.user.gender ||
            !req.body.user.birthdate) {
            return badRequest(res, 'You must send the require user info to create it');
        }
        
        req.getConnection(function (err, conn){
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err);
            }

            var values = [req.body.user.username, req.body.user.email];
            var sqlstm = 'select 1 from mt_user where username = ? or email = ? ';
            var query = conn.query(sqlstm, values, function(err, rows) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }
                
                // if username exists
                if(rows.length > 0) { 
                    return badRequest(res, 'Username or email already exist');
                }
                
                var user = {
                    username: req.body.user.username,
                    password: req.body.user.password,
                    email: req.body.user.email,
                    firstname: req.body.user.firstname,
                    lastname: req.body.user.lastname,
                    zipcode: req.body.user.zipcode,
                    gender: req.body.user.gender,
                    birthdate: req.body.user.birthdate
                };
                var sqlstm = 'insert into mt_user set ? ';
                var query = conn.query(sqlstm, user, function(err, rows) {
                    if(err) {
                        return internalServerError(res, 'Mysql error, check your query: ' + err);
                    }
                    
                    return res.status(201).json('User created');
                });
            });

         });
    }
    
    /**
    * Update user data based on its id
    */
    function update(req, res) {
        if (!req.params.id) {
            return badRequest(res, 'You must send the user id');
        }
        
        if(!req.body.user) {
            return badRequest(res, 'You must send the user data');
        }
        
        req.getConnection(function (err, conn){
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }
            
            var data = {
                email: req.body.user.email,
                firstname: req.body.user.firstname,
                lastname: req.body.user.lastname,
                zipcode: req.body.user.zipcode,
                gender: req.body.user.gender,
                birthdate: req.body.user.birthdate
            };
            var sqlstm = 'update mt_user set ? where user_id = ? ';
            var query = conn.query(sqlstm, [data, req.params.id], function(err, info) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }

                //if user not found
                if(info.changedRows < 1) { 
                    return notFound(res, 'User Not found'); 
                }

                return res.status(200).json('User updated');
            });
        });
    }
    
    /**
    * Update user password based on its token
    */
    function chgpass(req, res) {
        if(!req.body.token) {
            return badRequest(res, 'You must send the token');
        }
        
        if(!req.body.password || !req.body.newPassword) {
            return badRequest(res, 'You must send password and newPassword');
        }
        
        var userDecoded = tokenUtil.verify(req.body.token);
        var userId = userDecoded.user_id;
        
        req.getConnection(function (err, conn){
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }
            
            // Validates password and newPassword given
            var values = [req.body.newPassword, userId, req.body.password];
            var sqlstm = 'update mt_user set password = ? where user_id = ? and password = ? ';
            var query = conn.query(sqlstm, values, function(err, info) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }

                // validates if user was updated
                if(info.changedRows < 1) {
                    return notFound(res, 'Password not updated');
                }

                return res.status(200).json('Password changed');
            });
        });
    }
    
    /**
    * Update user password based on its token
    */
    function forgotpass(req, res) {
        if(!req.body.username) {
            return badRequest(res, 'You must send username or email');
        }
        
        req.getConnection(function (err, conn){
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }
            
            // Validates if username or email exist
            var values = [passUtil.random(), req.body.username, req.body.username];
            var sqlstm = 'update mt_user set password = ? where username = ? or email = ? ';
            var query = conn.query(sqlstm, values, function(err, info) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }

                // validates if user was updated
                if(info.changedRows < 1) {
                    return notFound(res, 'Password not updated');
                }

                return res.status(200).json('Password changed');
            });
        });
    }
    
    /**
    * Deletes user based on its id
    */
    function destroy(req, res) {
        if (!req.params.id) {
            return badRequest(res, 'You must send the user id');
        }
    
        req.getConnection(function(err, conn) {
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }
            
            var sqlstm = 'delete from mt_user where user_id = ? ';
            var query = conn.query(sqlstm, [req.params.id], function(err, rows) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }
                
                //if user not found
                if(rows.length < 1) { 
                    return notFound(res, 'User Not found'); 
                }

                return res.status(200).json(rows);
            });
        });
    }
    
    /**
    * Get user data from the login form and returns a token for
    * the session
    */
    function me(req, res) {
        if(!req.body.user) {
            return badRequest(res, 'You must send the user data');
        }
        
        if (!req.body.user.username || !req.body.user.password) {
            return badRequest(res, 'You must send the username and the password');
        }
        
        req.getConnection(function(err, conn) {
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }

            var values = [req.body.user.username, req.body.user.password];
            var sqlstm = 'select * from mt_user where username = ? and password = ? ';
            var query = conn.query(sqlstm, values, function(err, data) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }
                
                //if user not found
                if(data.length < 1) { 
                    return notFound(res, 'The user does not exist'); 
                }
                
                // Do not show the password in token data
                delete data[0]['password'];

                return res.status(200).json({token: tokenUtil.sign(data[0])});
            });
        });
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
};