
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('*', function(req, res, next){
	console.log('aangeroepen.');
	next();
});

router.get('/hello', function(req, res){
	res.status(200);
	res.json({
		'message' : 'Hello World versie 2!'
	});
});

// Fallback
router.get('*', function(req, res){
	res.status(400);
	res.json({
		'error' : 'Deze methode is nog niet beschikbaar.'
	});
});


module.exports = router;