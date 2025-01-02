"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const config_1 = __importDefault(require("config"));
const connectionLimit = config_1.default.get('dbConfig.connectionLimit');
const host = config_1.default.get('dbConfig.host');
const user = config_1.default.get('dbConfig.user');
const password = config_1.default.get('dbConfig.pwd');
const database = config_1.default.get('dbConfig.database');
exports.pool = new pg_1.Pool({
    max: connectionLimit,
    host: host,
    user: user,
    password: password,
    database: database
});
