//
// ./config/db.js
//
// Configuratiebestand voor MySql database.
//
var mysql = require('mysql');
var config = require('../config/config');

var connection = mysql.createConnection({
  host     : process.env.DB_HOST || config.dbHost,
  user     : process.env.DB_USER || config.dbUser,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE || config.dbDatabase
});

connection.connect(function(error) {
	if (error) {
		console.error("Error connecting to database " + config.dbDatabase + " on " + config.dbHost + ": " + error.message);
		return;
	} else {
		console.log("Connected to MySQL database " + config.dbDatabase + " on " + config.dbHost);
	}
});

module.exports = connection;