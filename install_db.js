'use strict';

var db = require('./models/db');
var mongoose = require('mongoose');
require('./models/Anuncio');
require('./models/Usuario');
var readLine = require('readline');
var async = require('async');
var fs = require('fs');
var path = require('path');

const ruta = path.join('./', 'initDB.json');

db.once('open', function() {

    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Are you sure you want to empty DB? (no) ', function(answer) {
        rl.close();
        if (answer.toLowerCase() === 'yes') {
            runInstallScript();
        } else {
            console.log('DB install aborted!');
            return process.exit(0);
        }
    });

});

function runInstallScript() {

    async.series([
        initAnuncios,
        initUsuarios
        ], function (err, results) {
        if (err) {
        console.error('Hubo un error: ', err);
        return process.exit(1);
    }
    return process.exit(0);
    });
}

function initAnuncios(cb) {
    var Anuncio = mongoose.model('Anuncio');

    // elimino todos
    Anuncio.deleteAll( function(){
        fs.readFile(ruta, function(err, data) {
            if(err){
                console.log('Error al abrir archivo JSON');
                return cb(err);
            }
            var arr = JSON.parse(data).anuncios;

            for(var i = 0; i < arr.length; i++){
                var anuncio = new Anuncio(arr[i]);
                anuncio.save(function (err, creado) {
                    if (err) throw err;
                    console.log('Anuncio ' + creado.nombre + ' creado');
                });
            }
            return cb(null);
        });
    });
}

function initUsuarios(cb) {
    var Usuario = mongoose.model('Usuario');

    // elimino todos
    Usuario.deleteAll( function() {
        fs.readFile(ruta, function(err, data) {
            if(err){
                console.log('Error al abrir archivo JSON');
                return cb(err);
            }
            var arr = JSON.parse(data).usuarios;

            for(var i = 0; i < arr.length; i++) {
                // Cargar usuarios
                Usuario.new(arr[i], function (err) {
                    if (err) return cb(err);
                    return cb(null);
                });
            }
        });
    });
}