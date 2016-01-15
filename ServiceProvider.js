'use strict';

function ServiceProvider () {
  // body...
}

ServiceProvider.prototype.register = function() {
  throw new Error('You have to override ServiceProvider::register()')
};

ServiceProvider.prototype.boot = function() {
  // body...
};

module.exports = ServiceProvider;
