/**
 * Created by jorgifumi on 2/10/15.
 */
'use strict';

var traduce = require('./traduce');

module.exports = function(error, lang, res) {

    traduce(error.message, lang, function(err, msg) {
        if(err){
            return res.json({ ok: false, error: {code: 500, message: 'TRADUCTION ERROR'}});
        }
        return res.json({ ok: false, error: {code: error.code, message: msg}});
    });

};
