"use strict";
exports.__esModule = true;
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
var getDockerCompose = function (config) {
    var dockerCompose = "# docker-compose.yml\nversion: \"3.8\"\n\nnetworks: \n    internal-network:\n        driver: bridge\n        name: wprt_public\n\nservices:\n    nginx:\n        image: alecejones/wordparrot-nginx\n        volumes:\n            - resty_conf:/etc/nginx/nginx.conf\n            - resty_certificates:/etc/resty-auto-ssl:rw\n            - sites_static:/var/www/wordparrot/sites/out:ro\n            - setup_static:/var/www/wordparrot/sites/setup:ro\n            - server_bull:/var/www/wordparrot/server/bull:ro\n            - server_content:/var/www/wordparrot/server/content:ro\n            - server_plugins:/var/www/wordparrot/server/plugins:ro\n            - authorized_domains:/var/www/wordparrot/authorized_domains:ro\n        networks: \n            - internal-network\n        env_file:\n            - .env\n        ports:\n            - 80:80\n            - 443:443\n        depends_on:\n            - redis_server\n            - sites_server\n\n    ".concat(config.dbHost, ":\n        image: mysql\n        restart: always\n        volumes:\n            - db_data:/var/lib/mysql\n        environment:\n            MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}\n        env_file:\n            - .env\n        ports:\n            - 3306:3306\n        networks: \n            - internal-network\n\n    phpmyadmin:\n        image: phpmyadmin\n        restart: always\n        env_file: \n            - .env\n        environment:\n            MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}\n            MYSQL_USER: ${DATABASE_USER}\n            MYSQL_PASSWORD: ${DATABASE_PASSWORD}\n        ports:\n            - 8080:8080\n        networks: \n            - internal-network\n    \n    ").concat(config.redisServerName, ":\n        image: redis:alpine\n        env_file: \n            - .env\n        command: redis-server --requirepass ${REDIS_PASSWORD}\n        volumes:\n            - redis_data:/data\n        ports:\n            - 6379:6379\n        networks: \n            - internal-network\n    \n    sandbox_server:\n        image: alecejones/wordparrot-sandbox\n        env_file: \n            - .env\n        volumes:\n            - redis_data:/data\n        ports:\n            - 6060:6060\n        networks: \n            - internal-network\n\n    sites_server:\n        image: alecejones/wordparrot\n        env_file: \n            - .env\n        ports:\n            - 5000:5000\n        depends_on:\n            - redis_server\n        volumes:\n            - sites_static:/var/www/wordparrot/sites/out:rw\n            - setup_static:/var/www/wordparrot/setup/public:rw\n            - server_content:/var/www/wordparrot/server/content:rw\n            - server_bull:/var/www/wordparrot/server/bull:rw\n            - server_plugins:/var/www/wordparrot/server/plugins:rw\n            - authorized_domains:/var/www/wordparrot/server/authorized_domains:rw\n        networks: \n            - internal-network\n\nvolumes:\n    resty_conf:\n        driver: local\n        name: resty_conf\n    resty_certificates:\n        driver: local\n        name: resty_certificates\n    authorized_domains:\n        driver: local\n        name: authorized_domains\n    db_data:\n        driver: local\n        name: db_data\n    redis_data:\n        driver: local\n        name: redis_data\n    sites_static:\n        driver: local\n        name: sites_static\n    setup_static:\n        driver: local\n        name: setup_static\n    server_content:\n        driver: local\n        name: server_content\n    server_plugins:\n        driver: local\n        name: server_plugins\n    server_bull:\n        driver: local\n        name: server_bull\n");
    return dockerCompose;
};
exports["default"] = getDockerCompose;
