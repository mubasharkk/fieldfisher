"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalCaseRepository = void 0;
var LegalCaseRepository = /** @class */ (function () {
    function LegalCaseRepository(db) {
        this.db = db;
    }
    LegalCaseRepository.prototype.addCase = function (legalCase) {
        return this.db.create(legalCase);
    };
    return LegalCaseRepository;
}());
exports.LegalCaseRepository = LegalCaseRepository;
//# sourceMappingURL=LegalCaseRepository.js.map