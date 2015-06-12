/**
* Application Module
*/
var appModule = (function(app, conf, clockm, sqlm, idbm, utilm) {
    'use strict';
    
    return {
        initClock: initClock,
        initDb: initDb,
        initBg: randomBg,
        initQuote: randomQuote
    };
    
    /**
    * Funcion declarada que inicializa el reloj
    */
    function initClock() {
        var fName = 'initClock():';
        app.consoleLog(fName, 'entry');

        clockm.update()
        setInterval('clockModule.update()', conf.updtime.CLOCK);

        app.consoleLog(fName, 'exit');
    }

    /**
    * Funcion declarada que inicializa la base de datos web
    */
    function initDb() {
        var fName = 'initDb():';
        app.consoleLog(fName, 'entry');

        if(conf.db.type === 0) {
            sqlm.createDb();

        } else if(conf.db.type === 1) {
            idbm.createDb();
        }

        app.consoleLog(fName, 'exit');
    }

    /**
    * Funcion declarada que carga la imagen random desde la bd
    * y la ajusta como background
    */
    function randomQuote() {
        var fName = 'randomQuote():';
        app.consoleLog(fName, 'entry');

        var item = utilm.getRandomItem(conf.db.tables[0].data);
        utilm.setRandomQuote(item.quote);
        setInterval('utilModule.changeQuote()', conf.updtime.QUOTE);

        app.consoleLog(fName, 'exit');
    }
    
    /**
    * Funcion declarada que carga la imagen random desde la bd
    * y la ajusta como background
    */
    function randomBg() {
        var fName = 'randomBg():';
        app.consoleLog(fName, 'entry');

        var item = utilm.getRandomItem(conf.db.tables[1].data);
        utilm.setRandomBg(item);
        setInterval('utilModule.changeBg()', conf.updtime.BG);

        app.consoleLog(fName, 'exit');
    }
    
})(window.app, confModule, clockModule, sqlLiteModule, indexedDbModule, utilModule);