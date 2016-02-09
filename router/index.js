'use strict';

var express = require('express');
var escapeHtml = require('escape-html');
var bodyParser = require('body-parser');

function Router(Application) {
  this.app = Application;
}

Router.prototype.startServer = function () {
  this.express = express();

  this.app.instance('Request', this.express.request);
  this.app.instance('Response', this.express.response);

  // Start listening
  this.listen();
};

Router.prototype.listen = function () {
  this.express.listen.call(
    this.getErrorHandler(this.app).bind(this.express),
    config('app.port'),
    function() {
      log('info', 'Listening on port ' + config('app.port'));
    }
  );

  // Setup public files
  this.express.use('', express.static(this.app.getBasePath() + 'public'));
  this.express.use(express.static('files'));

  // Setup body parser
  this.express.use(bodyParser.json());
  this.express.use(bodyParser.urlencoded({
    extended: true
  }));
};

Router.prototype.getErrorHandler = function (app) {
  return function (req, res) {
    this.handle(req, res, function (err) {

      app.instance('Request', req);
      app.instance('Response', res);

      var status = res.statusCode;

      // ignore 404 on in-flight response
      if (!err && res._header) {
        console.log('cannot 404 after headers sent');
        return;
      }

      // unhandled error
      if (err) {
        // respect err.statusCode
        if (err.statusCode) {
          status = err.statusCode;
        }

        // respect err.status
        if (err.status) {
          status = err.status;
        }

        // default status code to 500
        if (!status || status < 400) {
          status = 500;
        }

        // production gets a basic error message
        var msg = err.message || err.toString();
      } else {
        status = 404;
        msg = 'Cannot ' + escapeHtml(req.method) + ' ' + escapeHtml(req.originalUrl || req.url) + '\n';
      }

      // cannot actually respond
      if (res._header) {
        return req.socket.destroy();
      }

      // Emulate exception
      var exepctionHandler = app.make('app/exceptions/ExceptionHandler');
      var exeptionError = new Error(`Message: ${msg}. Code: ${status}`);
      exepctionHandler.report(exeptionError);
      exepctionHandler.render(exeptionError);

      return;
    }.bind(this));
  };
};

Router.prototype.getExpress = function () {
  return this.express;
};

Router.prototype.route = function (route) {
  return this.express.route(route);
};

Router.prototype.middleware = function () {
  return this.express.use.apply(this.express, arguments);
};

Router.prototype.resolvable = function (middleware) {
  return (typeof middleware).match(/string|function/i);
};

// Register method proxies
['get', 'post', 'put', 'patch', 'delete'].forEach(function (method) {
  Router.prototype[method] = function (route, middleware) {
    // If 'middleware' is string or function then we can Container.call()
    if (this.resolvable(middleware)) {
      var middlewareHandler = middleware;

      middleware = function (req, res) {
        this.app.call(middlewareHandler);
      }.bind(this);
    }

    return this.express[method](route, middleware);
  };
});

module.exports = Router;
