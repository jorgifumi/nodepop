/**
 * Created by jorgifumi on 4/10/15.
 */
'use strict';


var express = require('express');
var router = express.Router();

var errorStd = require('../../lib/errorStd');

var mongoose = require('mongoose');
var Token = mongoose.model('Token');

router.post('/', function(req , res){
    var newToken = { plataforma: req.body.plataforma, token: req.body.token, usuario: req.body.usuario};

    Token.new(newToken, function (err) {

        if (err) {
            errorStd({code:401, message: 'UNKNOWN'}, req.query.lang, res);
            return;
        }
        return res.json({ok: true, usuario: newToken.token});
    });
});

module.exports = router;