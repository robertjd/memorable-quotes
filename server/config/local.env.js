'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "mt-secret",
  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
	STORMPATH_API_KEY_ID: '6PZEDRW0KPXB8VLO880VCO18W',
	STORMPATH_API_KEY_SECRET: 'Bb6q1US6Eg+gTacbeVFB4D9Sgu3xEBqVBGqcB2BGATE',
	STORMPATH_APP_HREF: 'https://api.stormpath.com/v1/applications/2biRP4LkOm3pZD5Bpynvga'
};
