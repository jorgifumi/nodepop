/**
 * Created by jorgifumi on 27/9/15.
 */
"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

var errorStd = require('../../lib/errorStd');

// Auth con JWT
var jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth());

/* GET lista de anuncios con filtros. */

router.get('/', function(req, res) {
    Anuncio.list(req.query, function(err, results) {
        if (err) {
            //res.json({ok: false, error: err});
            console.log(err);
            errorStd({code:401, message: err.message || 'UNKNOWN'}, req.query.lang, res);
        }
        //console.log(rows);
        res.json({ok: true, anuncios: results});
    });
});

module.exports = router;