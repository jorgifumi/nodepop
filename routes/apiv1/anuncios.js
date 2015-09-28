/**
 * Created by jorgifumi on 27/9/15.
 */
"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

/* GET home page. */
router.get('/', function(req, res, next) {
    Anuncio.list({}, function(err, rows){
            //console.log(rows);
            res.render('anuncios', { filas: rows});
        }

    );
});

module.exports = router;