var http = require('http');

http.createServer(function(request, response){
	console.log('Er was een request.');
	response.writeHead(200, {'Content-Type': 'application/json'});

	var exampleArray = ["item1", "item2"];
	var exampleObject = { 
		item1: "item1val", 
		item2: "item2val" 
	};
	var example = JSON.stringify({ 
		anObject: exampleObject, 
		anArray: exampleArray, 
		another: "item"
	});
	response.end(example);
}).listen(3000);

console.log('De server luistert op port 3000');



