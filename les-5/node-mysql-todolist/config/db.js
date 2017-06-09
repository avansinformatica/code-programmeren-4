//
// ./config/db.js
//
// Configuratiebestand voor MySql database.
//
var mysql = require('mysql');
var config = require('../config/config');

var connectionSettings = {
    host: process.env.DB_HOST || config.dbHost,
    user: process.env.DB_USER || config.dbUser,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || config.dbDatabase,
    debug: false
}

var connection = mysql.createConnection(connectionSettings);

connection.connect(function(error) {
    if (error) {
        console.error("Error connecting to database " + connectionSettings.database + " on " + connectionSettings.host + ": " + error.message);
        return;
    } else {
        console.log("Connected to database " + connectionSettings.database + " on " + connectionSettings.host);
    }
});

module.exports = connection;