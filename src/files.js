const getDockerCompose = require('./getDockerCompose')
const getEnv = require('./getEnv')
const getEnvSandbox = require('./getEnvSandbox')
const getStart = require('./getStart')

const defineEnvVariables = require('./defineEnvVariables')
const envVariables = defineEnvVariables()

module.exports = [
    {
        name: 'docker-compose.yml',
        rawString: getDockerCompose(envVariables),
        index: 0,
    },
    {
        name: '.env',
        rawString: getEnv(envVariables),
        index: 1,
    },
    {
        name: '.env.sandbox',
        rawString: getEnvSandbox(envVariables),
        index: 2,
    },
    {
        name: 'start.sh',
        rawString: getStart(),
        index: 3,
    }
]