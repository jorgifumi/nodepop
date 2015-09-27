/**
 * Created by jorgifumi on 26/9/15.
 */
"use strict";

var mongoose = require('mongoose');

var db = mongoose.connection;

// handler de error de conexion
db.on('error', function(err) {
    console.log(err);
    process.exit(1);
});


// handler de conexion

db.once('open', function() {
    console.log('conectado a mongodb');
});

// conectamos

mongoose.connect('mongodb://localhost/nodepop');

// Inicializamos modelos

require('./Anuncio');
require('./Usuario');


module.exports = db;
