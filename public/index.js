"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
var LegalCaseRepository_1 = require("./Repositories/LegalCaseRepository");
var LegalCase_1 = require("./Models/LegalCase");
var repo = new LegalCaseRepository_1.LegalCaseRepository();
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
var d = randomDate(new Date(2012, 0, 1), new Date());
var legalCase = repo.addCase(new LegalCase_1.LegalCase({
    customerName: "Edward Snowden",
    startDate: randomDate(new Date(2018, 0, 1), new Date()),
}));
var legalCase1 = repo.addCase(new LegalCase_1.LegalCase({
    customerName: "John Doe",
    startDate: randomDate(new Date(2018, 0, 1), new Date()),
}));
var legalCase2 = repo.addCase(new LegalCase_1.LegalCase({
    customerName: "Max Mustermann",
    startDate: randomDate(new Date(2018, 0, 1), new Date()),
}));
var legalCase3 = repo.addCase(new LegalCase_1.LegalCase({
    customerName: "Mubashar Khokhar",
    startDate: new Date(),
}));
console.log("Created:", legalCase);
var updatedCase = repo.db.update(legalCase3.fxFileId, {
    customerName: "Edward Snowden 123",
});
console.log("Update:", updatedCase);
repo.db.delete(legalCase2.fxFileId);
//# sourceMappingURL=index.js.map