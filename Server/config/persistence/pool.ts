import { Pool } from 'pg';
import config from 'config';

const host:string = config.get<string>('dbConfig.host');
const user:string = config.get<string>('dbConfig.user');
const password:string = config.get<string>('dbConfig.password');
const database:string = config.get<string>('dbConfig.database');
const connectionLimit:number = config.get<number>('dbConfig.connectionLimit');

export const pool = new Pool({
    max: connectionLimit,
    host: host,
    user: user,
    password: password,
    database: database
});