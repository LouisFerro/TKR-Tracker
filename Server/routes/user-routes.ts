import * as express from 'express';

import {pool} from "../config/db";
import {User} from "../model/user";

export const userRouter = express.Router();

userRouter.post('/login/',  (req, res, next) =>{
    let sql = "Select * FROM `user` where user.username="
        + pool.escape(req.body.username) + " && user.password=SHA1("
        + pool.escape(req.body.password) + ")";
    pool.query(sql,  (err, rows) => {
        console.log(sql);
        if(err) next(err);
        let data:User | undefined;
        console.log(JSON.stringify(rows));
        if (rows.length > 0) { data = new User(rows[0].uuid,rows[0].username,rows[0].email,"",rows[0].is_admin,
            rows[0].firstname,rows[0].lastname,rows[0].sex,rows[0].address,rows[0].postalcode,rows[0].city,rows[0].country);
            console.log("-><<<< " + JSON.stringify(data));
            res.status(200).send(data);}
        else
            res.status(404).end();
    })
})
userRouter.post('/register/',  (req, res, next) =>{
    let sql = "INSERT INTO  user  (uuid, username, password, email) VALUES (uuid()," + pool.escape(req.body.username) +
        ", SHA1(" + pool.escape(req.body.password) + "), " + pool.escape(req.body.email) + ");"
    try {
        pool.query(sql, (err, rows) => {
            console.log(sql);
            if(err) next(err);
            else {
                if (rows.affectedRows > 0)  // ???
                {
                    pool.query('SELECT * FROM user WHERE id = ' + rows.insertId , (err, rws) => {
                        //console.log(";;;;;;;;;;;;" + JSON.stringify(rws));
                        if (err) next(err);
                        else if (rws.length > 0) {
                            let usr = {uuid: rws[0].uuid, username:rws[0].username, email:rws[0].email};
                            console.log("::::::::::::::::::" + JSON.stringify(usr));
                            res.status(200).send(usr);
                        }
                        else res.status(404).send(null);
                    })
                }
                else res.status(404).send(""+0);
            }
        })
    } catch(err) {
        next(err);
    }
})
userRouter.put('/update/', (req,res,next) => {
    let sql = "UPDATE user SET firstname = " + pool.escape(req.body.firstName)
        + ", lastname = " + pool.escape(req.body.lastName)
        + ", sex = " + pool.escape(req.body.sex)
        + ", address = " + pool.escape(req.body.address)
        + ", postalcode = " + pool.escape(req.body.postalCode)
        + ", city = " + pool.escape(req.body.city)
        + ", country = " + pool.escape(req.body.country)
        + " WHERE id = " + pool.escape(req.body.id);
    console.log("_________   " + sql);
    pool.query(sql,  (err) => {
        if(err) next(err);
        res.status(200).send(null);
    })
});
