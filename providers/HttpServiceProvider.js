'use strict';

var Http = require('lumenode-http');
var ServiceProvider = require('lumenode-foundation').ServiceProvider;

function HttpServiceProvider(app) {
  ServiceProvider.apply(this, arguments);

  this.app = app;
}
inherit(HttpServiceProvider, ServiceProvider);

HttpServiceProvider.prototype.register = function() {
  this.app.singleton('Http', Http);
};

module.exports = HttpServiceProvider;
