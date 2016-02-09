'use strict';

let Logger = require('lumenode-logger');

class ConfigureLogging {

  boot(app) {
    var logger = Logger(app.getBasePath());

    app.instance('Logger', logger);
  }

}

module.exports = ConfigureLogging;
