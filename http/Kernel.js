'use strict';

let _ = require('lodash');

class Kernel {

  constructor(Application, Router) {
    this.app = Application;
    this.router = Router;

    this.bootstrappers = [
      __dirname + '/../bootstrap/DetectEnvironment',
      __dirname + '/../bootstrap/LoadConfiguration',
      __dirname + '/../bootstrap/UseConsoleConfiguration',
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

  init() {
    this.bootstrap();

    // Setup route middlewares
    _.each(this.routeMiddlewares, (middleware, route) => {
      this.app.router.middleware(route, this.getMiddlewareHandler(middleware));
    });

    // Setup core middlewares
    _.each(this.middlewares, middleware => {
      this.app.router.middleware(this.getMiddlewareHandler(middleware));
    });

    this.bootstraped();
  }

  bootstraped() {
    // body...
  }

  getMiddlewareHandler(middlewarePath) {
    let middleware = this.app.make(middlewarePath);

    return middleware.handle.bind(this);
  }

  bootstrap() {
    if (!this.app.isBootstrapped) {
      this.app.bootstrapWith(this.bootstrappers);
    }
  }

}

module.exports = Kernel;
