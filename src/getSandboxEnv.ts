const getSandboxEnv = (config) => {
    const envSandbox =

`# Sandbox server

# Node environment
NODE_ENV=${config.nodeEnv}

# Port
SANDBOX_PORT=${config.sandboxPort}

# Redis
REDIS_SERVER_NAME=${config.redisServerName}
REDIS_PORT=${config.redisPort}
REDIS_PASSWORD=${config.redisPassword}
REDIS_DB=${config.redisDb}
REDIS_QUEUE_DB=${config.redisQueueDb}
REDIS_CACHE_DB=${config.redisCacheDb}
`

    return envSandbox
}

export default getSandboxEnv