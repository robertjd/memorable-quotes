/**
 * Express configuration
 */

'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var cors = require('cors');

var path = require('path');
var config = require('./env');

module.exports = function(app) {
    var env = app.get('env');

    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    // app.use(cors());
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
        console.log('Running development or test env ...');
    }
};