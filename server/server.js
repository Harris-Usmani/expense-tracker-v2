"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var http_1 = require("http");
// In-memory data storage for transactions
var transactions = [];
// Helper function to parse JSON from incoming requests
var parseBody = function (req) {
    return new Promise(function (resolve, reject) {
        var body = '';
        req.on('data', function (chunk) {
            body += chunk.toString();
        });
        req.on('end', function () {
            try {
                resolve(JSON.parse(body));
            }
            catch (e) {
                reject(e);
            }
        });
    });
};
// Server handler function
var requestHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var method, url, transaction, _a, transactionId_1, updatedTransaction, index, _b, transactionId_2, index;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                method = req.method, url = req.url;
                // Set response headers
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                // CORS preflight response
                if (method === 'OPTIONS') {
                    res.writeHead(204);
                    return [2 /*return*/, res.end()];
                }
                if (!(url === '/api/transactions' && method === 'GET')) return [3 /*break*/, 1];
                // Get all transactions
                res.writeHead(200);
                res.end(JSON.stringify(transactions));
                return [3 /*break*/, 12];
            case 1:
                if (!(url === '/api/transactions' && method === 'POST')) return [3 /*break*/, 6];
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                return [4 /*yield*/, parseBody(req)];
            case 3:
                transaction = _c.sent();
                transaction.id = Date.now(); // Assign a unique ID based on timestamp
                transactions.push(transaction);
                res.writeHead(201);
                res.end(JSON.stringify(transaction));
                return [3 /*break*/, 5];
            case 4:
                _a = _c.sent();
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 12];
            case 6:
                if (!((url === null || url === void 0 ? void 0 : url.startsWith('/api/transactions/')) && method === 'PUT')) return [3 /*break*/, 11];
                transactionId_1 = Number(url.split('/').pop());
                _c.label = 7;
            case 7:
                _c.trys.push([7, 9, , 10]);
                return [4 /*yield*/, parseBody(req)];
            case 8:
                updatedTransaction = _c.sent();
                index = transactions.findIndex(function (t) { return t.id === transactionId_1; });
                if (index === -1) {
                    res.writeHead(404);
                    return [2 /*return*/, res.end(JSON.stringify({ error: 'Transaction not found' }))];
                }
                transactions[index] = __assign(__assign({}, transactions[index]), updatedTransaction);
                res.writeHead(200);
                res.end(JSON.stringify(transactions[index]));
                return [3 /*break*/, 10];
            case 9:
                _b = _c.sent();
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
                return [3 /*break*/, 10];
            case 10: return [3 /*break*/, 12];
            case 11:
                if ((url === null || url === void 0 ? void 0 : url.startsWith('/api/transactions/')) && method === 'DELETE') {
                    transactionId_2 = Number(url.split('/').pop());
                    index = transactions.findIndex(function (t) { return t.id === transactionId_2; });
                    if (index === -1) {
                        res.writeHead(404);
                        return [2 /*return*/, res.end(JSON.stringify({ error: 'Transaction not found' }))];
                    }
                    transactions.splice(index, 1);
                    res.writeHead(204);
                    res.end();
                }
                else {
                    // Handle unsupported routes
                    res.writeHead(404);
                    res.end(JSON.stringify({ error: 'Route not found' }));
                }
                _c.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}); };
// Create the HTTP server
var server = (0, http_1.createServer)(requestHandler);
// Start the server
var PORT = 5000;
server.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
