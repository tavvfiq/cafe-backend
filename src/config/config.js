const mySQL = require("mysql");

// console.log(typeofprocess.env.HOST);

const database = mySQL.createConnection({
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'bdd47d68e17522',
  database: 'heroku_7a9d15006fefd4b',
  password: 'cfb153ef',
  multipleStatements: true
});

database.connect((err) => {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = database;