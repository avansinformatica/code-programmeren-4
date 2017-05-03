
var express = require('express');
var routes = express.Router();

var mijnObject = { 
	mijntekst: 'Hello World!',
	label: "Nog meer tekst",
	mijnarray: [ "tekst", "nog meer tekst", 2 ],
	mijnobject: {
		mijnlabel: 'mijntekst',
		getal: 4
	}
};

routes.get('/hello', function(req, res){
	res.contentType('application/json');
	res.status(200);
	res.json(mijnObject);
});

routes.get('/goodbye', function(req, res){
	res.contentType('application/json');
	res.status(200);
	res.json({ 'tekst': 'Goodbye!'});
});

module.exports = routes;