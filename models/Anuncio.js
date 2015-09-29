/**
 * Created by jorgifumi on 24/9/15.
 */
"use strict";

var mongoose = require('mongoose');

// definir esquema de anuncio

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// Método estático que borra todos los anuncios de la BD

anuncioSchema.statics.deleteAll = function(cb) {
    Anuncio.remove({}, function(err) {
        if (err) return cb(err);
        console.log('BD Anuncios borrada')
        cb(null);
    });
};

// metodo estático que devuelve una lista de la BD
anuncioSchema.statics.list = function( criterios, cb) {

    // uso .find sin callback para que me de un objeto query sin ejecutar
    var query = Anuncio.find(criterios.tags & criterios.venta);

    console.log(criterios.tags & criterios.venta);

    query.sort(criterios.sort);
    query.skip(criterios.start);
    query.limit(criterios.limit);

    query.exec( function(err, rows) {
        if (err) {
            return cb(err);
        }

        return cb(null, rows);

    });
};


// exportar

var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
