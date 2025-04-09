"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicKey = exports.privateKey = void 0;
exports.validateToken = validateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
exports.privateKey = node_fs_1.default.readFileSync(node_path_1.default.resolve(__dirname, '../../config/authentication/localhost+3-key.pem'), 'utf8');
exports.publicKey = node_fs_1.default.readFileSync(node_path_1.default.resolve(__dirname, '../../config/authentication/localhost+3.pem'), 'utf8');
function validateToken(req, res, next) {
    const authenticationHeader = req.headers.authorization;
    if (authenticationHeader && authenticationHeader.startsWith('Bearer ')) {
        const token = authenticationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.publicKey, { algorithms: ['RS256'] }, (err, user) => {
            if (err)
                return res.status(403).send('Invalid token');
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).send('Authorization header missing');
    }
}
