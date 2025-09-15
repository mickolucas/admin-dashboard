// backend/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'lucas1234',
  database: process.env.PGDATABASE || 'e_ride',
});

pool.on('error', (err) => {
  console.error('Unexpected PG client error', err);
});

module.exports = pool;
