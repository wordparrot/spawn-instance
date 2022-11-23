import getDockerCompose  from "./getDockerCompose"
import getEnv from './getEnv'
import getSandboxEnv from './getSandboxEnv'
import getStart from './getStart'
import defineEnvVariables from "./defineEnvVariables"
const envVariables = defineEnvVariables()

const files = [
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
        rawString: getSandboxEnv(envVariables),
        index: 2,
    },
    {
        name: 'start.sh',
        rawString: getStart(),
        index: 3,
    }
]

export default files