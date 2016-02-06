'use strict';

var ServiceProvider = require('lumenode-foundation').ServiceProvider;

class HttpServiceProvider extends ServiceProvider {

  constructor(app) {
    super(app);

    this.app = app;
  }

  register() {
    this.app.singleton('Http', require('lumenode-http'));
  }

}

module.exports = HttpServiceProvider;
