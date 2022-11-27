import generatePass from "./generatePass";

const defineEnvVariables = () => {
  return {
    nodeEnv: "production",

    // Versions
    sitesVersion: "vultr",
    sandboxVersion: "vultr",
    nginxVersion: "vultr",

    cookieSecret: generatePass(64),
    jwtSecret: generatePass(64),
    adminJwtSecret: generatePass(64),
    storageEncryptionKey: generatePass(64),

    dbHost: "db_server",
    dbPort: 3306,
    dbName: `wpdb_${generatePass(10)}`,
    dbUser: `wpuser_${generatePass(10)}`,
    mysqlRootPassword: generatePass(64),
    dbUserPassword: generatePass(64),

    redisServerName: "redis_server",
    redisPort: 6379,
    redisPassword: generatePass(64),
    redisDb: "0",
    redisQueueDb: "1",
    redisCacheDb: "2",
    redisAuthorizedDomains: "authorized_domains",

    sandboxServerName: "sandbox_server",
    sandboxPort: 6060,

    serverPort: 5000,
  };
};

export default defineEnvVariables;
