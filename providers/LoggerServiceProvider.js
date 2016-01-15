'use strict';

var Logger = require('lumenode-logger');
var ServiceProvider = require('lumenode-foundation').ServiceProvider;

function LoggerServiceProvider(app) {
  ServiceProvider.apply(this, arguments);

  this.app = app;
}
inherit(LoggerServiceProvider, ServiceProvider);

LoggerServiceProvider.prototype.register = function(Application) {
  var logger = Logger(this.app.getBasePath());

  this.app.instance('Logger', logger);
};

module.exports = LoggerServiceProvider;
