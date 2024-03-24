const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const integers = "0123456789";
const exCharacters = "!@$%^&*_-=+";

const generatePassword = (length: number, chars: string) => {
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const generatePass = (
  length: number,
  hasNumbers: boolean,
  hasSymbols: boolean
) => {
  let chars = alpha;
  if (hasNumbers) {
    chars += integers;
  }
  if (hasSymbols) {
    chars += exCharacters;
  }
  return generatePassword(length, chars);
};

const getDotEnvVars = () => {
  return {
    nodeEnv: "production",

    // Versions
    apiVersion: "1.0.0",
    webVersion: "1.0.0",
    sandboxVersion: "1.0.0",
    nginxVersion: "1.0.0",

    imageRepositoryAccount: "alecejones",

    // Names of primary services
    apiService: "app-api",
    apiImage: "wordparrot-api",

    webService: "app-web",
    webImage: "wordparrot-web",

    sandboxService: "app-sandbox",
    sandboxImage: "wordparrot-sandbox",

    nginxService: "app-nginx",
    nginxImage: "wordparrot-nginx",

    // Secret generation
    cookieSecret: generatePass(64, true, true),
    jwtSecret: generatePass(64, true, true),
    adminJwtSecret: generatePass(64, true, true),
    storageEncryptionKey: generatePass(64, true, true),

    // Database variables
    dbHost: "db_server",
    dbImage: "mariadb",
    dbVersion: "11.3.2-jammy",
    dbPort: 3306,
    dbName: `wpdb_${generatePass(10, true, false)}`,
    dbUser: `wpuser_${generatePass(10, true, false)}`,
    dbRootPassword: generatePass(64, true, true),
    dbUserPassword: generatePass(64, true, true),

    // Api variables
    serverPort: 5000,

    // Admin variables
    adminName: "php_myadmin",

    // Redis variables
    redisServerName: "redis_server",
    redisPort: 6379,
    redisPassword: generatePass(64, true, true),
    redisDb: "0",
    redisQueueDb: "1",
    redisCacheDb: "2",
    redisAuthorizedDomains: "authorized_domains",

    // Sandbox variables
    sandboxServerName: "sandbox_server",
    sandboxPort: 6060,
  };
};

export default getDotEnvVars;
