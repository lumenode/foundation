'use strict';

var _ = require('lodash');

function Kernel (Application, Router) {
  this.app = Application;
  this.router = Router;

  this.bootstrappers = [
    __dirname + '/../bootstrap/DetectEnvironment',
    __dirname + '/../bootstrap/LoadConfiguration',
    __dirname + '/../bootstrap/ConfigureLogging',
    __dirname + '/../bootstrap/HandleExceptions',
    __dirname + '/../bootstrap/StartRouter',
    __dirname + '/../bootstrap/RegisterProviders',
    __dirname + '/../bootstrap/BootProviders'
  ];
  this.middlewares = [
    __dirname + '/middleware/UpdateRequestData',
    __dirname + '/middleware/CheckForMaintenanceMode'
  ];

  this.routeMiddlewares = _.merge(this.routeMiddlewares, {});
}

Kernel.prototype.init = function() {
  this.bootstrap();

  // Setup route middlewares
  _.each(this.routeMiddlewares, function(middleware, route) {
    this.app.router.middleware(route, this.getMiddlewareHandler(middleware));
  }.bind(this));

  // Setup core middlewares
  _.each(this.middlewares, function(middleware) {
    this.app.router.middleware(this.getMiddlewareHandler(middleware));
  }.bind(this));

  this.bootstraped();
};

Kernel.prototype.bootstraped = function() {
  // body...
};

Kernel.prototype.getMiddlewareHandler = function(middlewarePath) {
  var middleware = this.app.make(middlewarePath);

  return middleware.handle.bind(this);
};

Kernel.prototype.bootstrap = function() {
  if ( ! this.app.isBootstrapped) {
    this.app.bootstrapWith(this.bootstrappers);
  };
};

module.exports = Kernel;