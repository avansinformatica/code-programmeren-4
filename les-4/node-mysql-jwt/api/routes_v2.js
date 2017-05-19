//
// ./api/routes_v2.js
//
var express = require('express');
var router = express.Router();

var mijnObject = { 
	message: 'Hello World Versie Twee!',
};

// Deze route is de 'preprocessor'.
// Hier gaan we later bv. testen of de gebruiker 
// ingelogd is.
// next() zorgt ervoor dat we 'doorvallen' naar de volgende URL.
router.get('*', function(req, res, next){
	// console.log('aangeroepen.');
	next();
});

router.get('/hello', function(req, res){
	res.contentType('application/json');
	res.status(200);
	res.json(mijnObject);
});

router.get('/goodbye', function(req, res){
	res.contentType('application/json');
	res.status(200);
	res.json({ 'tekst': 'Goodbye Versie 2!'});
});

// Hiermee maken we onze router zichtbaar voor andere bestanden. 
module.exports = router;