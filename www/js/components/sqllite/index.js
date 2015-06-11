/**
* Modulo SqlLite
*/
var sqlLiteModule = (function(app, dbConf) {
    'use strict';
    
    return {
        createDb: createDb
    };
    
    /**
    * Funcion definida que crea o abre la comunicacion con la base da datos
    */
    function createDb() {
        var fName = 'createDb():';
        app.consoleLog(fName, 'entry');

        /**
        * Crea o abre la base de datos si 
        * ya se encuentra creada
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

    /**
    * Crea las tablas dinamicamente
    * deacuerdo a los datos en la configuracion global
    */
    function createTables(db) {
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
                    app.consoleLog(fName, sql, tx, results);
                }, error);
            }
        });

        app.consoleLog(fName, 'exit');
    }

    /**
    * Crea las tablas dinamicamente
    * deacuerdo a los datos en la configuracion global
    */
    function insertData(db) {
        var fName = 'insertData(db):';
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
                        app.consoleLog(fName, sql, tx, results);
                    }, error);
                }
            }
        });

        app.consoleLog(fName, 'exit');
    }

    /**
    * Obtiene los datos en forma
    * de array separados por coma
    */
    function getData(obj) {
        var arr = [];
        for(var key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push(obj[key]);
            }
        }
        return arr.join(', ');
    }

    /**
    * Funcion callback de error
    * para las transacciones de creacion de tablas
    * como para las de insercion de datos
    */
    function error(tx, err) {
        app.consoleLog('error:', tx, err.message);
        return false;
    }
    
})(window.app, confModule.db);