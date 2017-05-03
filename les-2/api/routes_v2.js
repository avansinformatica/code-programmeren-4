
var express = require('express');
var routes = express.Router();

var mijnObject = { 
	message: 'Hello World Versie Twee!',
};

routes.get('/hello', function(req, res){
	res.contentType('application/json');
	res.status(200);
	res.json(mijnObject);
});

routes.get('/goodbye', function(req, res){
	res.contentType('application/json');
	res.status(200);
	res.json({ 'tekst': 'Goodbye Versie 2!'});
});

module.exports = routes;