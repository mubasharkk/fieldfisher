import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import {LegalCaseRepository} from './Repositories/LegalCaseRepository';
import {LegalCase} from './Models/LegalCase';
import {JsonDatabase} from "./Providers/JsonDatabase";

const caseRepository = new LegalCaseRepository();

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

    const route = req.method + req.url;
    console.log(route);
    switch(route) {
        case 'POST/api/case':
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const legalCase = new LegalCase(JSON.parse(body));
                const createdCase = caseRepository.addCase(legalCase);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(createdCase));
            });
            break;
        default:
            // Handle 404 Not Found
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ code: 404, message: '404 Not Found' }));
            break;
    }
});


const port = 8000;
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
