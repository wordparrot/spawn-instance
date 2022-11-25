/*
{
    cookieSecret: string
    jwtSecret: string
    adminJwtSecret: string
    storageEncryptionKey: string
    dbName: string
    dbPassword: string
    mysqlRootPassword: string
    databaseUser: string
    redisPassword: string
    sandboxPort: number
    serverPort: number
    redisPort: number
    redisServerName: string
    dbPort: number
}
*/
const getDockerCompose = (config) => {
    const dockerCompose = 

`# docker-compose.yml
version: "3.8"

networks: 
    internal-network:
        driver: bridge
        name: wprt_public

services:
    nginx:
        image: alecejones/wordparrot-nginx
        restart: always
        volumes:
            - resty_conf:/etc/nginx/nginx.conf
            - resty_certificates:/etc/resty-auto-ssl:rw
            - sites_static:/var/www/wordparrot/sites/out:ro
            - setup_static:/var/www/wordparrot/sites/setup:ro
            - server_bull:/var/www/wordparrot/server/bull:ro
            - server_content:/var/www/wordparrot/server/content:ro
            - server_plugins:/var/www/wordparrot/server/plugins:ro
            - authorized_domains:/var/www/wordparrot/authorized_domains:ro
        networks: 
            - internal-network
        env_file:
            - .env
        ports:
            - 80:80
            - 443:443
        depends_on:
            - redis_server
            - sites_server

    ${config.dbHost}:
        image: mysql
        container_name: ${config.dbHost}
        restart: always
        volumes:
            - db_data:/var/lib/mysql
        environment:
            MYSQL_ROOT_PASSWORD: \${MYSQL_ROOT_PASSWORD\}
            MYSQL_DATABASE: \${DATABASE_NAME\}
            MYSQL_USER: \${DATABASE_USER\}
            MYSQL_PASSWORD: \${DATABASE_PASSWORD\}
        env_file:
            - .env
        ports:
            - 3306:3306
        networks: 
            - internal-network

    phpmyadmin:
        image: phpmyadmin
        restart: always
        env_file: 
            - .env
        environment:
            PMA_HOST: ${config.dbHost}
            MYSQL_ROOT_PASSWORD: \${MYSQL_ROOT_PASSWORD\}
            MYSQL_USER: \${DATABASE_USER\}
            MYSQL_PASSWORD: \${DATABASE_PASSWORD\}
        ports:
            - 8080:80
        depends_on:
            - ${config.dbHost}
        networks: 
            - internal-network
    
    ${config.redisServerName}:
        image: redis:alpine
        restart: always
        env_file: 
            - .env
        command: redis-server --requirepass \${REDIS_PASSWORD\}
        volumes:
            - redis_data:/data
        ports:
            - 6379:6379
        networks: 
            - internal-network
    
    sandbox_server:
        image: alecejones/wordparrot-sandbox
        restart: always
        env_file: 
            - .env
        volumes:
            - redis_data:/data
        ports:
            - 6060:6060
        networks: 
            - internal-network

    sites_server:
        image: alecejones/wordparrot:vultr
        restart: always
        env_file: 
            - .env
        ports:
            - 5000:5000
        depends_on:
            - redis_server
        volumes:
            - sites_static:/var/www/wordparrot/sites/out:rw
            - setup_static:/var/www/wordparrot/setup/public:rw
            - server_content:/var/www/wordparrot/server/content:rw
            - server_bull:/var/www/wordparrot/server/bull:rw
            - server_plugins:/var/www/wordparrot/server/plugins:rw
            - authorized_domains:/var/www/wordparrot/server/authorized_domains:rw
        networks: 
            - internal-network

volumes:
    resty_conf:
        driver: local
        name: resty_conf
    resty_certificates:
        driver: local
        name: resty_certificates
    authorized_domains:
        driver: local
        name: authorized_domains
    db_data:
        driver: local
        name: db_data
    redis_data:
        driver: local
        name: redis_data
    sites_static:
        driver: local
        name: sites_static
    setup_static:
        driver: local
        name: setup_static
    server_content:
        driver: local
        name: server_content
    server_plugins:
        driver: local
        name: server_plugins
    server_bull:
        driver: local
        name: server_bull
`

    return dockerCompose
}

export default getDockerCompose
