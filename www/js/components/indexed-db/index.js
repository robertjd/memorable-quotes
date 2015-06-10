/**
* Configuracion global
*/
var dbConf = window.conf.db;

/**
* Funcion definida que crea los store para
* insertar las frases y las imagenes de background
*/
function createIndexedStore() {
    'use strict';
    var fName = 'createIndexedDb():';
    app.consoleLog(fName, 'entry');
    
    /**
    * Se configuran los valores por default para crear
    * el store de quotes
    */
    var qConf = dbConf.indexedDb;
    qConf.storeName = 'quotes';
    qConf.onStoreReady = populateQuotesStore;
    var quotes = new IDBStore(qConf);
    
    /**
    * Se configuran los valores por default para crear
    * el store de url de imagenes de background
    */
    var bConf = dbConf.indexedDb;
    bConf.storeName = 'bg';
    bConf.onStoreReady = populateBgStore;
    var bg = new IDBStore(bConf);
    
    app.consoleLog(fName, 'exit');
}

/**
* Funcion definida que inserta las frases
* en el store de quotes
*/
function populateQuotesStore() {
    'use strict';
    var fName = 'populateQuotesStore():';
    app.consoleLog(fName, 'entry');
    
    this.putBatch(dbConf.tables[0].data, function (result) {
        app.consoleLog(fName, 'batch() call success. Result: ' + result);
    }, function (error) {
        app.consoleLog(fName, 'error: ' + error);
    });
}

/**
* Funcion definida que inserta las url de las imagenes
* en el store de bg
*/
function populateBgStore() {
    'use strict';
    var fName = 'populateBgStore():';
    app.consoleLog(fName, 'entry');
    
    this.putBatch(dbConf.tables[1].data, function (result) {
        app.consoleLog(fName, 'batch() call success. Result: ' + result);
    }, function (error) {
        app.consoleLog(fName, 'error: ' + error);
    });
}

/**
* Posibles valores para el parametro son quotes y bg
* Esta funcion se ejecuta cada vez que se cumple el intervalo
* de tiempo configurado para el cambio de imagenes de background o quotes
*/
function getStore(name) {
    var sConf = dbConf.indexedDb;
    sConf.storePrefix = 'mrq-';
    sConf.storeName = name;
    sConf.onStoreReady = function() { };
    var store = new IDBStore(sConf);
    return store;
}
