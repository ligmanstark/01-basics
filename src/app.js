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
		response.status = 400;
		response.statusMessage = 'Error';
		response.header = 'Content-Type: text/plain';
		console.log(`Enter a name`);
		response.write(`Enter a name`);
		response.end();
		return;
	}
	if (helloValue !== null) {
		response.status = 200;
		response.statusMessage = 'OK';
		response.header = 'Content-Type: text/plain';
		console.log(`Hello value is: ${helloValue}`);
		response.write(`Hello, ${helloValue}`);
		response.end();
		return;
	}

	if (request.url === '/users') {
		response.status = 200;
		response.statusMessage = 'OK';
		response.header = 'Content-Type: application/json';
		response.write(getUsers());
		response.end();

		return;
	}
	if (request.url !== '/') {
		response.status = 500;
		response.statusMessage = 'Error';
		response.header = 'Content-Type: text/plain';
		response.write('Error');
		response.end();
		return;
	}

	response.status = 200;
	response.statusMessage = 'OK';
	response.header = 'Content-Type: text/plain';
	response.write('hello');
	response.end();
});

server.listen(3003, () => {
	console.log('Сервер запущен по адресу http://127.0.0.1:3003');
});
