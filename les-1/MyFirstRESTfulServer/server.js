
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

// maak een express applicatie
var app = express();
// var router = express.Router();

// bodyParser zorgt dat we de body uit een request kunnen gebruiken,
// hierin zit de inhoud van een POST request.
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// configureer de app
app.set('port', (process.env.PORT | 3000));
app.set('env', (process.env.PORT | 'development'))
app.use(logger('dev'));

//
// Routes handelen de mogelijke URL requests af
// Route voor GET request op http://localhost:3000/
app.get('/', function (request, response) {
	response.send('nodejs server - zie <a href="/api/hello">/api/hello</a>.');
});

//
// Route voor GET request op http://localhost:3000/api/hello
//
hello_info = function(request, response){
    response.json({
        'message': 'Hello World!',
        'string': 'Hier kun je meer info zetten',
        'array': [
            {'key': 'value'}, 
            {'key': 'value', 'andere_key': 'hier weer een waarde'}],
        'object': { 'nog een key': 'nog een value'},
        'nog_een_array': ['een', 'twee drie', 'vier 5 zes'],
        'boolean': true,
        'int': 6
    })
}
app.get('/api/hello', hello_info);

//
// Route voor POST request op http://localhost:3000/api/hello
//
app.post('/api/hello', function (req, res) {
	console.dir(req.body);
	res.send('Hello POST');
})

//
// Deze route leest request parameters uit de URL
// De URL heeft dan de vorm: 
// http://localhost:3000/api/output?first_name=jouw%20voornaam&last_name=jouw%20achternaam
//
app.get('/api/output', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name: req.query.first_name,
      last_name:  req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});

// wacht op inkomend verkeer
app.listen(app.get('port'), function(){
	console.log("Server luistert op port %s", app.get('port'))
})
