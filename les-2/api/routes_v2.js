
var express = require('express');
var router = express.Router();

var mijnObject = { 
	message: 'Hello World Versie Twee!',
};


router.get('*', function(req, res, next){
	console.log('aangeroepen.');
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

// Fallback - als andere routes 
router.get('*', function(req, res){
	res.status(400);
	res.json({
		'error' : 'Deze methode is nog niet beschikbaar.'
	});
});

module.exports = router;