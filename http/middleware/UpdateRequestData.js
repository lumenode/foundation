'use strict';

function UpdateRequestData(app) {
  this.app = app;
}

UpdateRequestData.prototype.handle = function (req, res, next) {
  this.app.instance('Request', req);
  this.app.instance('Response', res);

  next();
};

module.exports = UpdateRequestData;
