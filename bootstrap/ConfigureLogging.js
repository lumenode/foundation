'use strict';

let Logger = require('lumenode-logger');

class ConfigureLogging {

  constructor(Config) {
    this.config = Config;
  }

  boot(app) {
    var logger = Logger(this.config, app.getBasePath());

    app.instance('Logger', logger);
  }

}

module.exports = ConfigureLogging;
