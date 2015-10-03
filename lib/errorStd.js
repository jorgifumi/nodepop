/**
 * Created by jorgifumi on 2/10/15.
 */
"use strict";

var traduce = require('./traduce');

module.exports = function(error, lang, res) {

    traduce(error.message, lang, function(err, msg) {
        return res.json({ ok: false, error: {code: error.code, message: msg}});
    });

};
