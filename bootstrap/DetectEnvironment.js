'use strict';

function DetectEnvironment() {
  // body...
}

DetectEnvironment.prototype.boot = function (app) {
  app.detectEnvironment(function () {
    if (process.env.NODE_ENV === 'testing') {
      process.env.APP_ENV = 'testing';
    };
    
    return process.env.APP_ENV = 'production';
  });
};

module.exports = DetectEnvironment;
