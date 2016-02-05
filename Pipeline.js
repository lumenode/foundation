'use strict';

var _ = require('lodash');

class Pipeline {

  constructor() {
    this.passable = null;
    this.pipes = [];
  }

  /**
   * Set object to be sended through pipeline
   *
   * @param  {*}      passable Object to be sended
   * @return {Object}          Self
   */
  send(passable) {
    this.passable = passable;

    return this;
  }

  /**
   * Set list of middlewares/pipes to try for
   *
   * @param  {Array} pipes List of middlewares/pipes
   * @return {*}           Self
   */
  through(pipes) {
    this.pipes = pipes;

    return this;
  }

  /**
   * Set context of every pipe execution
   *
   * @param {*} context Context to be binded
   */
  withContext(context) {
    this.context = context;

    return this;
  }

  /**
   * Execute pipelines with expected callback
   *
   * @param  {Function} destination Callback function
   * @return {*}
   */
  then(destination) {
    var firstSlice = this.getInitialSlice(destination);

    // Here we need to reverse array in order to execute
    // pipes in correct order
    this.pipes.reverse();

    return _.reduce(
      this.pipes,
      this.getSlice(),
      firstSlice
    ).call(this, this.passable);
  }

  /**
   * Convert callback (simple closure) to the pipe
   *
   * @param  {Function} destination Closure to be converted to the pipe
   * @return {Function}             Pipe that contains callback closure
   */
  getInitialSlice(destination) {
    return passable => {
      return destination.call(this.context, passable);
    };
  }

  /**
   * todo comments
   */
  getSlice() {
    return (stack, pipe) => {
      return passable => {
        return pipe.call(this.context, passable, stack);
      }
    }
  }

}

module.exports = Pipeline;
