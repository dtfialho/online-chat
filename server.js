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

io.sockets.on('connection', function(socket) {
	socket.on('user:join', function(data, callback) {
		if(userNames.indexOf(data) != -1) {
			callback(false);
		} else {
			var msg = '<small><em>User <strong>' + data + '</strong> has joined the room.</em></small>';
			socket.userName = data;

			io.sockets.emit('new message', msg);
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
		var msg = '<small><em>User <strong>' + socket.userName + '</strong> has left the room.</em></small>';
		io.sockets.emit('new message', msg);
		userNames.splice(userNames.indexOf(socket.userName), 1);
		io.sockets.emit('usernames', userNames);
	});
});