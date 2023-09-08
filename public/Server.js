"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var LegalCaseRepository_1 = require("./Repositories/LegalCaseRepository");
var LegalCase_1 = require("./Models/LegalCase");
var caseRepository = new LegalCaseRepository_1.LegalCaseRepository();
var server = http.createServer(function (req, res) {
    var route = req.method + req.url;
    console.log(route);
    switch (route) {
        case 'POST/api/case':
            var body_1 = '';
            req.on('data', function (chunk) {
                body_1 += chunk.toString();
            });
            req.on('end', function () {
                var legalCase = new LegalCase_1.LegalCase(JSON.parse(body_1));
                var createdCase = caseRepository.addCase(legalCase);
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
var port = 8000;
server.listen(port, function () {
    console.log("Server running on http://localhost:".concat(port));
});
//# sourceMappingURL=Server.js.map