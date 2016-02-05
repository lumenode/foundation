'use strict';

require('should');
let ServiceProvider = require('../ServiceProvider');

describe('Service Provider Spec', () => {
  
  it('is green', () => {
    let a = true;
    a.should.be.ok();
  });

  it('throws error if `register` method is not implemented', () => {
    (() => {
      let provider = new ServiceProvider;
      provider.register();
    }).should.throw('You have to override ServiceProvider::register()');
  });

});