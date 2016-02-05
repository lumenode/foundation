'use strict';

class RegisterProviders {

  boot(app) {
    app.registerConfiguredProviders();
  }

}

module.exports = RegisterProviders;
