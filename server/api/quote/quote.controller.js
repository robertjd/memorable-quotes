/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /quotes              ->  index
 * GET     /quotes/:id          ->  show
 * POST    /quotes              ->  create
 * PUT     /quotes/:id          ->  update
 * DELETE  /quotes/:id          ->  destroy
 */

'use strict';

// Quote Controller
module.exports = function(app) {
    
    return {
        index: index,
        show: show,
        create: create,
        update: update,
        destroy: destroy
    };
    
    /**
    * Get a list of quotes
    */
    function index(req, res) {
        
        req.getConnection(function(err, conn) {
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }

            var sqlstm = 'select * from mt_quote';
            var query = conn.query(sqlstm, function(err, rows) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }
                return res.status(200).json(rows);
            });
        });
    }
    
    /**
    * Get quote data by id
    */
    function show(req, res) {
        if (!req.params.id) {
            return badRequest(res, 'You must send the quote id');
        }
        
        req.getConnection(function(err, conn) {
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }
            
            var sqlstm = 'select * from mt_quote where quote_id = ? ';
            var query = conn.query(sqlstm, [req.params.id], function(err, data) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }
                
                //if quote not found
                if(data.length < 1) { 
                    return notFound(res, 'Quote not found');
                }

                return res.status(200).json(data[0]);
            });
        });
    }
    
    /**
    * Create a quote in the system
    */
    function create(req, res) {
        if (!req.body.quote.quote || 
            !req.body.quote.author) {
            return badRequest(res, 'You must send the require data to create it');
        }
        
        req.getConnection(function (err, conn){
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err);
            }

						var quote = {
								quote: req.body.quote.quote,
								author: req.body.quote.author
						};
						var sqlstm = 'insert into mt_quote set ? ';
						var query = conn.query(sqlstm, quote, function(err, rows) {
								if(err) {
										return internalServerError(res, 'Mysql error, check your query: ' + err);
								}

								return res.status(201).json('Quote created');
						});
         });
    }
    
    /**
    * Update quote data based on its id
    */
    function update(req, res) {
        if (!req.params.id) {
            return badRequest(res, 'You must send the quote id');
        }
        
        if(!req.body.quote) {
            return badRequest(res, 'You must send the quote data');
        }
        
        req.getConnection(function (err, conn){
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }
            
            var quote = {
                quote: req.body.quote.quote,
								author: req.body.quote.author
            };
            var sqlstm = 'update mt_quote set ? where quote_id = ? ';
            var query = conn.query(sqlstm, [bg, req.params.id], function(err, info) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }

                //if quote not found
                if(info.changedRows < 1) { 
                    return notFound(res, 'Quote Not found'); 
                }

                return res.status(200).json('Quote updated');
            });
        });
    }
    
    /**
    * Deletes quote based on its id
    */
    function destroy(req, res) {
        if (!req.params.id) {
            return badRequest(res, 'You must send the quote id');
        }
    
        req.getConnection(function(err, conn) {
            if (err) { 
                return internalServerError(res, 'Cannot Connect: ' + err); 
            }
            
            var sqlstm = 'delete from mt_quote where quote_id = ? ';
            var query = conn.query(sqlstm, [req.params.id], function(err, rows) {
                if(err) {
                    return internalServerError(res, 'Mysql error, check your query: ' + err);
                }
                
                //if quote not found
                if(rows.length < 1) { 
                    return notFound(res, 'Quote Not found'); 
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