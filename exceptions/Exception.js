'use strict';

function Exception(code, message) {
  this.name = this.name || '<unnamed> Exception';
  this.code = code || 500;
  this.message = message || '';
  this.stack = (new Error()).stack;
}
Exception.prototype = new Error;

Exception.prototype.is = function(name) {
  return this.name === name;
};

module.exports = Exception;
