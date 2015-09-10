'use strict';

//process.env['STORMPATH_API_KEY_ID'] = '6PZEDRW0KPXB8VLO880VCO18W';
//process.env['STORMPATH_API_KEY_SECRET'] = 'Bb6q1US6Eg+gTacbeVFB4D9Sgu3xEBqVBGqcB2BGATE';
//process.env['STORMPATH_APP_HREF'] = 'https://api.stormpath.com/v1/applications/2biRP4LkOm3pZD5Bpynvga';

// Development specific configuration
// ==================================
module.exports = {
    // MySql connection options
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'mtmrq_app',
        debug: false //set true if you wanna see debug logger
    }
};
