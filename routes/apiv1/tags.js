/**
 * Created by jorgifumi on 4/10/15.
 */
"use strict";

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Anuncio = mongoose.model('Anuncio');

//var errorStd = require('../../lib/errorStd');

/* GET lista de tags */

router.get('/', function(req, res) {
    res.json({tags: ['mobile','lifestyle','motor','work']});
});

module.exports = router;