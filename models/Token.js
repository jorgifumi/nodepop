/**
 * Created by jorgifumi on 4/10/15.
 */
'use strict';

var mongoose = require('mongoose');

var pushTokenSchema = mongoose.Schema({
    plataforma: {type: String, enum: ['ios', 'android']},
    token: String,
    usuario: String
});

pushTokenSchema.statics.new = function(datos, cb) {

    var token = new Token(datos);

    token.save(function (err) {
        if (err){
            return cb(err);
        }
        console.log('Token ' + token.token + ' creado');
        return cb(null);
    });
};

var Token = mongoose.model('Token', pushTokenSchema);

module.exports = Token;