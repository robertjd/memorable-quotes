/**
* Configuracion global
*/
var dbConf = window.conf.db;

/**
* Funcion definida que crea la base da datos
*/
function createSqlLiteDb() {
    'use strict';
    var fName = 'createSqlLiteDb():';
    app.consoleLog(fName, 'entry');
    
    /**
    * 
    */
    try {
        if(window.openDatabase) {
            var db = openDatabase(
                dbConf.fileName,
                dbConf.version,
                dbConf.displayName,
                dbConf.maxSize
            );
            
            if(!db) {
                // This is probably because the version was bad or 
                // there is not enough space left in this domain's quota
                app.consoleLog(fName, 'Failed to open the database on disk');
            }
            
            createTables(db);
            insertData(db);
        } else {
            app.consoleLog(fName, 'openDatabase is not supported');
        }
        
    } catch(err) {
        app.consoleLog(fName, err.message);
    }
    
    app.consoleLog(fName, 'exit');
}

function createTables(db) {
    'use strict';
    var fName = 'createTables(db):';
    app.consoleLog(fName, 'entry');
    
    var tables = dbConf.tables;
    db.transaction(function(tx) {
        for(var i=0; i < tables.length; i++) {
            
            var cols = tables[i].cols;
            var sql = 'create table if not exists ' + tables[i].name + ' (';
            
            for(var j=0; j < cols.length; j++) {
                sql = sql + cols[j].name + ' ' + cols[j].type + ' ' + cols[j].restrict;
                if(j < cols.length - 1)
                     sql = sql + ', ';
            }
            sql = sql + ')';
            
            tx.executeSql(sql, [], function(tx, results) {
                app.consoleLog(fName, sql);
            }, error);
        }
    });
    
    app.consoleLog(fName, 'exit');
}

function insertData(db) {
    'use strict';
    var fName = 'createTables(db):';
    app.consoleLog(fName, 'entry');
    
    var tables = dbConf.tables;
    db.transaction(function(tx) {
        
        for(var i=0; i < tables.length; i++) {
            var cols = '';
            for(var j=0; j < tables[i].cols.length; j++) {
                cols = cols + tables[i].cols[j].name;
                if(j < tables[i].cols.length - 1)
                    cols = cols + ', ';
            }

            for(var j=0; j < tables[i].data.length; j++) {
                var sql = 'insert into ' + tables[i].name + ' (';
                sql = sql + cols;
                sql = sql + ') values (';        
                sql = sql + getData(tables[i].data[j]) + ')';
                
                tx.executeSql(sql, [], function(tx, results) {
                    app.consoleLog(fName, sql);
                }, error);
            }
        }
    });
    
    app.consoleLog(fName, 'exit');
}

function getData(obj) {
    var arr = [];
    for(var key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(obj[key]);
        }
    }
    return arr.join(', ');
}

function error(tx, err) {
    // err.message
    return false;
}