/**
* Modulo global del reloj de la aplicacion
* @param document
*/
var clockModule = (function(doc) {
    'use strict';
    
    /**
    * Definicion de la variable que se configura para
    * mostrar la hora actualizada
    */
    var currentTimeString;
    
    /**
    * Esta funcion se ejecuta segun el tiempo configurado
    * en la variable global confModule.updtime.CLOCK
    */
    function update() {
        setCurrentTimeString();
        setCurrentTimeDisplay();
    }
    
    /**
    * Esta funcion calcula y concatena las siguientes variables
    * currentHours, currentMinutes, timeOfDay en el formato 'H:MM PM/AM'
    */
    function setCurrentTimeString() {
        /**
        * Obtiene la fecha actual del dia
        */
        var currentTime = new Date();

        /**
        * Obtiene solo las horas y minutos
        */
        var currentHours = currentTime.getHours();
        var currentMinutes = currentTime.getMinutes();

        /**
        * Antepone un cero a los minutos si es menor de 10, por ejemplo 05
        * haciendo zero left padding
        */
        currentMinutes = (currentMinutes < 10 ? '0' : '') + currentMinutes;

        /**
        * Se selecciona AM como simbolo para antes de las 12
        * y PM como simbolo para despues de las 12 del medio dia
        */
        var timeOfDay = (currentHours < 12) ? 'AM' : 'PM';

        /**
        * Convierte al formato de 12 horas
        */
        currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

        /**
        * Si la hora es 0 entonces lo convierte a las 12 como
        * unica excepcion
        */
        currentHours = (currentHours == 0) ? 12 : currentHours;

        /**
        * Concatenacion del string que se debe mostrar finalmente
        * en pantalla, el formato es por ejemplo '3:40 PM'
        */
        currentTimeString = currentHours + ':' + currentMinutes + ' ' + timeOfDay;
    }
    
    /**
    * Esta funcion muestra en el html la hora actual
    */
    function setCurrentTimeDisplay() {
        //doc.querySelector('time')[0].innerHTML = currentTimeString;
        doc.getElementsByTagName('time')[0].innerHTML = currentTimeString;
    }
    
    return {
        update: update
    };
   
})(document);