# memorable-quotes
Memorable Random Quotes

Lo que tenemos que lograr ahora es hacer un login, para que cada usario pueda 
tener diferentes frases y fotos. La informacion del usuario deberia estar en un 
sitio web (ya alquile un hosting en bluehost y voy a crear una base de datos mysql). 
La parte de foto del usuario, la dejamos para mas adelante como una mejora, 
por ahora va sin foto id.

Estas serian las pantallas que tendrian que aparecer:

1-Pantalla de login:
Mostrará los siguientes controles:
Input (textbox) user Name
Input (textbox) Password
Input (button) Login
Al presionar válida (webservice)  y si esta bien, va a la pantalla de información de cuenta.
Link Register Va a pantalla de registro.
Link Forgot password? Va a pantalla de recuperación de password.
Label User or Password incorrect
En rojo, debería de ser visible solo si hay un error.
Label* x 2 Asterisco rojo que aparece si no se inserta algo.

2-Pantalla de Registro / Edición de datos personales:
Esta pantalla será la misma tanto para nuevo registro o editar registro. Si es nuevo, 
el campo UserName será editable. Si no, no. No contempla editar la foto. Para ello 
hay una pantalla separada.

Label / Input UserName - En un registro es un textbox. En una modificacion un Label 
(no puede ser editado). Debe ser único.
Link / Input (textbox) x 2 Password - En un registro son dos textbox (pass, y confirm pass).
En una modificación es un link a la pantalla de cambio de password.
Input (textbox) FirstName
Input (textbox) LastName
Input (textbox) Email
Input (textbox) Zip Code
CheckBoxes M / F - Checkboxes para Male / Female
textbox Birthdate Aca quizas tengamos que hacer un textbox especial, o partirlo en 3, 
o hacer 3 dropboxes con los días, meses, y años, etc.
Input (Button) Update - Vuelve a la pantalla de inicio si fue un update. Va a la pantalla 
de login si fue un registro.
Input (Button) Cancel Dependiendo si es una edición un registro volverá a la pantalla de 
donde vino. Opcional: Podria usarse flechas arriba como en un iphone.
Label * x 7 u 8 Asteriscos rojos indican campos obligatorios no llenados.

4-Pantalla de cambio de password
El usuario debe ingresar el password actual y el nuevo mas de una vez. Opcionalmente se 
podria agregar un boton para cambiar de visible a oculto el password en pantalla.

5-Pantalla de recuperación de password
La pantalla le pedirá el nombre de usuario o el email. Enviará un password temporal al 
email del usuario. La primera vez que se registr con ese password temporal le pedirá 
que lo cambie en la ventana de cambio de password. Podemos hacer esto mandatorio u opcional.