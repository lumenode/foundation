'use strict';

function RegisterProviders () {
  // body...
}

RegisterProviders.prototype.boot = function(app) {
  app.registerConfiguredProviders();
};

module.exports = RegisterProviders;