const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'mysql742.umbler.com',
  port     :  '41890',
  user     : 'admin001',   
  password : 'pia2020/1',
  database : 'coinflow'
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