var http = require('http');
var express = require('express');
var logger = require('morgan');
var config = require('./config.json');
var routes_apiv2 = require('./api/api-v2');

var app = express();

app.use(logger('dev'));
app.set('PORT', config.webPort);

var port = process.env.PORT || app.get('PORT');

app.get('/api/v1/', function(request, response, next){

	response.contentType('application/json');
	var json = { 
		mijntekst: 'Hello World!',
		label: "Nog meer tekst",
		mijnarray: [ "tekst", "nog meer tekst", 2 ],
		mijnobject: {
			mijnlabel: 'mijntekst',
			getal: 4
		}
	};
	response.json(json);
});

app.get('/api/v1/hello', function(request, response, next){

	response.contentType('application/json');
	var json = { 
		mijntekst: 'Hello World!',
	};
	response.json(json);
});


app.use('/api/v2', routes_apiv2);

app.listen(port, function(){
	console.log('De server luistert op port ' + port);
});

module.exports = app;