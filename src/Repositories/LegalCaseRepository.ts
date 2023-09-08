import {IDatabase} from "../Providers/IDatabase";
import {LegalCase} from "../Models/LegalCase";

export class LegalCaseRepository {
    private db: IDatabase;

    constructor(db: IDatabase) {
        this.db = db;
    }

    addCase(legalCase: LegalCase): LegalCase {
        return this.db.create(legalCase) as LegalCase;
    }

}
