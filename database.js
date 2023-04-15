const { Pool } = require('pg');

const pool = new Pool({
  user: 'netuser',
  host: 'localhost',
  database: 'netdb',
  password: 'netpass',
  port: 5432,
});

module.exports = pool;