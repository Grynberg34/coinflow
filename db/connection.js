const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  port     :  process.env.DB_PORT,
  user     : process.env.DB_USER,   
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
})

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

setInterval(function () {
  connection.query('SELECT 1');
}, 5000);

module.exports = connection;