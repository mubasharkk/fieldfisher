// index.ts

import {LegalCaseRepository} from "./Repositories/LegalCaseRepository";
import {LegalCase} from "./Models/LegalCase";

const repo = new LegalCaseRepository();

const legalCase = repo.addCase(new LegalCase({
    customerName: "Mubashar Khokhar",
    startDate: new Date(),
}));

console.log("Created:", legalCase);