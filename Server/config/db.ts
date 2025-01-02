import { Pool } from 'pg';
import config from 'config';

const connectionLimit:number = config.get<number>('dbConfig.connectionLimit');
const host:string = config.get<string>('dbConfig.host');
const user:string = config.get<string>('dbConfig.user');
const password:string = config.get<string>('dbConfig.pwd');
const database:string = config.get<string>('dbConfig.database');

export const pool = new Pool({
    max: connectionLimit,
    host: host,
    user: user,
    password: password,
    database: database
});