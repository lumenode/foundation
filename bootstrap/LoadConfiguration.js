'use strict';

function LoadConfiguration(Filesystem) {
  this.filesystem = Filesystem;
}

LoadConfiguration.prototype.boot = function (app) {
  var configRepository = require('lumenode-config');

  app.instance('Config', configRepository);

  this.load(app, configRepository);
};

LoadConfiguration.prototype.load = function (app, configRepository) {
  var configs = this.filesystem.getFiles(app.getConfigPath());

  configs.forEach(function (configPath) {
    var relativePath = configPath.replace(app.getConfigPath(), '');
    var pathList = relativePath.split('/');

    // If we don't have enough items or more then 2
    // [ 'app.js' ]             -> good
    // [ 'testing', 'app.js' ]  -> good
    // []                       -> bad
    // [ '1', '2', '3' ]        -> bad
    if ( ! pathList.length || pathList.length > 2) return;

    // pathList[0] -> is an environment title
    if (pathList.length == 2 && pathList[0] !== env('APP_ENV')) return;

    var configData = require(configPath)();

    configRepository.load(configData);
  });
};

module.exports = LoadConfiguration;
