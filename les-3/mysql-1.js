var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'node_mysql_user',
  password : process.env.DB_PASSWORD,
  database : 'sakila'
});

connection.connect();

connection.query('SELECT * from actors LIMIT 3', function(error, rows, fields) {
  if (error)
    console.log('' + error);
  else
    console.dir(rows);
});

connection.end();

