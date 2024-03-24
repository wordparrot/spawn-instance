"use strict";
exports.__esModule = true;
var getSandboxEnv = function (config) {
  var envSandbox = "# Sandbox server\n\n# Node environment\nNODE_ENV="
    .concat(config.nodeEnv, "\n\n# Port\nSANDBOX_PORT=")
    .concat(config.sandboxPort, "\n\n# Redis\nREDIS_SERVER_NAME=")
    .concat(config.redisServerName, "\nREDIS_PORT=")
    .concat(config.redisPort, "\nREDIS_PASSWORD=")
    .concat(config.redisPassword, "\nREDIS_DB=")
    .concat(config.redisDb, "\nREDIS_QUEUE_DB=")
    .concat(config.redisQueueDb, "\nREDIS_CACHE_DB=")
    .concat(config.redisCacheDb, "\n");
  return envSandbox;
};
exports["default"] = getSandboxEnv;
