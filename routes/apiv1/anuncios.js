/**
 * Created by jorgifumi on 27/9/15.
 */
"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

// Auth con JWT
var jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth());

/* GET lista de anuncios con filtros. */

router.get('/', function(req, res, next) {
    //console.log(req.query);
    Anuncio.list(req.query, function(err, results) {
        if (err) {
            res.json({ok: false, error: err});
        }
        //console.log(rows);
        res.json({ok: true, anuncios: results});
    });
});

module.exports = router;