import jwt from 'jsonwebtoken';
import fs from "node:fs";
import path from "node:path";

export const privateKey = fs.readFileSync(path.resolve(__dirname, '../../config/authentication/localhost+3-key.pem'), 'utf8');
export const publicKey = fs.readFileSync(path.resolve(__dirname, '../../config/authentication/localhost+3.pem'), 'utf8');

export function validateToken(req: any, res: any, next: any) {
    const authenticationHeader = req.headers.authorization;
    if (authenticationHeader && authenticationHeader.startsWith('Bearer ')) {
        const token = authenticationHeader.split(' ')[1];

        jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, user) => {
            if (err) return res.status(403).send('Invalid token');
            req.user = user;
            next();
        });
    } else {
        res.status(401).send('Authorization header missing');
    }
}