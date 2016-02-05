'use strict';

require('should');
let ProviderRepository = require('../ProviderRepository');
let sinon = require('sinon');

describe('Provider Repository Spec', function () {
  
  it('is green', function () {
    let a = true;
    a.should.be.ok();
  });

  it('loads providers', function () {
    let app = {
      providers: [],
      register(provider) {
        this.providers.push(provider);
      }
    };
    let repository = new ProviderRepository(app);
    let providers = [
      './tests/test-providers/FirstProvider',
      './tests/test-providers/SecondProvider'
    ];

    app.providers.should.be.lengthOf(0);
    repository.load(providers);
    app.providers.should.be.lengthOf(2);
  });

});