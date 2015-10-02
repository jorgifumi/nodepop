'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

var jwt = require('jsonwebtoken');
var config = require('../../local_config');

var createHash = require('sha.js');
var sha256 = createHash('sha256');

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
            return res.json({ ok: false, error: {code: 401, message: 'Authentication failed. User not found.' }});
        }
        else if (user) {
            // check if password matches
            var claveHash = sha256.update(req.body.contraseña, 'utf8').digest('hex');
            if (user.clave != claveHash) {
                res.json({ ok: false, error: {code: 401, message: 'Authentication failed. Wrong password.'}});
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

module.exports = router;