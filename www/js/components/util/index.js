/**
* Modulo Util
*/
var utilModule = (function(app, doc, idbm){
    'use strict';
    
    return {
        changeBg: changeBg,
        changeQuote: changeQuote
    };
    
    /**
    * deprecated
    */
    function getRandomBg() {
        var random_bg = doc.getElementsByClassName('random-bg')[0];
        var url = random_bg.style.backgroundImage;
        url = url.replace('url(', '')
        url = url.replace(')', '');

        var img = doc.createElement('img');
        img.src = url;
        img.style.height = '480px';
        img.style.width = '320px';

        return img;
    }

    /**
    * Funcion declarada que fija la imagen de background
    * dado el parametro url
    */
    function setRandomBg(url) {
        var randomBg = doc.getElementsByClassName('random-bg')[0];
        randomBg.style.backgroundImage = 'url(' + url + ')';
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
                var item = items[Math.floor(Math.random()*items.length)];
                setRandomBg(item.img);

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
                var item = items[Math.floor(Math.random()*items.length)];
                setRandomQuote(item.quote);

            }, function(error) {
                app.consoleLog(fName, 'error: ' + error);
            });
        };
    }
    
})(window.app, document, indexedDbModule);
