'use strict';

exports.ExceptionHandler = require('./exceptions/ExceptionHandler');
exports.ServiceProvider = require('./ServiceProvider');
exports.Exception = require('./exceptions/Exception');
exports.Kernel = require('./http/Kernel');

let Application = require('./Application');
let Lumenode = null;

exports.getInstance = function (path) {
  if (Lumenode === null) {
    Lumenode = new Application(path);
  }

  return Lumenode;
};
