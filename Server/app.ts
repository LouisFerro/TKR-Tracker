import express from 'express';
import cors from 'cors';
import config from 'config';
import { setupSwagger } from './config/swagger';

import { router } from "./router/router";
import * as https from "node:https";
import * as fs from "node:fs";

const app = express();
const port: number = config.get<number>('appConfig.port');
const origin:string = config.get<string>('appConfig.origin');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: origin}));

app.use('/users', router);

app.use(errorHandler);

setupSwagger(app);

const server = https.createServer({
    key: fs.readFileSync('./mkcert/localhost+3-key.pem'),
    cert: fs.readFileSync('./mkcert/localhost+3.pem'),
}, app);

server.listen(port, "127.0.0.1", () => {
    console.log(`Example app listening on port ${port}`)});

function errorHandler(err:any, req:any, res:any, next:any)  {
    if (res.headersSent) {
        return next(err);
    }

    console.error(err);
    res.status(500).send('Something broke!' + err);
}