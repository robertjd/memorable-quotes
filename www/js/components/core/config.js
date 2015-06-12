/**
* Modulo de Configuracion global
*/
var confModule = (function() {
    
    var db = {
        type: 1, // sqllite:0 || indexeddb:1
        fileName: 'mrq',
        version: '', //1.0
        displayName: 'memorable random quotes db',
        maxSize: 1024,
        tables: [
            {
                name: 'quotes', 
                cols: [
                    {name: 'quote_id', type: 'int(5)', 
                     restrict: 'primary key asc unique not null'},
                    {name: 'quote_text', type: 'varchar(100)', restrict: 'null'}
                ],
                data: [
                    {id: 1, quote: 'Patience and fortitude conquer all things'},    // Ralph Waldo Emerson
                    {id: 2, quote: 'Necessity is the mother of taking chances'},    // Mark Twain
                    {id: 3, quote: 'Love all. Trust a few. Do wrong to none'},      // William Shakespeare
                    {id: 4, quote: 'Whatever is begun in anger ends in shame'},     // Benjamin Franklin
                    {id: 5, quote: 'I criticize by creation, not by finding fault'},// Cicero
                    {id: 6, quote: 'Character is much easier kept than recovered'}  // Thomas Paine
                 ]

            },
            {
                name: 'bg',
                cols: [
                    {name:'bg_id', type: 'int(5)', 
                     restrict: 'primary key asc unique not null'},
                    {name: 'bg_img', type: 'varchar(100)', restrict: 'null'}
                ],
                data: [
                    {id: 1, 
                     imgsmall: 'images/bg01-small-320x480.png', 
                     imgmedium: 'images/bg01-medium-768x1024.png', 
                     imglarge: 'images/bg01-large-1366x641.png'},
                    {id: 2, 
                     imgsmall: 'images/bg02-small-320x480.png', 
                     imgmedium: 'images/bg02-medium-768x1024.png', 
                     imglarge: 'images/bg02-large-1366x641.png'},
                    {id: 3, 
                     imgsmall: 'images/bg03-small-320x480.png', 
                     imgmedium: 'images/bg03-medium-768x1024.png', 
                     imglarge: 'images/bg03-large-1366x641.png'},
                    {id: 4, 
                     imgsmall: 'images/bg04-small-320x480.png', 
                     imgmedium: 'images/bg04-medium-768x1024.png', 
                     imglarge: 'images/bg04-large-1366x641.png'},
                    {id: 5, 
                     imgsmall: 'images/bg05-small-320x480.png', 
                     imgmedium: 'images/bg05-medium-768x1024.png', 
                     imglarge: 'images/bg05-large-1366x641.png'},
                    {id: 6, 
                     imgsmall: 'images/bg06-small-320x480.png', 
                     imgmedium: 'images/bg06-medium-768x1024.png', 
                     imglarge: 'images/bg06-large-1366x641.png'}
                 ]
            }
        ],
        indexedDb: {
            dbVersion: 2,
            storeName: 'table',
            storePrefix: 'mrq-',
            keyPath: 'id',
            autoIncrement: true
        }
    };
    
    var updtime = {
        CLOCK: 30000,   // Actualizacion del reloj cada 1 minuto
        BG: 60000,      // Actualizacion de la imagen de background cada 2 minutos
        QUOTE: 5000     // Actualizacion de la frase celebre cada 5 segundos
    };
    
    return {
        db: db,
        updtime: updtime
    };
    
})();
