const http = require('http');
const { URL } = require('url');
const getUsers = require('./modules/users');
const server = http.createServer((request, response) => {
	const url = new URL(request.url, 'http://127.0.0.1:3003');
	const helloValue = url.searchParams.get('hello');
	console.log(helloValue);
	console.log(request.url);
	console.log(url);

	
	if (request.url === '/?hello=') {
		response.statusCode = 400;
		response.statusMessage = 'Error';
		response.writeHead(400,{'Content-Type': 'text/plain'})
		console.log(`Enter a name`);
		response.write(`Enter a name`);
		response.end();
		return;
	}
	if (helloValue !== null) {
		response.statusCode = 200;
		response.statusMessage = 'OK';
		response.writeHead(200,{'Content-Type': 'text/plain'})
		console.log(`Hello value is: ${helloValue}`);
		response.write(`Hello, ${helloValue}`);
		response.end();
		return;
	}

	if (request.url === '/users') {
		response.statusCode = 200;
		response.statusMessage = 'OK';
		response.writeHead(200,{'Content-Type': 'text/plain'})
		response.write(getUsers());
		response.end();

		return;
	}
	if (request.url !== '/') {
		response.statusCode = 500;
		response.statusMessage = 'Error';
		response.writeHead(500,{'Content-Type': 'text/plain'})
		response.write('Error');
		response.end();
		return;
	}

	response.statusCode = 200;
	response.statusMessage = 'OK';
	response.writeHead(200,{'Content-Type': 'text/plain'})
	response.write('hello');
	response.end();
});

server.listen(3003, () => {
	console.log('Сервер запущен по адресу http://127.0.0.1:3003');
});
