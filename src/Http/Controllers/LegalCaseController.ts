import {LegalCaseRepository} from "../../Repositories/LegalCaseRepository";
import {LegalCase} from "../../Models/LegalCase";
import {ServerResponse} from "http";
import {ParsedUrlQuery} from "querystring";

export class LegalCaseController {


    private repo: LegalCaseRepository;

    constructor() {
        this.repo = new LegalCaseRepository();
    }

    public index(res: ServerResponse<import("http").IncomingMessage>, queryParams: ParsedUrlQuery) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(this.repo.getAllCases()));
    }

    public store(res: ServerResponse<import("http").IncomingMessage>, requestParams: object) {
        const legalCase = new LegalCase(requestParams as LegalCase);
        const createdCase = this.repo.addCase(legalCase);
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(createdCase));
    }
}