"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalCaseRepository = void 0;
// import {JsonDatabase} from "../Providers/JsonDatabase";
var FileDatabase_1 = require("../Providers/FileDatabase");
var LegalCaseRepository = /** @class */ (function () {
    function LegalCaseRepository() {
        this.db = new FileDatabase_1.FileDatabase('legal_cases');
    }
    LegalCaseRepository.prototype.addCase = function (legalCase) {
        // We can add some more business logic here as per business needs
        return this.db.create(legalCase);
    };
    LegalCaseRepository.prototype.getAllCases = function () {
        // sort by lastest case
        return this.db.readAll().sort(function (a, b) {
            return +new Date(b.startDate) - +new Date(a.startDate);
        });
    };
    return LegalCaseRepository;
}());
exports.LegalCaseRepository = LegalCaseRepository;
//# sourceMappingURL=LegalCaseRepository.js.map