'use strict';

class CheckForMaintenanceMode {

  constructor(app) {
    this.app = app;
  }

  handle(req, res, next) {
    if (this.app.isDownForMaintenance()) {
      return exception('HttpErrorException', 503, 'Application is under maintenance :(');
    }

    return next();
  }

}

module.exports = CheckForMaintenanceMode;
