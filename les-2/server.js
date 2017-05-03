var http = require('http');
var express = require('express');
var routes_v1 = require('./api/routes_v1');
var routes_v2 = require('./api/routes_v2');

var app = express();

app.use('/api/v1', routes_v1);
app.use('/api/v2', routes_v2);

app.listen(process.env.PORT || 3000, function(){
	console.log('De server luistert op port 3000');	
});

module.exports = app;
