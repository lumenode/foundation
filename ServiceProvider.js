'use strict';

class ServiceProvider {

  register() {
    throw new Error('You have to override ServiceProvider::register()');
  }

  boot() {}

}

module.exports = ServiceProvider;
