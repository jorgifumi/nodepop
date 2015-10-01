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

// metodo estático que devuelve una lista con filtros de la BD
anuncioSchema.statics.list = function( criterios, cb) {

    let filtros = {};

    if (typeof criterios.venta !== 'undefined') {
        filtros.venta = criterios.venta;
    }

    if (typeof criterios.tags !== 'undefined') {
        filtros.tags = criterios.tags;
    }

    switch (criterios.precio){
        case '10-50':
            filtros.precio =  { '$gte': '10', '$lte': '50' };
            break;
        case '10-':
            filtros.precio = { '$gte': '10' };
            break;
        case '-50':
            filtros.precio = { '$lte': '50' };
            break;
        case '50':
            filtros.precio = '50';
            break;
        default:
            break; // Si no esta entre las opciones indicadas no se incluye el filtro
    }

    if (typeof criterios.nombre !== 'undefined'){
        filtros.nombre = new RegExp('^' + criterios.nombre, "i");
    }

    var query = Anuncio.find(filtros); // uso .find sin callback para que me de un objeto query sin ejecutar

    query.sort(criterios.sort || '_id');
    query.skip(parseInt(criterios.start) || 0);
    query.limit(parseInt(criterios.limit) || 1000);

    query.exec( function(err, rows) { // Se ejecuta el query con todos los filtros y parametros que le hemos añadido
        if (err) {
            return cb(err);
        }

        return cb(null, rows);

    });
};


// exportar

var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
