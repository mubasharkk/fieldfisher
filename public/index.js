"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
var LegalCaseRepository_1 = require("./Repositories/LegalCaseRepository");
var chance_1 = require("chance");
var repo = new LegalCaseRepository_1.LegalCaseRepository();
console.log(chance_1.chance);
for (var i = 0; i < 10; i++) {
    // const fakeCase = new LegalCase({
    //     customerName: faker.name({middle: true}),
    //     startDate: faker.date({year: new Date().getMonth() - 1}),
    //     isFinished: faker.bool(),
    // });
    // console.log("Created:", fakeCase);
}
//# sourceMappingURL=index.js.map