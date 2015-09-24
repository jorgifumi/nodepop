/**
 * Created by jorgifumi on 24/9/15.
 */
"use strict";

var mongoose = require('mongoose');

// definir esquema de anuncio

var anuncioSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

// metodo estático que devuelve una lista de la BD
anuncioSchema.statics.lista = function( criterios, callback) {

    // uso .find sin callback para que me de un objeto query sin ejecutar
    var query = Anuncio.find(criterios);

    query.sort('price');

    query.exec( function(err, rows) {
        if (err) {
            return callback(err);
        }

        return callback(null, rows);

    });
};


// exportar

var Anuncio = mongoose.model('Anuncio', anuncioSchemaSchema);

module.exports = Anuncio;
