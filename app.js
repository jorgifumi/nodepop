'use strict';

var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// init db
require('./models/db');
require('./models/Anuncio');
require('./models/Usuario');
require('./models/Token');


var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Autenticacion

app.use('/usuarios', require('./routes/usuarios/authenticate'));

// API Versión 1

app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/register', require('./routes/apiv1/register'));
app.use('/apiv1/tokenPush', require('./routes/apiv1/tokenPush'));
app.use('/apiv1/tags', require('./routes/apiv1/tags'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.json({error: {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json({error: {
    message: err.message,
    error: {}
  }});
});


module.exports = app;
