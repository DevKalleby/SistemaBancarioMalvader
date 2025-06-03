const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });
console.log('Usuário do banco:', process.env.DB_USER);


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
