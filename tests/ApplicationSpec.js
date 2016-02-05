'use strict';

require('should');
let sinon = require('sinon');
let Application = require('../Application');
let Container = require('lumenode-container');

describe('Application Spec', () => {
  
  it('is green', function () {
    let a = true;
    a.should.be.ok();
  });

  it('is instance of Container', function () {
    let app = new Application;

    app.should.be.instanceOf(Container);
  });

  it('is not bootstrapped', function () {
    let app = new Application;
    app.isBootstrapped.should.not.be.ok();
  });

  it('sets base application\'s path on init', function () {
    let app = new Application('/some/path');
    app.getBasePath().should.be.equal('/some/path');
  });

  it('sets config path based on app.basePath', function () {
    let app = new Application('/some/path');
    app.getConfigPath().should.be.equal('/some/path/config');
  });

  it('sets environment path based on app.basePath', function () {
    let app = new Application('/some/path');
    app.getEnvironmentPath().should.be.equal('/some/path/.env');
  });

  it('does not have any providers by default', function () {
    let app = new Application;
    app.serviseProviders.should.be.empty();
  });

  it('registers core bindings withing application', function () {
    let app = new Application;

    app.make('app').should.be.equal(app);
    app.make('Application').should.be.equal(app);
    app.make('src/foundation/Container').should.be.equal(app);
  });

  it('registers core services within application', function () {
    let app = new Application;

    app.make('Router').should.be.ok();
    app.make('Filesystem').should.be.ok();
  });

  it('start router', function (done) {
    let app = new Application;

    app.instance('Router', {
      startServer: () => {
        done();
      }
    })
    
    app.startRouter();
  });

  it('can be bootstrapped with extra logic', function () {
    let app = new Application;
    let counter = 0;

    // Arrange
    app.instance('FirstBootstrapper', {
      boot: app => counter++
    });

    app.instance('SecondBootstrapper', {
      boot: app => counter++
    });

    // Act
    app.bootstrapWith(['FirstBootstrapper', 'SecondBootstrapper']);

    // Assert
    counter.should.be.equal(2);
    app.isBootstrapped.should.be.ok();
  });

  it('detects environment', function (done) {
    let app = new Application('/base-path/');
    let envMock = {
      data: {foo: 'bar'}
    };

    app.instance('Filesystem', {
      get: path => JSON.stringify(envMock)
    });

    app.detectEnvironment(() => {
      process.env.foo.should.be.equal('bar');
      done();
    });
  });

  it('registers external providers within system', function (done) {
    let app = new Application;
    let providers = ['FirstProvider', 'SecondProvider']

    app.instance('ProviderRepository', {
      load: () => done()
    });

    app.registerConfiguredProviders(providers);
  });

  it('register single provider', function () {
    let app = new Application;
    let provider = {
      register: () => {}
    }
    let providerMock = sinon.mock(provider);
    providerMock.expects("register").once();

    app.serviseProviders.should.be.empty();
    app.register(provider);
    app.serviseProviders.should.not.be.empty();

    providerMock.verify();
  });

  it('boot\'s application provider', function () {
    let app = new Application;

    let provider = {
      register: () => {},
      boot: () => {}
    };

    let providerMock = sinon.mock(provider);
    providerMock.expects('boot').once();

    app.register(provider);
    app.boot();

    providerMock.verify();
  });

});