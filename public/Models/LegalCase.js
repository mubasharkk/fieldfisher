"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalCase = void 0;
var Model_1 = require("./Model");
var LegalCase = /** @class */ (function (_super) {
    __extends(LegalCase, _super);
    function LegalCase(initialValues) {
        var _this = _super.call(this, initialValues) || this;
        _this.customerName = initialValues.customerName;
        _this.startDate = new Date(initialValues.startDate);
        _this.isFinished = initialValues.isFinished || false;
        return _this;
    }
    return LegalCase;
}(Model_1.Model));
exports.LegalCase = LegalCase;
//# sourceMappingURL=LegalCase.js.map