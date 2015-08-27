/**
 * Token Generator
 */

'use strict';

var config  = require('../config/env'),
    jwt     = require('jsonwebtoken');

module.exports = function() {
    
    return {
        sign: sign,
        verify: verify
    };
    
    // sign with default (HMAC SHA256) 
    function sign(user) {
        return jwt.sign(
            user,
            config.secret, 
            {expiresInMinutes: 60*5}
        );
    }
    
    function verify(token) {
        try {
            var decoded = jwt.verify(token, config.secret);
            return decoded;
        } catch(err) {
            return err;
        }
    }
    
};