"use strict";
exports.__esModule = true;
var getDockerCompose_1 = require("../scripts/getDockerCompose");
var getEnv_1 = require("../scripts/getEnv");
var getSandboxEnv_1 = require("../scripts/getSandboxEnv");
var start_sh_1 = require("./start.sh");
var getDotEnvFile_1 = require("../scripts/getDotEnvFile");
var setup_sh_1 = require("../templates/setup.sh");
var envVariables = (0, getDotEnvFile_1["default"])();
var fileList = [
  {
    name: "docker-compose.yml",
    rawString: (0, getDockerCompose_1["default"])(envVariables),
    index: 0,
  },
  {
    name: ".env",
    rawString: (0, getEnv_1["default"])(envVariables),
    index: 1,
  },
  {
    name: ".env.sandbox",
    rawString: (0, getSandboxEnv_1["default"])(envVariables),
    index: 2,
  },
  {
    name: "start.sh",
    rawString: start_sh_1["default"],
    index: 3,
  },
  {
    name: "setup.sh",
    rawString: setup_sh_1["default"],
    index: 4,
  },
];
exports["default"] = fileList;
