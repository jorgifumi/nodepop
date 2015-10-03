/**
 * Created by jorgifumi on 2/10/15.
 */
"use strict";

var fs = require('fs');
var path = require('path');

const ruta = path.join('./', 'errores.json');

module.exports = function(clave, idioma) {

    fs.readFile(ruta, function(err, res){
        if (err){
            //controlar error
            return;
        }
        console.log(res);
        return res.json(idioma.clave);
    });
};