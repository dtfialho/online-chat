var express = require('express'),
	app     = express(),
	server  = require('http').createServer(app),
	io      = require('socket.io').listen(server),
	path    = require('path');

var userNames = [];

app.use(express.static('build'));

server.listen(9090);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/angular', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'angular-test.html'));
});

io.sockets.on('connection', function(socket) {
	socket.on('new user', function(data, callback) {
		if(userNames.indexOf(data) != -1) {
			callback(false);
		} else {
			socket.userName = data;
			userNames.push(data);
			io.sockets.emit('usernames', userNames);
		}
	});

	socket.on('send message', function(data) {
		io.sockets.emit('new message', data);
	});
});