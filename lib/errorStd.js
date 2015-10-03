/**
 * Created by jorgifumi on 2/10/15.
 */
"use strict";

var traduce = require('./traduce');

module.exports = function(err, res) {
    console.log('ERR',err);
    return res.json(err);
    //return traduce(err.message, 'es');
};

