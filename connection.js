const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "claudio",
  password: "2VMx3VqOO5gIvPSF",
  database: "banco_mysql",
  multipleStatements: true
});

mysqlConnection.connect((err)=>{
  if (!err) {
    console.log("Connected!")
  } else {
    console.log("Connection Failed!")
  }
});

module.exports = mysqlConnection;
