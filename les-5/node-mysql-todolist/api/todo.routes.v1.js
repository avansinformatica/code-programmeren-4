//
// ./api/todo.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var db = require('../config/db');

//
// Geef een lijst van alle todos. Dat kunnen er veel zijn.
//
routes.get('/todos', function(req, res) {
    res.contentType('application/json');

    db.query('SELECT * FROM todos', function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//
// Retourneer één specifieke todos. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/todos/23
//
routes.get('/todos/:id', function(req, res) {

    var todosId = req.params.id;

    res.contentType('application/json');

    db.query('SELECT * FROM todos WHERE ID=?', [todosId], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//
// Voeg een todo toe. De nieuwe info wordt gestuurd via de body van de request message.
// Vorm van de URL: POST http://hostname:3000/api/v1/todos
//
routes.post('/todos', function(req, res) {

    var todos = req.body;
    var query = {
        sql: 'INSERT INTO `todos`(`Titel`, `Beschrijving`) VALUES (?, ?)',
        values: [todos.Titel, todos.Beschrijving],
        timeout: 2000 // 2secs
    };

    console.dir(todos);
    console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//
// Wijzig een bestaande todo. De nieuwe info wordt gestuurd via de body van de request message.
// Er zijn twee manieren om de id van de todos mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: PUT http://hostname:3000/api/v1/todos/23
//
routes.put('/todos/:id', function(req, res) {

    var todos = req.body;
    var ID = req.params.id;
    var query = {
        sql: 'UPDATE `todos` SET Title=? , Beschrijving=? WHERE ID=?',
        values: [todos.Title, todos.Beschrijving, ID],
        timeout: 2000 // 2secs
    };

    console.dir(todos);
    console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//
// Verwijder een bestaande todo.
// Er zijn twee manieren om de id van de todos mee te geven: via de request parameters (doen we hier)
// of als property in de request body.
// 
// Vorm van de URL: DELETE http://hostname:3000/api/v1/todos/23
//
routes.delete('/todos/:id', function(req, res) {

    var ID = req.params.id;
    var query = {
        sql: 'DELETE FROM `todos` WHERE ID=?',
        values: [ID],
        timeout: 2000 // 2secs
    };

    console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

module.exports = routes;