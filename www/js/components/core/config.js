/**
* Configuracion global
*/
window.conf = {
    db: {
        // sqllite || indexeddb
        type: 'indexeddb',
        fileName: 'mrq',
        version: '', //1.0
        displayName: 'memorable random quotes db',
        maxSize: 1024,
        tables: [
            {
                name: 'mrq_quotes', 
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
                name: 'mrq_bg',
                cols: [
                    {name:'bg_id', type: 'int(5)', 
                     restrict: 'primary key asc unique not null'},
                    {name: 'bg_img', type: 'varchar(100)', restrict: 'null'}
                ],
                data: [
                    {id: 1, img: '../www/images/bg01.png'},
                    {id: 2, img: '../www/images/bg02.png'},
                    {id: 3, img: '../www/images/bg03.png'},
                    {id: 4, img: '../www/images/bg04.png'},
                    {id: 5, img: '../www/images/bg05.png'},
                    {id: 6, img: '../www/images/bg06.png'}
                 ]
            }
        ],
        indexedDb: {
            dbVersion: 1,
            storeName: 'table',
            storePrefix: 'mrq-',
            keyPath: 'id',
            autoIncrement: true
        }
    },
    updtime: {
        CLOCK: 60000,   // Actualizacion del reloj cada 1 minuto
        BG: 60000,      // Actualizacion de la imagen de background cada 1 minuto
        QUOTE: 5000     // Actualizacion de la frase celebre cada 5 segundos
    }
};
