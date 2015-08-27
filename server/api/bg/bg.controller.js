/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /bgs              ->  index
 * GET     /bgs/:id          ->  show
 * POST    /bgs              ->  create
 * PUT     /bgs/:id          ->  update
 * DELETE  /bgs/:id          ->  destroy
 */

'use strict';

// Background Controller
module.exports = function(app) {
    
    return {
        index: index,
        show: show,
        create: create,
        update: update,
        destroy: destroy
    };
    
    /**
    * Get a list of backgrounds
    */
    function index(req, res) {
        
        req.getConnection(function(err, conn) {
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }

            var sqlstm = 'select * from mt_bg';
            var query = conn.query(sqlstm, function(err, rows) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }
                return res.status(200).json(rows);
            });
        });
    }
    
    /**
    * Get background data by id
    */
    function show(req, res) {
        if (!req.params.id) {
            return badRequest(res, 'You must send the background id');
        }
        
        req.getConnection(function(err, conn) {
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }
            
            var sqlstm = 'select * from mt_bg where bg_id = ? ';
            var query = conn.query(sqlstm, [req.params.id], function(err, data) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }
                
                //if user not found
                if(data.length < 1) { 
                    return notFound(res, 'Background not found');
                }

                return res.status(200).json(data[0]);
            });
        });
    }
    
    /**
    * Create a background in the system
    */
    function create(req, res) {
        if (!req.body.bg.smallImg || 
            !req.body.bg.largeImg) {
            return badRequest(res, 'You must send the require data to create it');
        }
        
        req.getConnection(function (err, conn){
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err);
            }

						var bg = {
								smallImg: req.body.bg.smallImg,
								largeImg: req.body.bg.largeImg
						};
						var sqlstm = 'insert into mt_bg set ? ';
						var query = conn.query(sqlstm, bg, function(err, rows) {
								if(err) {
										return internalServerError(res, 'Mysql error, check your query: ' + err);
								}

								return res.status(201).json('Background created');
						});
         });
    }
    
    /**
    * Update background data based on its id
    */
    function update(req, res) {
        if (!req.params.id) {
            return badRequest(res, 'You must send the background id');
        }
        
        if(!req.body.bg) {
            return badRequest(res, 'You must send the background data');
        }
        
        req.getConnection(function (err, conn){
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }
            
            var bg = {
                smallImg: req.body.bg.smallImg,
								largeImg: req.body.bg.largeImg
            };
            var sqlstm = 'update mt_bg set ? where bg_id = ? ';
            var query = conn.query(sqlstm, [bg, req.params.id], function(err, info) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }

                //if user not found
                if(info.changedRows < 1) { 
                    return notFound(res, 'Background Not found'); 
                }

                return res.status(200).json('Background updated');
            });
        });
    }
    
    /**
    * Deletes user based on its id
    */
    function destroy(req, res) {
        if (!req.params.id) {
            return badRequest(res, 'You must send the background id');
        }
    
        req.getConnection(function(err, conn) {
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }
            
            var sqlstm = 'delete from mt_bg where bg_id = ? ';
            var query = conn.query(sqlstm, [req.params.id], function(err, rows) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }
                
                //if user not found
                if(rows.length < 1) { 
                    return notFound(res, 'Background Not found'); 
                }

                return res.status(200).json(rows);
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