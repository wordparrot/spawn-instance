"use strict";
exports.__esModule = true;
var getEnv = function (config) {
    var env = "# Sites server\n\n# Node environment\nNODE_ENV=".concat(config.nodeEnv, "\n    \n# Cryptography\nCOOKIE_SECRET=").concat(config.cookieSecret, "\nJWT_SECRET=").concat(config.jwtSecret, "\nADMIN_JWT_SECRET=").concat(config.adminJwtSecret, "\nSTORAGE_ENCRYPTION_KEY=").concat(config.storageEncryptionKey, "\n\n# Database\nDATABASE_NAME=").concat(config.dbName, "\nDATABASE_HOST=").concat(config.dbHost, "\n# Uncomment and fill in to override with external MySQL database\n# DATABASE_FULL_STRING=mysql://user:password@localhost/wordparrot_db\n\n# Redis\nREDIS_SERVER_NAME=").concat(config.redisServerName, "\nREDIS_PORT=").concat(config.redisPort, "\nREDIS_PASSWORD=").concat(config.redisPassword, "\nREDIS_DB=").concat(config.redisDb, "\nREDIS_QUEUE_DB=").concat(config.redisQueueDb, "\nREDIS_CACHE_DB=").concat(config.redisCacheDb, "\nREDIS_AUTHORIZED_DOMAINS=").concat(config.redisAuthorizedDomains, "\n\n# Sandbox server\nSANDBOX_SERVER=http://").concat(config.sandboxServerName, ":").concat(config.sandboxPort, "\nSANDBOX_PORT=").concat(config.sandboxPort, "\n\n# Server main port\nSERVER_PORT=").concat(config.serverPort, "\n\n# Add injected entries below\n\n");
    return env;
};
exports["default"] = getEnv;
