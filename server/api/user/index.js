'use strict';

var express = require('express');
var controller = require('./user.controller');

module.exports = function(app) {
    
    var router = express.Router();
    var appCtrl = controller(app);
    
    router.get('/', appCtrl.index);
    router.get('/:id', appCtrl.show);
    router.post('/', appCtrl.create);
    router.post('/me', appCtrl.me);
    router.put('/:id', appCtrl.update);
    router.patch('/:id', appCtrl.chgpass);
    router.delete('/:id', appCtrl.destroy);
    
    return router;
    
};
