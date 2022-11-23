"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var files_1 = require("./files");
try {
    (0, fs_1.rmSync)('./scripts', { recursive: true });
}
catch (e) {
    // will throw error if no folder exists, but we can ignore this.
}
(0, fs_1.mkdirSync)('./scripts');
files_1["default"].forEach(function (file) {
    try {
        (0, fs_1.writeFileSync)("./scripts/".concat(file.name), file.rawString, 'utf-8');
    }
    catch (e) {
        console.log("Failed to write ".concat(file.name, "."));
    }
});
