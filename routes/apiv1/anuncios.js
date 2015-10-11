/**
 * Created by jorgifumi on 27/9/15.
 */
'use strict';

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Anuncio = mongoose.model('Anuncio');

let errorStd = require('../../lib/errorStd');


router.get('/tags', function(req, res) {

    res.json({tags: ['mobile','lifestyle','motor','work']}); // Para 4 tags y el tiempo que tenemos de momento lo dejamos así
});

// Auth con JWT
var jwtAuth = require('../../lib/jwtAuth');
router.use(jwtAuth());

/* GET lista de anuncios con filtros. */

router.get('/lista', function(req, res) {
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