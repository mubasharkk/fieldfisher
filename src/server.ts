import * as http from 'http';
import * as url from 'url';
import * as querystring from 'querystring';
import {IncomingMessage, ServerResponse} from 'http';
import {LegalCaseRepository} from './Repositories/LegalCaseRepository';
import {LegalCaseController} from "./Http/Controllers/LegalCaseController";

const caseRepository = new LegalCaseRepository();

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

    const route = req.method + req.url;
    console.log(route);

    const controller = new LegalCaseController;

    switch (route) {
        case 'POST/api/case':
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                controller.store(res, JSON.parse(body));
            });
            break;
        case 'GET/api/allcases':
            const parsedUrl = url.parse(req.url || '', true);
            controller.index(res, parsedUrl.query);
            break;
        default:
            // Handle 404 Not Found
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({code: 404, message: '404 Not Found'}));
            break;
    }
});


const port = 8000;
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
