const getEnv = (config) => {
  const env = `# Sites server

# Node environment
NODE_ENV=${config.nodeEnv}
    
# Cryptography
COOKIE_SECRET=${config.cookieSecret}
JWT_SECRET=${config.jwtSecret}
ADMIN_JWT_SECRET=${config.adminJwtSecret}
STORAGE_ENCRYPTION_KEY=${config.storageEncryptionKey}

# Database
DATABASE_NAME=${config.dbName}
DATABASE_HOST=${config.dbHost}
# Uncomment and fill in to override with external MySQL database
# DATABASE_FULL_STRING=mysql://user:password@localhost/wordparrot_db

# Redis
REDIS_SERVER_NAME=${config.redisServerName}
REDIS_PORT=${config.redisPort}
REDIS_PASSWORD=${config.redisPassword}
REDIS_DB=${config.redisDb}
REDIS_QUEUE_DB=${config.redisQueueDb}
REDIS_CACHE_DB=${config.redisCacheDb}
REDIS_AUTHORIZED_DOMAINS=${config.redisAuthorizedDomains}

# Sandbox server
SANDBOX_SERVER=http://${config.sandboxServerName}
SANDBOX_PORT=${config.sandboxPort}

# Server main port
SERVER_PORT=${config.serverPort}

# Add injected entries below

`;

  return env;
};

export default getEnv;
