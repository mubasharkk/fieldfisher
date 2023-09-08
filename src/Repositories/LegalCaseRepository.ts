import {IDatabase} from "../Providers/IDatabase";
import {LegalCase} from "../Models/LegalCase";
import {JsonDatabase} from "../Providers/JsonDatabase";

export class LegalCaseRepository {
    private db: IDatabase;

    constructor() {
        this.db = new JsonDatabase('legal_cases');
    }

    addCase(legalCase: LegalCase): LegalCase {
        // We can add some more business logic here as per business needs
        return this.db.create(legalCase) as LegalCase;
    }

    getAllCases() {
        // sort by lastest case
        return this.db.readAll().sort((a: LegalCase, b: LegalCase) => {
            return +new Date(b.startDate) - +new Date(a.startDate);
        });
    }


}
