"use strict";
exports.__esModule = true;
var getEnv = function (config) {
  var env =
    "# App-Web: Environment Configuration File\n\n# Node environment\nNODE_ENV="
      .concat(config.nodeEnv, "\n    \n# Cryptography\nCOOKIE_SECRET=")
      .concat(config.cookieSecret, "\nJWT_SECRET=")
      .concat(config.jwtSecret, "\nADMIN_JWT_SECRET=")
      .concat(config.adminJwtSecret, "\nSTORAGE_ENCRYPTION_KEY=")
      .concat(
        config.storageEncryptionKey,
        "\n\n# Authorized Domain\nAUTHORIZED_DOMAIN="
      )
      .concat(
        process.env.WORDPARROT_AUTHORIZED_DOMAIN,
        "\n\n# Database\nDATABASE_HOST="
      )
      .concat(config.dbHost, "\nMYSQL_ROOT_PASSWORD=")
      .concat(config.dbRootPassword, "\nDATABASE_NAME=")
      .concat(config.dbName, "\nDATABASE_USER=")
      .concat(config.dbUser, "\nDATABASE_PASSWORD=")
      .concat(
        config.dbUserPassword,
        "\n# Uncomment and fill in to override with external MySQL database or MariaDB database\n# DATABASE_FULL_STRING=mysql://user:password@localhost/wordparrot_db\n\n# Redis\nREDIS_SERVER_NAME="
      )
      .concat(config.redisServerName, "\nREDIS_PORT=")
      .concat(config.redisPort, "\nREDIS_PASSWORD=")
      .concat(config.redisPassword, "\nREDIS_DB=")
      .concat(config.redisDb, "\nREDIS_QUEUE_DB=")
      .concat(config.redisQueueDb, "\nREDIS_CACHE_DB=")
      .concat(config.redisCacheDb, "\nREDIS_AUTHORIZED_DOMAINS=")
      .concat(
        config.redisAuthorizedDomains,
        "\n\n# Sandbox server\nSANDBOX_SERVER=http://"
      )
      .concat(config.sandboxServerName, "\nSANDBOX_PORT=")
      .concat(config.sandboxPort, "\n\n# Server main port\nSERVER_PORT=")
      .concat(config.serverPort, "\n\n# Add injected entries below\n\n");
  return env;
};
exports["default"] = getEnv;
