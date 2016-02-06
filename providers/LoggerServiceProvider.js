'use strict';

var Logger = require('lumenode-logger');
var ServiceProvider = require('lumenode-foundation').ServiceProvider;

class LoggerServiceProvider extends ServiceProvider {

  constructor(app) {
    super(app);

    this.app = app;
  }

  register(Application) {
    var logger = Logger(this.app.getBasePath());

    this.app.instance('Logger', logger);
  }

}

module.exports = LoggerServiceProvider;
