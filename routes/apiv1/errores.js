/**
 * Created by jorgifumi on 28/9/15.
 */
"use strict";

var express = require('express');
var router = express.Router();

router.get(function (err, res, next) {
    console.log(err);
    res.json(err);
});

module.exports = router;