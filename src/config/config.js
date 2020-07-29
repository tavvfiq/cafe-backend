const mySQL = require("mysql");

const database = mySQL.createConnection({
  host: "localhost",
  user: "root",
  database: "backend_expressjs",
  password: "",
});

database.connect((err) => {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = database;