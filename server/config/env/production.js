'use strict';

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        undefined,

  // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        8080,

    // MySql connection options
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test',
        debug: false //set true if you wanna see debug logger
    }
};