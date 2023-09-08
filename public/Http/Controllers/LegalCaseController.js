"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalCaseController = void 0;
var LegalCaseRepository_1 = require("../../Repositories/LegalCaseRepository");
var LegalCase_1 = require("../../Models/LegalCase");
var LegalCaseController = /** @class */ (function () {
    function LegalCaseController() {
        this.repo = new LegalCaseRepository_1.LegalCaseRepository();
    }
    LegalCaseController.prototype.index = function (res, queryParams) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(this.repo.getAllCases()));
    };
    LegalCaseController.prototype.store = function (res, requestParams) {
        var legalCase = new LegalCase_1.LegalCase(requestParams);
        var createdCase = this.repo.addCase(legalCase);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(createdCase));
    };
    return LegalCaseController;
}());
exports.LegalCaseController = LegalCaseController;
//# sourceMappingURL=LegalCaseController.js.map