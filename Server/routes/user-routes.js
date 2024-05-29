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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = __importStar(require("express"));
const db_1 = require("../config/db");
const user_1 = require("../model/user");
exports.userRouter = express.Router();
exports.userRouter.post('/login/', (req, res, next) => {
    let sql = "Select * FROM `user` where user.username="
        + db_1.pool.escape(req.body.username) + " && user.password=SHA1("
        + db_1.pool.escape(req.body.password) + ")";
    db_1.pool.query(sql, (err, rows) => {
        console.log(sql);
        if (err)
            next(err);
        let data;
        console.log(JSON.stringify(rows));
        if (rows.length > 0) {
            data = new user_1.User(rows[0].uuid, rows[0].username, rows[0].email, "", rows[0].is_admin, rows[0].firstname, rows[0].lastname, rows[0].sex, rows[0].address, rows[0].postalcode, rows[0].city, rows[0].country);
            console.log("-><<<< " + JSON.stringify(data));
            res.status(200).send(data);
        }
        else
            res.status(404).end();
    });
});
exports.userRouter.post('/register/', (req, res, next) => {
    let sql = "INSERT INTO  user  (uuid, username, password, email) VALUES (uuid()," + db_1.pool.escape(req.body.username) +
        ", SHA1(" + db_1.pool.escape(req.body.password) + "), " + db_1.pool.escape(req.body.email) + ");";
    try {
        db_1.pool.query(sql, (err, rows) => {
            console.log(sql);
            if (err)
                next(err);
            else {
                if (rows.affectedRows > 0) // ???
                 {
                    db_1.pool.query('SELECT * FROM user WHERE id = ' + rows.insertId, (err, rws) => {
                        //console.log(";;;;;;;;;;;;" + JSON.stringify(rws));
                        if (err)
                            next(err);
                        else if (rws.length > 0) {
                            let usr = { uuid: rws[0].uuid, username: rws[0].username, email: rws[0].email };
                            console.log("::::::::::::::::::" + JSON.stringify(usr));
                            res.status(200).send(usr);
                        }
                        else
                            res.status(404).send(null);
                    });
                }
                else
                    res.status(404).send("" + 0);
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.userRouter.put('/update/', (req, res, next) => {
    let sql = "UPDATE user SET firstname = " + db_1.pool.escape(req.body.firstName)
        + ", lastname = " + db_1.pool.escape(req.body.lastName)
        + ", sex = " + db_1.pool.escape(req.body.sex)
        + ", address = " + db_1.pool.escape(req.body.address)
        + ", postalcode = " + db_1.pool.escape(req.body.postalCode)
        + ", city = " + db_1.pool.escape(req.body.city)
        + ", country = " + db_1.pool.escape(req.body.country)
        + " WHERE id = " + db_1.pool.escape(req.body.id);
    console.log("_________   " + sql);
    db_1.pool.query(sql, (err) => {
        if (err)
            next(err);
        res.status(200).send(null);
    });
});
