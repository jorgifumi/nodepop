/**
 * Created by jorgifumi on 11/10/15.
 */
'use strict';
let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let Usuario = mongoose.model('Usuario');

let errorStd = require('../../lib/errorStd');

let jwt = require('jsonwebtoken');
let config = require('../../local_config');

let createHash = require('sha.js');
let sha256 = createHash('sha256');

/**
 * @function /authenticate
 * @implements POST
 * @property {string} email
 * @property {string} pass
 * @description Authenticates a user with JWT
 * @return {object} Object with {ok, error: {code, message}, token}
 */
router.post('/authenticate', function(req, res) {

    // find the user
    Usuario.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({ok: false, error: {code: 500, message: err.message} });
        }
        if (!user) {
            //return res.json({ ok: false, error: {code: 401, message: 'Authentication failed. User not found.' }});
            return errorStd({code: 401, message: 'USER_NOT_FOUND' }, req.body.lang, res);
        }
        else if (user) {
            // check if password matches
            var claveHash = sha256.update(req.body.contraseña, 'utf8').digest('hex');
            if (user.clave != claveHash) {
                return errorStd({code: 401, message: 'AUTH_FAIL' }, req.body.lang, res);
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, config.jwt.secret, {
                    expiresInMinutes: config.jwt.expiresInMinutes
                });
                // return the information including token as JSON
                res.json({
                    ok: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});


router.post('/register', function(req , res){
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