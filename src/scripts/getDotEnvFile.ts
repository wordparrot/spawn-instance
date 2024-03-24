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
    sitesVersion: "vultr",
    sandboxVersion: "latest",
    nginxVersion: "vultr",

    // Names of primary services
    apiService: "app-api",
    webService: "app-web",
    sandboxService: "app-sandbox",
    nginxService: "app-nginx",

    // Secret generation
    cookieSecret: generatePass(64, true, true),
    jwtSecret: generatePass(64, true, true),
    adminJwtSecret: generatePass(64, true, true),
    storageEncryptionKey: generatePass(64, true, true),

    // Database variables
    dbHost: "db_server",
    dbPort: 3306,
    dbName: `wpdb_${generatePass(10, true, false)}`,
    dbUser: `wpuser_${generatePass(10, true, false)}`,
    dbRootPassword: generatePass(64, true, true),
    dbUserPassword: generatePass(64, true, true),

    // Api variables
    serverPort: 5000,

    // Admin variables
    adminName: "php_my_admin",

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
