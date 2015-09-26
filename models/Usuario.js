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

// exportar

var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;