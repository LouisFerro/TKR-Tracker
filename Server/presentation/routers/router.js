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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.publicKey = exports.privateKey = void 0;
const express = __importStar(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pool_1 = require("../../config/persistence/pool");
const location_1 = require("../../domain/location");
const crypto_1 = __importDefault(require("crypto"));
const fs = __importStar(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const authentication_1 = require("../middleware/authentication");
exports.privateKey = fs.readFileSync(node_path_1.default.resolve(__dirname, '../../config/authentication/localhost+3-key.pem'), 'utf8');
exports.publicKey = fs.readFileSync(node_path_1.default.resolve(__dirname, '../../config/authentication/localhost+3.pem'), 'utf8');
exports.router = express.Router();
/**
 * @swagger
 * /login/:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
exports.router.post('/login/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Login");
    console.log(req.body);
    let hashedPassword = crypto_1.default.createHash('sha1').update(req.body.password).digest('hex');
    let sql = `SELECT * FROM "user" WHERE "username" = $1 AND "password" = $2`;
    try {
        const { rows } = yield pool_1.pool.query(sql, [req.body.username, hashedPassword]);
        if (rows.length > 0) {
            const user = rows[0];
            const userResponse = {
                uuid: user.uuid,
                username: user.username,
                email: user.email,
                is_admin: user.is_admin,
                firstname: user.firstname,
                lastname: user.lastname,
                sex: user.sex,
                street: user.street,
                postal_code: user.postal_code,
                city: user.city,
                country: user.country
            };
            const payload = {
                uuid: user.uuid,
                username: user.username,
                is_admin: user.is_admin
            };
            const token = jsonwebtoken_1.default.sign(payload, exports.privateKey, {
                algorithm: 'RS256',
                expiresIn: '1h'
            });
            res.status(200).send({
                user: userResponse,
                token
            });
        }
        else {
            res.status(404).end();
        }
    }
    catch (err) {
        next(err);
    }
}));
/**
 * @swagger
 * /register/:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
exports.router.post('/register/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let hashedPassword = crypto_1.default.createHash('sha1').update(req.body.password).digest('hex');
    let sql = `INSERT INTO "user" ("uuid", "username", "password", "email") VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING *`;
    try {
        const { rows } = yield pool_1.pool.query(sql, [req.body.username, hashedPassword, req.body.email]);
        if (rows.length > 0) {
            let user = { uuid: rows[0].uuid, username: rows[0].username, email: rows[0].email };
            res.status(200).send(user);
        }
        else {
            res.status(404).send(null);
        }
    }
    catch (err) {
        next(err);
    }
}));
/**
 * @swagger
 * /update/:
 *   put:
 *     summary: Update user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               sex:
 *                 type: string
 *               street:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
exports.router.put('/update/', authentication_1.validateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Update User");
    console.log(req.body);
    let sql = `UPDATE "user" SET "username" = $1, "email" = $2, "firstname" = $3, "lastname" = $4, "sex" = $5, "street" = $6, "postal_code" = $7, "city" = $8, "country" = $9 WHERE "uuid" = $10`;
    try {
        console.log("Update User: ", req.body);
        yield pool_1.pool.query(sql, [req.body.username, req.body.email, req.body.firstname, req.body.lastname, req.body.sex, req.body.street, req.body.postal_code, req.body.city, req.body.country, req.body.uuid]);
        res.status(200).send(null);
    }
    catch (err) {
        next(err);
    }
}));
/**
 * @swagger
 * /location/:
 *   post:
 *     summary: Add location
 *     tags: [Location]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_uuid:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       200:
 *         description: Location added successfully
 *       405:
 *         description: User not found
 *       406:
 *         description: Location not added
 */
exports.router.post('/location/', authentication_1.validateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const client = yield pool_1.pool.connect();
        const userResult = yield client.query('SELECT * FROM "user" WHERE uuid = $1', [req.body.user_uuid]);
        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];
            console.log("User: ", user.uuid, "Longitude: ", req.body.longitude, "Latitude: ", req.body.latitude, "Time: ", req.body.time);
            const locationResult = yield client.query('INSERT INTO "location" (uuid, user_uuid, latitude, longitude) VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING *', [user.uuid, req.body.latitude, req.body.longitude]);
            if (locationResult.rows.length > 0) {
                const location = locationResult.rows[0];
                const locationReturn = new location_1.Location(location.uuid, location.user_id, location.latitude, location.longitude, location.time);
                res.status(200).send(locationReturn);
            }
            else {
                res.status(406).send(null);
            }
        }
        else {
            res.status(405).send(req.body.user_uuid);
        }
        client.release();
    }
    catch (err) {
        next(err);
    }
}));
/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     summary: Get locations by user ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Locations retrieved successfully
 *       500:
 *         description: Server error
 */
exports.router.get('/locations/:id', authentication_1.validateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool_1.pool.connect();
        const result = yield client.query('SELECT "user".id, "user".uuid as uuuid, location.uuid as luuid, location.latitude as lat, location.longitude as lng, location.time as time FROM location, "user" WHERE "user".uuid = $1', [req.params.id]);
        const locationResult = result.rows.map(row => new location_1.Location(row.luuid, row.uuuid, row.lat, row.lng, row.time));
        res.status(200).send(locationResult);
        client.release();
    }
    catch (err) {
        res.status(500).send('server error 2345, please call zid');
    }
}));
