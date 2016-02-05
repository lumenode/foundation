'use strict';

// TODO: implement Logger from published content
class ExceptionHandler {

  constructor(Application) {
    this.app = Application;
    this.logger = console;

    this.dontReport = [];
  }

  report(error) {
    this.logger.error('logging error', error || 'Unknown error');
    this.logger.error('stack', error.stack);
  }

  render(error) {
    var message = error ? error.message : 'Unknown error';

    this.app.make('Response').end(message);
  }

}

module.exports = ExceptionHandler;
