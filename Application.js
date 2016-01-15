'use strict';

var _ = require('lodash');
var Router = require('./router/index');
var Container = require('lumenode-container');
var ProviderRepository = require('./ProviderRepository');
var EnvironmentDetector = require('lumenode-environment-detector');
var Filesystem = require('lumenode-filesystem');

function Application(basePath) {
  Container.apply(this, arguments);

  this.basePath = basePath;

  this.isBootstrapped = false;
  this.environmentFile = '.env';
  this.environmentPath = this.basePath;
  this.serviseProviders = [];

  this.registerCoreBindings();
  this.registerCoreServices();
  this.registerCoreAliases();
}
Application.prototype = Object.create(Container.prototype, {
  constructor: {
    value: Application,
    writable: false,
    enumerable: false,
    configurable: false
  }
});

Application.prototype.getBasePath = function() {
  return this.basePath;
};

Application.prototype.getConfigPath = function() {
  return this.getBasePath() + 'config/';
};

Application.prototype.startRouter = function() {
  this.router = this.make('Router');

  this.router.startServer();
};

Application.prototype.registerCoreBindings = function() {
  this.instance('app', this);
  this.instance('Application', this);
  this.instance('src/foundation/Container', this);
};

Application.prototype.registerCoreServices = function() {
  this.singleton('Router', Router);
  this.instance('Filesystem', new Filesystem);
};

Application.prototype.registerCoreAliases = function() {
  // body...
};

Application.prototype.bootstrapWith = function(bootstrappers) {
  this.isBootstrapped = true;

  bootstrappers.forEach(function(bootstrapper) {
    this.make(bootstrapper).boot(this);
  }.bind(this));
};

Application.prototype.detectEnvironment = function(cb) {
  var filesystem = this.make('Filesystem');
  var detector = new EnvironmentDetector(filesystem, this.environmentPath, this.environmentFile);

  return this.env = detector.detect(cb);
};

Application.prototype.registerConfiguredProviders = function() {
  var repository = new ProviderRepository(this);

  repository.load(config('app.providers'));
};

Application.prototype.register = function(provider) {
  provider.register();

  this.markAsRegistered(provider);

  return provider;
};

Application.prototype.markAsRegistered = function(provider) {
  this.serviseProviders.push(provider);
};

Application.prototype.boot = function() {
  this.serviseProviders.forEach(function(provider) {
    this.bootProvider(provider);
  }.bind(this));
};

Application.prototype.bootProvider = function(provider) {
  if (provider.boot !== undefined) {
    return this.call(provider.boot);
  }
};

Application.prototype.isDownForMaintenance = function() {
  return config('app.underMaintenance');
};

module.exports = Application;
