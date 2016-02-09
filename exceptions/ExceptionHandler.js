'use strict';

class ExceptionHandler {

  constructor(Application, Logger) {
    this.app = Application;
    this.logger = Logger;

    this.dontReport = [];
  }

  report(error) {
    var message = error || 'Unknown error';
    var result = `Error message: ${message}\nStack: ${error.stack}`;

    this.logger.log('error', result);
  }

  render(error) {
    var message = error ? error.message : 'Unknown error';

    try {
      this.app.make('Response').end(message);
    } catch (e) {
      log('error', 'Failed to render error. Original message is: ' + message);
    }
  }

}

module.exports = ExceptionHandler;
