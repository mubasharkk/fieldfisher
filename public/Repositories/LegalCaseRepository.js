"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalCaseRepository = void 0;
var JsonDatabase_1 = require("../Providers/JsonDatabase");
var LegalCaseRepository = /** @class */ (function () {
    function LegalCaseRepository() {
        this.db = new JsonDatabase_1.JsonDatabase('legal_cases');
    }
    LegalCaseRepository.prototype.addCase = function (legalCase) {
        // We can add some more business logic here as per business needs
        return this.db.create(legalCase);
    };
    return LegalCaseRepository;
}());
exports.LegalCaseRepository = LegalCaseRepository;
//# sourceMappingURL=LegalCaseRepository.js.map