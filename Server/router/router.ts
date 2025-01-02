import * as express from 'express';
import { pool } from "../config/db";
import { User } from "../model/user";
import { Location } from "../model/location";
import crypto from 'crypto';

export const router = express.Router();

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
router.post('/login/', async (req, res, next) => {
    console.log("Login");
    console.log(req.body);

    let hashedPassword = crypto.createHash('sha1').update(req.body.password).digest('hex');
    let sql = `SELECT * FROM "user" WHERE "username" = $1 AND "password" = $2`;
    try {
        const { rows } = await pool.query(sql, [req.body.username, hashedPassword]);
        if (rows.length > 0) {
            let user = new User(rows[0].uuid, rows[0].username, rows[0].email, "", rows[0].is_admin,
                rows[0].firstname, rows[0].lastname, rows[0].sex, rows[0].street, rows[0].postal_code, rows[0].city, rows[0].country);
            res.status(200).send(user);
        } else {
            res.status(404).end();
        }
    } catch (err) {
        next(err);
    }
});

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
router.post('/register/', async (req, res, next) => {
    let hashedPassword = crypto.createHash('sha1').update(req.body.password).digest('hex');
    let sql = `INSERT INTO "user" ("uuid", "username", "password", "email") VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING *`;
    try {
        const { rows } = await pool.query(sql, [req.body.username, hashedPassword, req.body.email]);
        if (rows.length > 0) {
            let user = { uuid: rows[0].uuid, username: rows[0].username, email: rows[0].email };
            res.status(200).send(user);
        } else {
            res.status(404).send(null);
        }
    } catch (err) {
        next(err);
    }
});

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
router.put('/update/', async (req, res, next) => {
    console.log("Update User");
    console.log(req.body);

    let sql = `UPDATE "user" SET "username" = $1, "email" = $2, "firstname" = $3, "lastname" = $4, "sex" = $5, "street" = $6, "postal_code" = $7, "city" = $8, "country" = $9 WHERE "uuid" = $10`;
    try {
        console.log("Update User: ", req.body);
        await pool.query(sql, [req.body.username, req.body.email, req.body.firstname, req.body.lastname, req.body.sex, req.body.street, req.body.postal_code, req.body.city, req.body.country, req.body.uuid]);
        res.status(200).send(null);
    } catch (err) {
        next(err);
    }
});

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
router.post('/location/', async (req, res, next) => {
    console.log("Debug 0");
    console.log(req.body);

    try {
        console.log("Debug 1");

        const client = await pool.connect();
        const userResult = await client.query('SELECT * FROM "user" WHERE uuid = $1', [req.body.user_uuid]);

        console.log("Debug 2");

        if (userResult.rows.length > 0) {
            console.log("Debug 3");

            const user = userResult.rows[0];

            console.log("User: ", user.uuid, "Longitude: ", req.body.longitude, "Latitude: ", req.body.latitude, "Time: ", req.body.time);
            const locationResult = await client.query('INSERT INTO "location" (uuid, user_uuid, latitude, longitude) VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING *', [user.uuid, req.body.latitude, req.body.longitude]);

            if (locationResult.rows.length > 0) {
                const location = locationResult.rows[0];
                const locationReturn = new Location(location.uuid, location.user_id, location.latitude, location.longitude, location.time);
                res.status(200).send(locationReturn);
            } else {
                res.status(406).send(null);
            }
        } else {
            res.status(405).send(req.body.user_uuid);
        }

        client.release();
    } catch (err) {
        next(err);
    }
});

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
router.get('/locations/:id', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT "user".id, "user".uuid as uuuid, location.uuid as luuid, location.latitude as lat, location.longitude as lng, location.time as time FROM location, "user" WHERE "user".uuid = $1', [req.params.id]);

        const locationResult = result.rows.map(row => new Location(row.luuid, row.uuuid, row.lat, row.lng, row.time));
        res.status(200).send(locationResult);

        client.release();
    } catch (err) {
        res.status(500).send('server error 2345, please call zid');
    }
});