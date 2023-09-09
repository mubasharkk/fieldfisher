import {LegalCaseRepository} from "../../Repositories/LegalCaseRepository";
import {LegalCase} from "../../Models/LegalCase";
import {ServerResponse} from "http";
import {ParsedUrlQuery} from "querystring";

export class LegalCaseController {


    private repo: LegalCaseRepository;

    constructor() {
        this.repo = new LegalCaseRepository();
    }

    public index(res: ServerResponse, queryParams: ParsedUrlQuery) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(this.repo.getAllCases()));
    }

    public store(res: ServerResponse, requestParams: {}) {

        requestParams = {
            ...requestParams,
            ...{isFinished: (requestParams['isFinished'] === 'true' || parseInt(requestParams['isFinished']) === 1)}
        };
        const createdCase = this.repo.addCase(
            new LegalCase(requestParams as LegalCase)
        );
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(createdCase));
    }
}