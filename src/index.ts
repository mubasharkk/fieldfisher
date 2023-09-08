// index.ts

import {JsonDatabase} from './Providers/JsonDatabase';
import {LegalCaseRepository} from "./Repositories/LegalCaseRepository";
import {LegalCase} from "./Models/LegalCase";

const repo = new LegalCaseRepository(
    new JsonDatabase('legal_case')
);

const legalCase = repo.addCase(new LegalCase({
    customerName: "Mubashar Khokhar",
    startDate: new Date(),
}));

console.log("Created:", legalCase);