/**
* Configuracion global
*/
var updtime = window.conf.updtime;

/**
* Funcion declarada que inicializa el reloj
*/
function initClock() {
    'use strict';
    var fName = 'initClock():';
    app.consoleLog(fName, 'entry');
    
    updateClock();
    setInterval('updateClock()', updtime.CLOCK);
    
    app.consoleLog(fName, 'exit');
}

/**
* Funcion declarada que inicializa la base de datos web
*/
function initDb() {
    'use strict';
    var fName = 'initDb():';
    app.consoleLog(fName, 'entry');
    
    if(window.conf.db.type === 'sqllite') {
        createSqlLiteDb();
        
    } else if(window.conf.db.type === 'indexeddb') {
        createIndexedStore();
    }
    
    app.consoleLog(fName, 'exit');
}

/**
* Funcion declarada que carga la imagen random desde la bd
* y la ajusta como background
*/
function randomBg() {
    'use strict';
    var fName = 'randomBg():';
    app.consoleLog(fName, 'entry');
    
    setInterval('changeBg()', updtime.BG);
    
    app.consoleLog(fName, 'exit');
}

/**
* Funcion declarada que carga la imagen random desde la bd
* y la ajusta como background
*/
function randomQuote() {
    'use strict';
    var fName = 'randomQuote():';
    app.consoleLog(fName, 'entry');
    
    setInterval('changeQuote()', updtime.QUOTE);
    
    app.consoleLog(fName, 'exit');
}