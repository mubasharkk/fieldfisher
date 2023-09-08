// index.ts

import {LegalCaseRepository} from "./Repositories/LegalCaseRepository";
import {LegalCase} from "./Models/LegalCase";

const repo = new LegalCaseRepository();

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const d = randomDate(new Date(2012, 0, 1), new Date());

const legalCase = repo.addCase(new LegalCase({
    customerName: "Mubashar Khokhar",
    startDate: randomDate(new Date(2018, 0, 1), new Date()),
}));


const legalCase1 = repo.addCase(new LegalCase({
    customerName: "John Doe",
    startDate: randomDate(new Date(2018, 0, 1), new Date()),
}));

const legalCase2 = repo.addCase(new LegalCase({
    customerName: "Max Mustermann",
    startDate: randomDate(new Date(2018, 0, 1), new Date()),
}));

const legalCase3 = repo.addCase(new LegalCase({
    customerName: "Edward Snowden",
    startDate: new Date(),
}));
console.log("Created:", legalCase);