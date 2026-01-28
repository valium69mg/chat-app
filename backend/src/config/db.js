import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER || 'your_db_user',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'your_db_name',
  password: process.env.PGPASSWORD || 'your_db_password',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  max: 10,
  idleTimeoutMillis: 30000, 
});

export async function getConnection() {
  const client = await pool.connect();
  return client;
}

export { pool };
