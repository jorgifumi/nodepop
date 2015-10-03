/**
 * Created by jorgifumi on 2/10/15.
 */
"use strict";

let fs = require('fs');
let path = require('path');

let ruta = path.join('./', 'errores.json');

module.exports = function(mensaje, idioma, cb) {

    fs.readFile(ruta, function(err, resp){
        if (err) {
            cb(err);
        }

        if(typeof idioma == 'undefined' || idioma !== 'en') {
            idioma = 'es'; //si no se especifica idioma o se especifica uno invalido por defecto saldra en español
        }
        console.log(JSON.parse(resp)[idioma][mensaje]);
        return cb(null, JSON.parse(resp)[idioma][mensaje]);
    });
};