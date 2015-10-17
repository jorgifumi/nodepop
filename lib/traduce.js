/**
 * Created by jorgifumi on 2/10/15.
 */
'use strict';

module.exports = function(mensaje, idioma, cb) {

        if(typeof idioma == 'undefined' || idioma !== 'en') {
            idioma = 'es'; //si no se especifica idioma o se especifica uno invalido por defecto saldra en español
        }
        return cb(null, JSON.parse(global.errores)[idioma][mensaje]);
};