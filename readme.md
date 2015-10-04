#nodepop

**nodepop** es un API que proporciona servicios a aplicaciones móviles IOS y Android y enlaza con una base de datos MongoDB donde almacea anuncios, usuarios y token de Push.

Está escrito en **node.js** y utiliza el framework web **express**

##Uso

Para arrancar normalmente utilizar `$npm start`

Para arrancar en modo de desarrollo `$npm run dev`

Para inicializar la BD arrancar con el comando `$npm run installDB` cargara usuarios y anuncios de prueba desde el archivo *initDB.json*

También para pasar los test (revisa codigo con JSHint) podemos usar `npm test`


##Funciones

Por el momento estas son los servicios que proporciona:

###Registro

Se accede en la ruta `/apiv1/register' y requiere los siguientes parámetros en el body (x-www-form-urlencoded):

* email
* clave
* nombre

La clave se almacena base de datos codificada con un hash. El email está indexado para que las búsquedas sean más rápidas.

###Autenticación

Se accede en la ruta `/apiv1/usuarios/authenticate` y se pasan también en el body los parámetros:

* email
* contraseña

Si la autenticación (que funciona con JSON Web Token) es correcta nos devolverá un token de autentificación, si no nos dara un error con un mensaje en el idioma especificado opcionalmente en el parametro *lang* cuyos valores pueden ser *es* para español o *en* para inglés. Esto se aplica al resto de recursos de igual forma.


###Lista de anuncios

Se puede acceder en el recurso `/apiv1/anuncios` y se pueden aplicar filtros con los siguientes parámentros en la query string:

* tag [mobile , motor, lifestyle o work]
* venta [true o false]
* precio [10-50, 10- , -50 ó 50]
* nombre [termino de busqueda]

Para ordenar se puede pasar también el campo:

* sort [cualquiera de los anteriores parametros]

Para paginar:

* start [numero de anuncio por el que empezara]
* limit [numero máximo de enuncios que devolvera]

Ya que hay que estar autentificado para acceder a este recurso, tendremos que pasar también el token de autenticación, en la query, el body o en la cabecera.

Llamada de ejemplo: `http://localhost:3000/apiv1/anuncios?tag=mobile&venta=false&nombre=ip&precio=50&start=0&limit=2&sort=precio&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjEwNGUzYzkyOTAzMGMwMTI1MWM5MjYiLCJub21icmUiOiJUaG9tYXMgQW5kZXJzb24iLCJlbWFpbCI6InRhbmRlcnNvbkB0aGVtYXRyaXguY29tIiwiY2xhdmUiOiJhZmYwZjMxM2I1NTY4YWZjMTk0YmU5YmZjMzc4NzY1YTJiZTRmNmRjODA0YjgwZDIyNmJjNzFkYmMxZDgyNWYwIiwiX192IjowfQ.38Wr1aa-_HtoMOuHnR-LrsZ6jg1EN5wDQeKzbej5iw8`

###Lista de tags

Habra que llamar a la ruta `/apiv1/tags` , no hace falta estar logeado en este caso y nos devolverá una lista de los tags posibles.

###Guardar token de Push
En este caso tampoco hace falta validación y la ruta sería `/apiv1/tokenPush` 
El cliente tiene que mandar el valor *ios* o *android* con el parametro *plataforma* en el body junto con el token y opcionalmente el usuario y el sistema los almacenará en la base de datos.

##Otras características

El API implementa cluster para maximizar el rendimiento y el código se ha validado con JSHint.
