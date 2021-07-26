const { Pool, Client } = require('pg');
const results = require('dotenv').config();
// if(results.error) console.log(results.error)
// else console.log(results.parsed);

// postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
// const pgConfig = { 
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   pgPort: process.env.PG_PORT
// }

// let conn = `postgres://${pgConfig.user}:${pgConfig.host}@${pgConfig.database}:${pgConfig.pgPort}/${pgConfig.password}`;

// database...
// run cat .env in git bash to get postgres config
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // connectionString: conn,
  // ssl: false,
  // max: 20,
  //   idleTimeoutMillis: 30000,
  //   connectionTimeoutMillis: 2000,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: function(text, values, cb) {
     pool.connect(function(err, client, done) {
       client.query(text, values, function(err, result) {
         done();
         cb(err, result);
       })
     });
  }
}