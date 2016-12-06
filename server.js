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
	socket.on('user:join', function(data, callback) {
		if(data in userNames) {
			callback(false);
		} else {
			socket.userName = data;
			userNames.push(data);
			io.sockets.emit('usernames', userNames);
			callback(true);
		}
	});

	socket.on('send message', function(data) {
		var msg = '<strong>' + socket.userName + '</strong>: ' + data;
		io.sockets.emit('new message', msg);
	});

	socket.on('disconnect', function(data) {
		if(!socket.userName) return;
		userNames.splice(userNames.indexOf(socket.userName), 1);
		io.sockets.emit('usernames', userNames);
	});
});