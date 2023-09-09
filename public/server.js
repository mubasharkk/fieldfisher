"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var LegalCaseRepository_1 = require("./Repositories/LegalCaseRepository");
var LegalCaseController_1 = require("./Http/Controllers/LegalCaseController");
var caseRepository = new LegalCaseRepository_1.LegalCaseRepository();
var server = http.createServer(function (req, res) {
    var route = req.method + req.url;
    console.log(route);
    var controller = new LegalCaseController_1.LegalCaseController;
    switch (route) {
        case 'POST/api/case':
            var body_1 = '';
            req.on('data', function (chunk) {
                body_1 += chunk.toString();
            });
            req.on('end', function () {
                console.log(req.headers['content-type']);
                if (req.headers['content-type'] === 'application/json') {
                    controller.store(res, JSON.parse(body_1));
                }
                else if (req.headers['content-type'] == 'application/x-www-form-urlencoded') {
                    controller.store(res, querystring.parse(body_1));
                }
                else {
                    // Handle 404 Not Found
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ code: 400, message: 'Bad Request' }));
                }
            });
            break;
        case 'GET/api/allcases':
            var parsedUrl = url.parse(req.url || '', true);
            controller.index(res, parsedUrl.query);
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
//# sourceMappingURL=server.js.map