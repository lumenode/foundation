'use strict';

var Kernel = require('./http/Kernel');
var Application = require('./Application');
var ServiceProvider = require('./ServiceProvider');

var Exception = require('./exceptions/Exception');
var ExceptionHandler = require('./exceptions/ExceptionHandler');

exports.Kernel = Kernel;
exports.ExceptionHandler = ExceptionHandler;
exports.ServiceProvider = ServiceProvider;
exports.Exception = Exception;

var Lumenode = null;

exports.getInstance = function (path) {
  if (Lumenode === null) {
    Lumenode = new Application(path);
  }

  return Lumenode;
};
