/**
* Funcion definida que actualiza la hora
* en la pantalla principal de la applicacion
*/
function updateClock() {
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
    var currentTimeString = currentHours + ':' + currentMinutes + ' ' + timeOfDay;

    /**
    * Se actualiza la hora configurada en el tag html5 <time/>
    */
//    document.querySelector('time')[0].innerHTML = currentTimeString;
    document.getElementsByTagName('time')[0].innerHTML = currentTimeString;
}