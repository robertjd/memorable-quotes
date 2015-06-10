/**
* Configuracion global
*/
var dbConf = window.conf.db;

/**
* deprecated
* no usada
*/
function getRandomBg() {
    var random_bg = document.getElementsByClassName('random-bg')[0];
    var url = random_bg.style.backgroundImage;
    url = url.replace('url(', '')
    url = url.replace(')', '');
    
    var img = document.createElement('img');
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
    var randomBg = document.getElementsByClassName('random-bg')[0];
    randomBg.style.backgroundImage = 'url(' + url + ')';
}

/**
* Funcion declarada que fija la frase celebre
* dado el parametro text
*/
function setRandomQuote(text) {
    var randomQuote = document.getElementsByClassName('random-quote')[0];
    randomQuote.innerHTML = text;
}

/**
* Funcion declarada  que se ejecuta cada vez
* que se cumple el tiempo configurado para cambiar
* la imagen del background. Esta busca las imagenes
* en el store y selecciona una de ellas aleatoreamente
*/
function changeBg() {
    'use strict';
    var fName = 'changeBg():';
    
    var s = getStore('bg');
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
    'use strict';
    var fName = 'changeQuote():';
    
    var s = getStore('quotes');
    s.onStoreReady = function() {
        this.getAll(function(items){
            var item = items[Math.floor(Math.random()*items.length)];
            setRandomQuote(item.quote);

        }, function(error) {
            app.consoleLog(fName, 'error: ' + error);
        });
    };
}