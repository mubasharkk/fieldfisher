import {LegalCaseRepository} from "../../Repositories/LegalCaseRepository";

export class LegalCaseController {

    private repo: LegalCaseRepository;

    constructor() {
        this.repo = new LegalCaseRepository();
    }
}