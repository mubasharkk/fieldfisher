"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        requestParams = __assign(__assign({}, requestParams), { isFinished: (requestParams['isFinished'] === 'true' || parseInt(requestParams['isFinished']) === 1) });
        console.log(requestParams);
        var legalCase = new LegalCase_1.LegalCase(requestParams);
        var createdCase = this.repo.addCase(legalCase);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(createdCase));
    };
    return LegalCaseController;
}());
exports.LegalCaseController = LegalCaseController;
//# sourceMappingURL=LegalCaseController.js.map