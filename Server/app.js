"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const swagger_1 = require("./config/swagger");
const router_1 = require("./router/router");
const https = __importStar(require("node:https"));
const fs = __importStar(require("node:fs"));
const app = (0, express_1.default)();
const port = config_1.default.get('appConfig.port');
const origin = config_1.default.get('appConfig.origin');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: origin }));
app.use('/users', router_1.router);
app.use(errorHandler);
(0, swagger_1.setupSwagger)(app);
const server = https.createServer({
    key: fs.readFileSync('./mkcert/localhost+3-key.pem'),
    cert: fs.readFileSync('./mkcert/localhost+3.pem'),
}, app);
server.listen(port, "127.0.0.1", () => {
    console.log(`Example app listening on port ${port}`);
});
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err);
    res.status(500).send('Something broke!' + err);
}
