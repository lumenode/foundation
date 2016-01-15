'use strict';

function CheckForMaintenanceMode (app) {
  this.app = app;
}

CheckForMaintenanceMode.prototype.handle = function(req, res, next) {
  if (this.app.isDownForMaintenance()) {
    return exception('HttpErrorException', 503, 'Application is under maintenance :(');
  }

  return next();
};

module.exports = CheckForMaintenanceMode;