"use strict";
exports.__esModule = true;
var getDockerCompose_1 = require("./getDockerCompose");
var getEnv_1 = require("./getEnv");
var getSandboxEnv_1 = require("./getSandboxEnv");
var getStart_1 = require("./getStart");
var defineEnvVariables_1 = require("./defineEnvVariables");
var envVariables = (0, defineEnvVariables_1["default"])();
var files = [
    {
        name: 'docker-compose.yml',
        rawString: (0, getDockerCompose_1["default"])(envVariables),
        index: 0
    },
    {
        name: '.env',
        rawString: (0, getEnv_1["default"])(envVariables),
        index: 1
    },
    {
        name: '.env.sandbox',
        rawString: (0, getSandboxEnv_1["default"])(envVariables),
        index: 2
    },
    {
        name: 'start.sh',
        rawString: (0, getStart_1["default"])(),
        index: 3
    }
];
exports["default"] = files;
