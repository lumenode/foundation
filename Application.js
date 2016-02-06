'use strict';

let _ = require('lodash');
let Router = require('./router/index');
let Container = require('lumenode-container');
let ProviderRepository = require('./ProviderRepository');
let EnvironmentDetector = require('lumenode-environment-detector');
let Filesystem = require('lumenode-filesystem');

class Application extends Container {

  constructor(basePath) {
    super();

    this.basePath = `${basePath}/`;

    this.isBootstrapped = false;
    this.environmentFile = '.env';
    this.environmentPath = this.basePath;
    this.serviseProviders = [];

    this.registerCoreBindings();
    this.registerCoreServices();
    this.registerCoreAliases();
  }

  /**
   * Get base application's path.
   *
   * @return {String} App's path
   */
  getBasePath() {
    return this.basePath;
  }

  /**
   * Get app's configuration folder path.
   *
   * @return {String} Config directory path
   */
  getConfigPath() {
    return this.getBasePath() + 'config/';
  }

  /**
   * Get environment config file path.
   *
   * @return {String} Env file path
   */
  getEnvironmentPath() {
    return this.environmentPath + this.environmentFile;
  }

  /**
   * Register core bindings within application.
   * These bindings will be resolved before app boot process.
   *
   * @return {void}
   */
  registerCoreBindings() {
    this.instance('app', this);
    this.instance('Application', this);
    this.instance('src/foundation/Container', this);
  }

  /**
   * Register core services within application.
   * These services will be resolved before app boot process.
   *
   * @return {void}
   */
  registerCoreServices() {
    this.singleton('Router', Router);

    this.instance('Filesystem', new Filesystem);
    this.instance('ProviderRepository', new ProviderRepository(this));
  }

  /**
   * Register core aliases within application.
   * These aliases will be resolved before app boot process.
   *
   * @return {void}
   */
  registerCoreAliases() {}

  /**
   * Starts router (express engine).
   * Start port listening.
   *
   * @return {void}
   */
  startRouter() {
    this.router = this.make('Router');

    this.router.startServer();
  }

  /**
   * Give user ability to apply extra logic within boot phase.
   *
   * @param  {Array} bootstrappers List of bootstrappers (strings)
   * @return {void}
   */
  bootstrapWith(bootstrappers) {
    this.isBootstrapped = true;

    bootstrappers.forEach(bootstrapper => {
      this.make(bootstrapper).boot(this);
    });
  }

  /**
   * Detects environment.
   *
   * @param  {Function} cb Callback
   * @return {void}
   */
  detectEnvironment(cb) {
    let filesystem = this.make('Filesystem');
    let detector = new EnvironmentDetector(
      filesystem, 
      this.environmentPath, 
      this.environmentFile
    );

    detector.detect(cb);
  }

  /**
   * Register providers from the config.
   *
   * @return {void}
   */
  registerConfiguredProviders(providers) {
    let repository = this.make('ProviderRepository');

    repository.load(providers || config('app.providers') || []);
  }

  /**
   * Register single provider within application.
   *
   * @param  {Object} provider Provider class
   * @return {Object}          Provider
   */
  register(provider) {
    provider.register();

    this.markAsRegistered(provider);

    return provider;
  }

  /**
   * Mark provider as registered within system.
   *
   * @param  {Object} provider Provider class
   * @return {void}
   */
  markAsRegistered(provider) {
    this.serviseProviders.push(provider);
  }

  /**
   * Here application is booting.
   * Main program flow in starts here.
   *
   * Flow: bootstrappers -> boot providers
   *
   * @return {void}
   */
  boot() {
    this.serviseProviders.forEach(provider => {
      this.bootProvider(provider);
    });
  }

  /**
   * Boot single service provider.
   *
   * @param  {Object} provider Provider class
   * @return {void|Object}
   */
  bootProvider(provider) {
    if (provider.boot !== undefined) {
      return this.call(provider.boot);
    }
  }

  /**
   * Check application is under maintenance.
   *
   * @return {Boolean}
   */
  isDownForMaintenance() {
    return config('app.underMaintenance');
  }

}

module.exports = Application;
