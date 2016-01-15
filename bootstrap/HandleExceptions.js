'use strict';

function HandleExceptions() {
  // body...
}

HandleExceptions.prototype.boot = function (app) {
  this.app = app;

  process.on('uncaughtException', function (error) {
    this.handleException(error);
  }.bind(this));
};

HandleExceptions.prototype.handleException = function(error) {
  if ( ! error instanceof Error) {
    error = new Error(error);
  }

  this.getExceptionHandler().report(error);
  this.getExceptionHandler().render(error);
};

HandleExceptions.prototype.getExceptionHandler = function() {
  return this.app.make('app/exceptions/ExceptionHandler');
};

module.exports = HandleExceptions;
