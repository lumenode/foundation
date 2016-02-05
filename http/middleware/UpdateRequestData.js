'use strict';

class UpdateRequestData {

  constructor(app) {
    this.app = app;
  }

  handle = function (req, res, next) {
    this.app.instance('Request', req);
    this.app.instance('Response', res);

    next();
  }

}

module.exports = UpdateRequestData;
