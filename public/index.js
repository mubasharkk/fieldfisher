"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
var JsonDatabase_1 = require("./Providers/JsonDatabase");
var Model_1 = require("./Models/Model");
var db = new JsonDatabase_1.JsonDatabase('users');
var testModel = new Model_1.Model({ name: 'John', age: 30 });
var createdRecord = db.create(testModel);
console.log('Created:', createdRecord);
var createdRecord2 = db.create({ name: 'Doe', age: 89 });
console.log('Created:', createdRecord2);
var readRecord = db.find(createdRecord.id);
console.log('Read:', readRecord);
var updatedRecord = db.update(createdRecord2.id, { age: 31 });
console.log('Updated:', updatedRecord);
var isDeleted = db.delete(readRecord.id);
console.log('Deleted:', isDeleted);
//# sourceMappingURL=index.js.map