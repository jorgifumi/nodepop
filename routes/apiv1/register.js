/**
 * Created by jorgifumi on 2/10/15.
 */
'use strict';


var express = require('express');
var router = express.Router();

var errorStd = require('../../lib/errorStd');

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

router.post('/', function(req , res){
    var newUser = { nombre: req.body.nombre, email: req.body.email, clave: req.body.clave};

    Usuario.new(newUser, function (err) {

        if (err) {
            errorStd({code:401, message: 'UNKNOWN'}, req.query.lang, res);
            return;
        }
        return res.json({ok: true, usuario: newUser.nombre});
    });
});

module.exports = router;