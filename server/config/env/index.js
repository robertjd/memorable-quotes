'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
    if(!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Secret for session, you will want to change this and make it an environment variable
    secret: 'mt-secret',

    // List of user roles
    userRoles: ['guest', 'user', 'admin'],
    
    // Multer configuration
    multer: {
        dest: './server/images',
        rename: function(fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
        },
        onFileUploadStart: function(file) {
            console.log(file.originalname + ' is starting ...');
        },
        onFileUploadComplete: function(file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path);
        },
        limits: {
            fieldNameSize: 100,
            files: 2,
            fields: 5
        }
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});