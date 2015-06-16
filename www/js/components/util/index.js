/**
* Modulo Util
*/
var utilModule = (function(app, doc, idbm){
    'use strict';
    
    return {
        changeBg: changeBg,
        changeQuote: changeQuote,
        setRandomQuote: setRandomQuote,
        setRandomBg: setRandomBg,
        getRandomItem: getRandomItem
    };

    /**
    * Funcion declarada que fija la imagen de background
    * dado el parametro url
    */
    function setRandomBg(item) {
        var randomBg = doc.getElementsByTagName('body')[0];
        
        /**
        * Configuracion programatica de los Media Query
        * para que las imagenes cumplan con el estandar
        * responsive design
        */
        var smallmq = window.matchMedia('only screen and (max-width: 767px)');
        var largemq = window.matchMedia('only screen and (min-width: 768px)');

        /**
        * Se configuran los listeners para cada tamanio de imagen
        * de acuerdo al media query dinamico
        */
        smallmq.addListener(smallMatch);
        smallMatch(smallmq);
        largemq.addListener(largeMatch);
        largeMatch(largemq);
        
        /**
        * Listener para actualizar el estilo dinamicamente
        * de la imagen del background cuando la pantalla es de
        * tipo small
        */
        function smallMatch(mq) {
            if (mq.matches)
                randomBg.style.backgroundImage = 'url(' + item.imgsmall + ')';
        }

        /**
        * Listener para actualizar el estilo dinamicamente
        * de la imagen del background cuando la pantalla es de
        * tipo large
        */
        function largeMatch(mq) {
            if (mq.matches)
                randomBg.style.backgroundImage = 'url(' + item.imglarge + ')';
        }
    }

    /**
    * Funcion declarada que fija la frase celebre
    * dado el parametro text
    */
    function setRandomQuote(text) {
        var randomQuote = doc.getElementsByClassName('random-quote')[0];
        randomQuote.innerHTML = text;
    }

    /**
    * Funcion declarada  que se ejecuta cada vez
    * que se cumple el tiempo configurado para cambiar
    * la imagen del background. Esta busca las imagenes
    * en el store y selecciona una de ellas aleatoreamente
    */
    function changeBg() {
        var fName = 'changeBg():';

        var s = idbm.getStore('bg');
        s.onStoreReady = function() {
            this.getAll(function(items){
                var item = getRandomItem(items);
                setRandomBg(item);
                
            }, function(error) {
                app.consoleLog(fName, 'error: ' + error);
            });
        };
    }

    /**
    * Funcion declarada  que se ejecuta cada vez
    * que se cumple el tiempo configurado para cambiar
    * la frase celebre. Esta busca las frases
    * en el store y selecciona una de ellas aleatoreamente
    */
    function changeQuote() {
        var fName = 'changeQuote():';

        var s = idbm.getStore('quotes');
        s.onStoreReady = function() {
            this.getAll(function(items){
                var item = getRandomItem(items);
                setRandomQuote(item.quote);

            }, function(error) {
                app.consoleLog(fName, 'error: ' + error);
            });
        };
    }
    
    /**
    * Funcion declarada  que retorna el un objeto item
    * aleatorio dado un array de objetos item
    */
    function getRandomItem(items) {
        var item = items[Math.floor(Math.random()*items.length)];
        return item;
    }
    
})(window.app, document, indexedDbModule);
