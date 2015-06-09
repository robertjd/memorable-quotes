/**
* Configuracion global
*/
var dbConf = window.conf.db;

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

function setRandomBg(url) {
    var randomBg = document.getElementsByClassName('random-bg')[0];
    randomBg.style.backgroundImage = 'url(' + url + ')';
}

function setRandomQuote(text) {
    var randomQuote = document.getElementsByClassName('random-quote')[0];
    randomQuote.innerHTML = text;
}

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