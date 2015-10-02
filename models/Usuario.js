/**
 * Created by jorgifumi on 26/9/15.
 */
"use strict";

var mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

var createHash = require('sha.js');
var sha256 = createHash('sha256');

usuarioSchema.statics.new = function(datos, cb){

    var claveHash = sha256.update(datos.clave, 'utf8').digest('hex');

    var usuario = new Usuario({nombre: datos.nombre, email: datos.email, clave: claveHash});

    usuario.save(function (err, usuarioCreado) {
        if (err){
            return cb(err);
        }
        console.log('Usuario ' + usuarioCreado.nombre + ' creado');
        return cb(null);
    });
};


// exportar

var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;