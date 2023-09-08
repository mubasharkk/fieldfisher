// index.ts

import {JsonDatabase} from './Providers/JsonDatabase';
import {LegalCaseRepository} from "./Repositories/LegalCaseRepository";

const repo = new LegalCaseRepository(
    new JsonDatabase('legal_case')
);
