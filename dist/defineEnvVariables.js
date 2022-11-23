"use strict";
exports.__esModule = true;
var generatePass_1 = require("./generatePass");
var defineEnvVariables = function () {
    return {
        nodeEnv: 'production',
        cookieSecret: (0, generatePass_1["default"])(64),
        jwtSecret: (0, generatePass_1["default"])(64),
        adminJwtSecret: (0, generatePass_1["default"])(64),
        storageEncryptionKey: (0, generatePass_1["default"])(64),
        dbHost: 'db_server',
        dbPort: 3306,
        dbName: "wpdb_".concat((0, generatePass_1["default"])(10)),
        dbUser: "wpuser_".concat((0, generatePass_1["default"])(10)),
        mysqlRootPassword: (0, generatePass_1["default"])(64),
        dbUserPassword: (0, generatePass_1["default"])(64),
        redisServerName: 'redis_server',
        redisPort: 6379,
        redisPassword: (0, generatePass_1["default"])(64),
        redisDb: '0',
        redisQueueDb: '1',
        redisCacheDb: '2',
        redisAuthorizedDomains: 'authorized_domains',
        sandboxServerName: 'sandbox_server',
        sandboxPort: 6060,
        serverPort: 5000
    };
};
exports["default"] = defineEnvVariables;
