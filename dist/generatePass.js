"use strict";
exports.__esModule = true;
var generatePass = function (pLength) {
    var keyListAlpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", keyListInt = "1234567890", keyListSpec = "_-", password = '';
    var len = Math.ceil(pLength / 2);
    len = len - 1;
    var lenSpec = pLength - 2 * len;
    for (var i = 0; i < len; i++) {
        password += keyListAlpha.charAt(Math.floor(Math.random() * keyListAlpha.length));
        password += keyListInt.charAt(Math.floor(Math.random() * keyListInt.length));
    }
    for (var i = 0; i < lenSpec; i++)
        password += keyListSpec.charAt(Math.floor(Math.random() * keyListSpec.length));
    password = password.split('').sort(function () { return 0.5 - Math.random(); }).join('');
    return password;
};
exports["default"] = generatePass;
