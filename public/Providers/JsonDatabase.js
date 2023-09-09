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
exports.JsonDatabase = void 0;
var uuid_1 = require("uuid");
var fs = require("fs");
var path = require("path");
var JsonDatabase = /** @class */ (function () {
    function JsonDatabase(tableName) {
        this.filePath = path.join(__dirname, "../../data/".concat(tableName, ".json"));
        this.init();
    }
    JsonDatabase.prototype.init = function () {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
        }
    };
    JsonDatabase.prototype.create = function (record) {
        return this.write(record);
    };
    JsonDatabase.prototype.find = function (id) {
        var data = this.readAll();
        return data.find(function (record) { return record.id === id; }) || null;
    };
    JsonDatabase.prototype.update = function (id, updatedFields) {
        var record = this.find(id);
        return this.write(__assign(__assign({}, record), updatedFields));
    };
    JsonDatabase.prototype.write = function (record) {
        var data = this.readAll();
        if (record.id) {
            var recordIndex = data.findIndex(function (item) { return item.id === record.id; });
            data[recordIndex] = record;
        }
        else {
            record = __assign({ id: (0, uuid_1.v4)() }, record);
            data.push(record);
        }
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2)); // Beautified JSON
        return record;
    };
    JsonDatabase.prototype.delete = function (id) {
        var data = this.readAll();
        var recordIndex = data.findIndex(function (record) { return record.id === id; });
        if (recordIndex === -1) {
            return false;
        }
        data.splice(recordIndex, 1);
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
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