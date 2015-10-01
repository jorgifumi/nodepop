'use strict';

var db = require('./models/db');
var mongoose = require('mongoose');
require('./models/Anuncio');
require('./models/Usuario');
var readLine = require('readline');
var async = require('async');
var fs = require('fs');
var path = require('path');

const ruta = path.join('./', 'anuncios.json');

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
                anuncio.save(function (err, anuncioLeido) {
                    if (err) throw err;
                    console.log('Anuncio ' + anuncioLeido.nombre + ' creado');
                });
            }
            return cb();
        });
    });
}

function initUsuarios(cb) {
    var Usuario = mongoose.model('Usuario');

    // elimino todos
    Usuario.remove({}, function() {
        console.log('BD Usuarios borrada');
        // aqui cargaríamos al menos un usuario (Usuario.save)
        var usuario = new Usuario({nombre: 'Thomas', email: 'tanderson@thematrix.com', clave: 'steak'});

        usuario.save(function (err, usuarioCreado) {
            if (err) throw err;
            console.log('Usuario ' + usuarioCreado.nombre + ' creado');
            return cb();
        });
    });
}