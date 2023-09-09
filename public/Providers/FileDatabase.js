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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDatabase = void 0;
var fs = require("fs");
var path = require("path");
var util = require('util');
var FileDatabase = /** @class */ (function () {
    function FileDatabase(tableName) {
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
        var rawData = fs.readFileSync(this.filePath + "/".concat(id, ".txt"), 'utf-8');
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