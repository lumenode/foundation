'use strict';

class ProviderRepository {

  constructor(app) {
    this.app = app;
  }

  load(providers) {
    providers.forEach(provider => {
      this.app.register(this.createProvider(provider));
    });
  }

  createProvider(provider) {
    let providerInstance = require(provider);

    return new providerInstance(this.app);
  }

}

module.exports = ProviderRepository;
