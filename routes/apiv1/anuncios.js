/**
 * Created by jorgifumi on 27/9/15.
 */
"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    res.render('index', { title: 'anuncios' });
});

module.exports = router;