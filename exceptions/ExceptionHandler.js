'use strict';

// TODO: implement Logger from published content
function ExceptionHandler (Application) {
  this.app = Application;
  this.logger = console;

  this.dontReport = [];
}

ExceptionHandler.prototype.report = function(error) {
  this.logger.error('logging error', error || 'Unknown error');
  this.logger.error('stack', error.stack);
};

ExceptionHandler.prototype.render = function(error) {
  var message = error ? error.message : 'Unknown error';
  
  this.app.make('Response').end(message);
};

module.exports = ExceptionHandler;