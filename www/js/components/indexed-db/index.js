/**
* Configuracion global
*/
var dbConf = window.conf.db;

/**
* Funcion definida que crea los store para
* las frases y las imagenes de background
*/
function createIndexedStore() {
    'use strict';
    var fName = 'createIndexedDb():';
    app.consoleLog(fName, 'entry');
    
    var qConf = dbConf.indexedDb;
    qConf.storePrefix = 'mrq-';
    qConf.storeName = 'quotes';
    qConf.onStoreReady = populateQuotesStore;
    var quotes = new IDBStore(qConf);
    
    var bConf = dbConf.indexedDb;
    bConf.storePrefix = 'mrq-';
    bConf.storeName = 'bg';
    bConf.onStoreReady = populateBgStore;
    var bg = new IDBStore(bConf);
    
    app.consoleLog(fName, 'exit');
}

function populateQuotesStore() {
    this.putBatch(dbConf.tables[0].data, function (result) {
      console.log('batch() call success. Result:', result);
    }, function (error) {
      console.log("error", error);
    });
}

function populateBgStore() {
    this.putBatch(dbConf.tables[1].data, function (result) {
      console.log('batch() call success. Result:', result);
    }, function (error) {
      console.log("error", error);
    });
}

/**
* Posibles valores para name son quotes y bg
*/
function getStore(name) {
    var sConf = dbConf.indexedDb;
    sConf.storePrefix = 'mrq-';
    sConf.storeName = name;
    sConf.onStoreReady = function() { };
    var store = new IDBStore(sConf);
    return store;
}
