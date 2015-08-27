/**
 * Password Generator
 */

'use strict';

var config  = require('../config/env');

module.exports = function() {
    
    return {
        random: random
    };
    
    function random() {
        var r = Math.floor(Math.random() * 999) + 100
        return r.toString();
    }
};