'use strict';

class DetectEnvironment {

  boot(app) {
    app.detectEnvironment(() => {
      if (process.env.NODE_ENV === 'testing') {
        process.env.APP_ENV = 'testing';
      };

      return process.env.APP_ENV = 'production';
    });
  }

}

module.exports = DetectEnvironment;
