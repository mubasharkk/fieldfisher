"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
var JsonDatabase_1 = require("./Providers/JsonDatabase");
var LegalCaseRepository_1 = require("./Repositories/LegalCaseRepository");
var LegalCase_1 = require("./Models/LegalCase");
var repo = new LegalCaseRepository_1.LegalCaseRepository(new JsonDatabase_1.JsonDatabase('legal_case'));
var legalCase = repo.addCase(new LegalCase_1.LegalCase({
    customerName: "Mubashar Khokhar",
    startDate: new Date(),
}));
console.log("Created:", legalCase);
//# sourceMappingURL=index.js.map