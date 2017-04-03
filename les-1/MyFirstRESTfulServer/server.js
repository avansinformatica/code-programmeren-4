
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
	response.send('nodejs server - zie <a href="/api/hello">/api/hello</a>(GET en POST), <a href="/api/jsonresult">/api/jsonresult</a> en <a href="http://localhost:3000/api/output?first_name=jouw%20voornaam&last_name=jouw%20achternaam">deze URL</a>.');
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
	// console.dir geeft gestructureerdere uitvoer dan console.log.
	console.dir(req.body);
	res.send('Hello POST');
})

// 
// Een grotere lijst met data - afkomstig van randomuser.me
//
var jsonResult = { result: [
{
	"gender": "female",
	"name": {
		"title": "mrs",
		"first": "carolina",
		"last": "hernandez"
	},
	"location": {
		"street": "9617 calle de argumosa",
		"city": "castellón de la plana",
		"state": "ceuta",
		"postcode": 45605
	},
	"email": "carolina.hernandez@example.com",
	"login": {
		"username": "beautifultiger708"
	},
	"dob": "1988-01-20 03:11:28",
	"registered": "2004-04-24 18:03:13",
	"phone": "974-802-686",
	"cell": "608-005-794",
	"id": {
		"name": "DNI",
		"value": "62449056-L"
	}
},{
	"gender": "female",
	"name": {
		"title": "ms",
		"first": "aubree",
		"last": "ginnish"
	},
	"location": {
		"street": "3607 brock rd",
		"city": "odessa",
		"state": "nunavut",
		"postcode": 88413
	},
	"email": "aubree.ginnish@example.com",
	"login": {
		"username": "lazycat367",
		"password": "freefree"
	},
	"dob": "1957-07-06 04:35:50",
	"registered": "2014-10-17 03:43:27",
	"phone": "819-096-6163",
	"cell": "817-176-2290",
	"id": {
		"name": "",
		"value": null
	}
},{
	"gender": "female",
	"name": {
		"title": "madame",
		"first": "eva",
		"last": "faure"
	},
	"email": "eva.faure@example.com",
	"login": {
		"username": "blacksnake958",
		"salt": "l0Uw5z5o",
		"md5": "e83ffee7a9c4a8db88f8cc92dc218b01",
		"sha1": "9c5f9619aeede4ad4d51731d844463875ec61058",
		"sha256": "40a8f2d2cb20e1824ea256520d4a026f577770331eaa2e98a8ff0be15592f2e5"
	},
	"dob": "1962-01-15 07:15:11",
	"registered": "2013-12-14 10:53:21",
	"phone": "(475)-192-3738",
	"cell": "(311)-398-2970",
	"id": {
		"name": "AVS",
		"value": "756.AQVR.MINO.41"
	},
	"picture": {
		"large": "https://randomuser.me/api/portraits/women/23.jpg",
		"medium": "https://randomuser.me/api/portraits/med/women/23.jpg",
		"thumbnail": "https://randomuser.me/api/portraits/thumb/women/23.jpg"
	},
	"nat": "CH"
}
]};

// Endpoint om onze randomuser lijst te tonen.
app.get('/api/jsonresult', function (req, res) {
   // res.end(JSON.stringify(jsonResult));
   res.json(jsonResult);
});

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
