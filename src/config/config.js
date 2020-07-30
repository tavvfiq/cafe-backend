const mySQL = require("mysql");

// console.log(typeofprocess.env.HOST);

const database = mySQL.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

database.connect((err) => {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = database;