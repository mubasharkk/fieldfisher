"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseController = void 0;
var LegalCaseRepository_1 = require("../../../Repositories/LegalCaseRepository");
var CaseController = /** @class */ (function () {
    function CaseController() {
        this.repo = new LegalCaseRepository_1.LegalCaseRepository();
    }
    return CaseController;
}());
exports.CaseController = CaseController;
//# sourceMappingURL=CaseController.js.map