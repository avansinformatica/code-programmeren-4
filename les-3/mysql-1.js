var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : '< MySQL username >',
  password : '< MySQL password >',
  database : '<your database name>'
});

connection.connect();

connection.query('SELECT * from < table name >', function(error, rows, fields) {
  if (error)
    console.log('Error while performing query: ' + error);
  else
    console.log('The solution is: ' + rows);
});

connection.end();

