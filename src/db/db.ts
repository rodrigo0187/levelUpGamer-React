import * as mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Fix for ETIMEDOUT: Force 127.0.0.1 instead of localhost
export const db = mysql.createPool({
  host: process.env.DB_HOST === 'localhost' ? '127.0.0.1' : (process.env.DB_HOST || '127.0.0.1'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'levelupgamer',
  port: Number(process.env.DB_PORT?.toString().replace(/[^0-9]/g, '') || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
