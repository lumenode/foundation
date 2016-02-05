'use strict';

class Exception extends Error {

  constructor(code, message) {
    super();

    this.name = this.name || '<unnamed> Exception';
    this.code = code || 500;
    this.message = message || '';
    this.stack = (new Error()).stack;
  }

  is(name) {
    return this.name === name;
  }

}

module.exports = Exception;
