"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
var promises_1 = require("fs/promises");
var commander_1 = require("commander");
var createBase64_1 = require("./createBase64");
var fileList_1 = require("./templates/fileList");
var program = new commander_1.Command();
var buildDir = "./environment";
var base64SetupScript = createBase64_1["default"];
/*
Generate a list of files for wordparrot use. Includes:
- .env
- .env.sandbox
- docker-compose.yml
- setup.sh
- start.sh

Important variables will also be injected into the files.
*/
var main = function () {
  console.log(
    " \\\\                        =o) \r\n (o>                       /\\\\ \r\n_(()_Welcome to Wordparrot_\\_V_\r\n //                         \\\\ \r\n                             \\\\"
  );
  (function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var hasOverride, e_1, e_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.log("");
            console.log("Creating environment...");
            program
              .version("1.0.0", "-v, --version")
              .usage("[OPTIONS]...")
              .option("-o, --override", "Delete build folder if present.")
              .parse(process.argv);
            if (!process.env.WORDPARROT_AUTHORIZED_DOMAIN) {
              console.log("");
              console.log("");
              console.log(
                'Error: WORDPARROT_AUTHORIZED_DOMAIN environment variable must be set to a valid Internet domain name (e.g. "app.wordparrot.com").'
              );
              console.log("");
              console.log("Exiting.");
              console.log("");
              process.exit(1);
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6, , 7]);
            // Checks to see if build folder is already there.
            return [4 /*yield*/, (0, promises_1.stat)(buildDir)];
          case 2:
            // Checks to see if build folder is already there.
            _a.sent();
            hasOverride = program.opts().override;
            if (!hasOverride) return [3 /*break*/, 4];
            // Delete any build folder present
            console.log("");
            console.log("");
            console.log(
              "You have chosen to override the existing build folder."
            );
            return [
              4 /*yield*/,
              (0, promises_1.rm)(buildDir, {
                recursive: true,
              }),
            ];
          case 3:
            _a.sent();
            return [3 /*break*/, 5];
          case 4:
            console.log("");
            console.log("");
            console.log(
              "Build folder already present. Use override flag to destroy existing folder. Exiting."
            );
            process.exit(1);
            _a.label = 5;
          case 5:
            return [3 /*break*/, 7];
          case 6:
            e_1 = _a.sent();
            return [3 /*break*/, 7];
          case 7:
            console.log("");
            console.log("");
            console.log("Preparing build...");
            _a.label = 8;
          case 8:
            _a.trys.push([8, 11, , 12]);
            return [4 /*yield*/, (0, promises_1.mkdir)(buildDir)];
          case 9:
            _a.sent();
            console.log("");
            console.log("");
            console.log("Environment folder created.");
            console.log("");
            console.log("");
            return [
              4 /*yield*/,
              Promise.all(
                fileList_1["default"].map(function (file) {
                  return (0,
                  promises_1.writeFile)("".concat(buildDir, "/").concat(file.name), file.rawString, "utf-8");
                })
              ),
            ];
          case 10:
            _a.sent();
            console.log("File scaffolding complete.");
            process.exit(0);
            return [3 /*break*/, 12];
          case 11:
            e_2 = _a.sent();
            console.log("Operation failed.");
            console.log(e_2);
            process.exit(1);
            return [3 /*break*/, 12];
          case 12:
            return [2 /*return*/];
        }
      });
    });
  })();
};
exports["default"] = main;
