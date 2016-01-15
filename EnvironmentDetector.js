'use strict';

var fs = require('fs');
var _ = require('lodash');

function EnvironmentDetector(envPath, envFile) {
  this.envPath = envPath;
  this.envFile = envFile;
}

EnvironmentDetector.prototype.detect = function (cb) {
  if (typeof this.envFile !== 'string') {
    this.envFile = '.env';
  };

  var envData = fs.readFileSync(this.envPath + this.envFile, 'utf8');
  var envJson = JSON.parse(envData);

  _.each(envJson.data, function (value, key) {
    process.env[key] = value;
  });

  cb();
};

module.exports = EnvironmentDetector;
