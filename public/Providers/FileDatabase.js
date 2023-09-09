"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDatabase = void 0;
var fs = require("fs");
var path = require("path");
var util = require('util');
var FileDatabase = /** @class */ (function () {
    function FileDatabase(tableName) {
        var _this = this;
        this.readAllFiles = function (dirPath) { return __awaiter(_this, void 0, void 0, function () {
            var fileContents, files, readPromises, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileContents = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fs.promises.readdir(dirPath)];
                    case 2:
                        files = _a.sent();
                        readPromises = files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var filePath, content;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        filePath = path.join(dirPath, file);
                                        return [4 /*yield*/, fs.promises.readFile(filePath, 'utf-8')];
                                    case 1:
                                        content = _a.sent();
                                        fileContents.push(content);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(readPromises)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, fileContents];
                    case 4:
                        err_1 = _a.sent();
                        console.error("An error occurred: ".concat(err_1));
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.filePath = path.join(__dirname, "../../data/".concat(tableName, "/"));
        this.init();
    }
    FileDatabase.prototype.init = function () {
        var dir = path.dirname(this.filePath + '/example.txt');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
        }
    };
    FileDatabase.prototype.getFileId = function (record) {
        if (record.fxFileId) {
            return record.fxFileId;
        }
        return [
            record.customerName.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map(function (x) { return x.toLowerCase(); })
                .join('_'),
            record.startDate.getFullYear().toString().substr(-2),
            Math.random().toString(36).slice(-4)
        ].join('-');
    };
    FileDatabase.prototype.create = function (record) {
        return this.write(record);
    };
    FileDatabase.prototype.find = function (id) {
        return this.rawFileDataToObject(fs.readFileSync(this.filePath + "/".concat(id, ".txt"), 'utf-8'));
    };
    FileDatabase.prototype.rawFileDataToObject = function (rawData) {
        var resultObject = {};
        rawData.split('\n').forEach(function (line) {
            var _a = line.split(': '), key = _a[0], value = _a[1];
            if (value === 'true') {
                resultObject[key] = true;
            }
            else if (value === 'false') {
                resultObject[key] = false;
            }
            else if (!isNaN(Date.parse(value))) {
                resultObject[key] = new Date(value);
            }
            else {
                resultObject[key] = value;
            }
        });
        return resultObject;
    };
    FileDatabase.prototype.update = function (id, updatedFields) {
        var record = this.find(id);
        console.log(record);
        return this.write(__assign(__assign({}, record), updatedFields));
    };
    FileDatabase.prototype.write = function (record) {
        record = __assign({ fxFileId: this.getFileId(record) }, record);
        fs.writeFileSync(this.filePath + "/".concat(record.fxFileId, ".txt"), Object.entries(record).map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(key, ": ").concat(value);
        }).join('\n'));
        return record;
    };
    FileDatabase.prototype.delete = function (id) {
        fs.unlink(this.filePath + "/".concat(id, ".txt"), function (err) {
            if (err) {
                console.error("Failed to delete file: ".concat(err));
                return;
            }
            console.log("Successfully deleted ".concat(id));
        });
        return true;
    };
    FileDatabase.prototype.readAll = function () {
        return [];
    };
    return FileDatabase;
}());
exports.FileDatabase = FileDatabase;
//# sourceMappingURL=FileDatabase.js.map