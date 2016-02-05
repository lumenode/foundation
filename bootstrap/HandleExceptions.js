'use strict';

class HandleExceptions {

  boot(app) {
    this.app = app;

    process.on('uncaughtException', error => {
      this.handleException(error);
    });
  }

  handleException(error) {
    if (!error instanceof Error) {
      error = new Error(error);
    }

    this.getExceptionHandler().report(error);
    this.getExceptionHandler().render(error);
  }

  getExceptionHandler() {
    return this.app.make('app/exceptions/ExceptionHandler');
  }

}

module.exports = HandleExceptions;
