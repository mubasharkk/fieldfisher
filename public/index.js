"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
var JsonDatabase_1 = require("./Providers/JsonDatabase");
var LegalCaseRepository_1 = require("./Repositories/LegalCaseRepository");
var repo = new LegalCaseRepository_1.LegalCaseRepository(new JsonDatabase_1.JsonDatabase('legal_case'));
//# sourceMappingURL=index.js.map