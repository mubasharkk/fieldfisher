"use strict";
// JsonDatabase.ts
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
exports.JsonDatabase = void 0;
var uuid_1 = require("uuid");
var fs = require("fs");
var path = require("path");
var JsonDatabase = /** @class */ (function () {
    function JsonDatabase(fileName) {
        this.filePath = path.join(__dirname, fileName);
        this.init();
    }
    JsonDatabase.prototype.init = function () {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
        }
    };
    JsonDatabase.prototype.create = function (record) {
        var data = this.readAll();
        var newRecord = __assign({ id: (0, uuid_1.v4)() }, record);
        data.push(newRecord);
        fs.writeFileSync(this.filePath, JSON.stringify(data));
        return newRecord;
    };
    JsonDatabase.prototype.read = function (id) {
        var data = this.readAll();
        return data.find(function (record) { return record.id === id; }) || null;
    };
    JsonDatabase.prototype.update = function (id, updatedFields) {
        var data = this.readAll();
        var recordIndex = data.findIndex(function (record) { return record.id === id; });
        if (recordIndex === -1) {
            return null;
        }
        var updatedRecord = __assign(__assign({}, data[recordIndex]), updatedFields);
        data[recordIndex] = updatedRecord;
        fs.writeFileSync(this.filePath, JSON.stringify(data));
        return updatedRecord;
    };
    JsonDatabase.prototype.delete = function (id) {
        var data = this.readAll();
        var recordIndex = data.findIndex(function (record) { return record.id === id; });
        if (recordIndex === -1) {
            return false;
        }
        data.splice(recordIndex, 1);
        fs.writeFileSync(this.filePath, JSON.stringify(data));
        return true;
    };
    JsonDatabase.prototype.readAll = function () {
        var rawData = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(rawData);
    };
    return JsonDatabase;
}());
exports.JsonDatabase = JsonDatabase;
//# sourceMappingURL=JsonDatabase.js.map