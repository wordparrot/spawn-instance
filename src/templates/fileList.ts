import getDockerCompose from "../scripts/getDockerCompose";
import getEnv from "../scripts/getEnv";
import getSandboxEnv from "../scripts/getSandboxEnv";
import start from "./start.sh";
import getDotEnvFile from "../scripts/getDotEnvFile";
import setup from "../templates/setup.sh";

const envVariables = getDotEnvFile();

const fileList = [
  {
    name: "docker-compose.yml",
    rawString: getDockerCompose(envVariables),
    index: 0,
  },
  {
    name: ".env",
    rawString: getEnv(envVariables),
    index: 1,
  },
  {
    name: ".env.sandbox",
    rawString: getSandboxEnv(envVariables),
    index: 2,
  },
  {
    name: "start.sh",
    rawString: start,
    index: 3,
  },
  {
    name: "setup.sh",
    rawString: setup,
    index: 4,
  },
];

export default fileList;
