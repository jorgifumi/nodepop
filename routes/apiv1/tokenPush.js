/**
 * Created by jorgifumi on 4/10/15.
 */
'use strict';


let express = require('express');
let router = express.Router();

let errorStd = require('../../lib/errorStd');

let mongoose = require('mongoose');
let Token = mongoose.model('Token');

router.post('/', function(req , res){
    var newToken = { plataforma: req.body.plataforma, token: req.body.token, usuario: req.body.usuario};

    Token.new(newToken, function (err) {

        if (err) {
            errorStd({code:401, message: 'UNKNOWN'}, req.query.lang, res);
            return;
        }
        return res.json({ok: true, tokenPush: newToken.token});
    });
});

module.exports = router;