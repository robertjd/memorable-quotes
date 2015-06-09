window.conf = {
    db: {
        type: 'indexeddb', // sqllite || indexeddb
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
                    {id: 1, quote: 'Memorable quote 1'},
                    {id: 2, quote: 'Memorable quote 2'},
                    {id: 3, quote: 'Memorable quote 3'},
                    {id: 4, quote: 'Memorable quote 4'},
                    {id: 5, quote: 'Memorable quote 5'},
                    {id: 6, quote: 'Memorable quote 6'}
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
            storeName: 'mrq',
            storePrefix: 'IDBWrapper-',
            keyPath: 'id',
            autoIncrement: true
        }
    }
};
