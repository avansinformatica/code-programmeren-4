//
// server.js
//
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var logger = require('morgan');
var routes_v1 = require('./api/routes_v1');
var routes_v2 = require('./api/routes_v2');
var auth_routes_v1 = require('./api/authentication.routes.v1');
var config = require('./config/config');
var db = require('./config/db');


var expressJWT = require('express-jwt');
// var jwt = require('jwt-simple');

var app = express();

// bodyParser zorgt dat we de body uit een request kunnen gebruiken,
// hierin zit de inhoud van een POST request.
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(expressJWT({ secret: config.secretkey })
    .unless({
        path: ['/api/v1/login']
    }));

// configureer de app
app.set('port', (process.env.PORT | config.webPort));
app.set('env', (process.env.ENV | 'development'))

// Installeer Morgan als logger
app.use(logger('dev'));

// Deze route is de 'preprocessor'.
// Hier gaan we later bv. testen of de gebruiker ingelogd is.
// next() zorgt ervoor dat we 'doorvallen' naar de volgende URL.
app.use('*', function(req, res, next) {
    // console.log('aangeroepen.');
    next();
});

// Installeer de routers die we gebruiken.
app.use('/api/v1', auth_routes_v1);
app.use('/api/v1', routes_v1);
app.use('/api/v2', routes_v2);

// Handle express-jwt errors
app.use(function(err, req, res, next) {
    // Logging: bekijk de inhoud van err
    console.dir(err);
    res.status(401).send({
        error: err.name,
        message: err.message,
        code: err.code,
        status: err.status
    });
});

// Fallback - als geen enkele andere route slaagt wordt deze uitgevoerd. 
app.use('*', function(req, res) {
    res.status(400);
    res.json({
        'error': 'Deze URL is niet beschikbaar.'
    });
});



// Installatie klaar; start de server.
app.listen(app.get('port'), function() {
    console.log('De server luistert op port ' + app.get('port'));
});

// Voor testen met mocha/chai moeten we de app exporteren.
module.exports = app;