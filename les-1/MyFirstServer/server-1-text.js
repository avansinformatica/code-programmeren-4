var http = require('http');

function onRequest(request, response){
	console.log('Er was een request.');
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('Hello World!');
	response.end();
}

http.createServer(onRequest).listen(3000);

console.log('De server luistert op port 3000');



