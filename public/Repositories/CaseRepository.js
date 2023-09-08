"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseRepository = void 0;
var CaseRepository = /** @class */ (function () {
    function CaseRepository(db) {
        this.db = db;
    }
    CaseRepository.prototype.addCase = function (legalCase) {
        return this.db.create(legalCase);
    };
    return CaseRepository;
}());
exports.CaseRepository = CaseRepository;
//# sourceMappingURL=CaseRepository.js.map