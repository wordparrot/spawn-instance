"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var path_1 = require("path");
var setup_1 = require("./setup");
(0, fs_1.writeFileSync)((0, path_1.resolve)(__dirname, '..', 'scripts', 'setup.sh'), setup_1["default"], 'utf-8');
console.log('Wrote setup.sh to scripts file.');
