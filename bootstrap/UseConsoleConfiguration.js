'use strict';

let _ = require('lodash');

class UseConsoleConfiguration {

  constructor(Config) {
    this.config = Config;
  }

  boot(app) {
    var argv = require('minimist')(process.argv.slice(2));

    this.config.load(argv.config);
  }

}

module.exports = UseConsoleConfiguration;
