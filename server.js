var express = require('express'),
	app     = express(),
	server  = require('http').createServer(app),
	io      = require('socket.io').listen(server),
	path    = require('path');

var users = {};

app.use(express.static('build'));

server.listen(9090);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.sockets.on('connection', function(socket) {
	socket.on('user:join', function(data, callback) {
		if(data in users) {
			callback(false);
		} else {
			var msg = '<small><em>User <strong>' + data + '</strong> has joined the room.</em></small>';
			socket.userName = data;

			io.sockets.emit('new message', msg);
			users[socket.userName] = socket;
			io.sockets.emit('usernames', Object.keys(users));
			callback(true);
		}
	});

	socket.on('send message', function(data) {
		var msg = '';

		if(data.user !== null) {
			msg = '<small><strong>' + socket.userName + ' sent you a private message:</strong></small><br>' + data.msg;
			users[data.user].emit('private message', msg);
			msg = '<small><strong>You sent a message to ' + data.user + '</strong></small><br>' + data.msg;
			users[socket.userName].emit('private message', msg);
		} else {
			msg = '<strong>' + socket.userName + '</strong>:<br>' + data.msg;
			io.sockets.emit('new message', msg);
		}

	});

	socket.on('disconnect', function(data) {
		if(!socket.userName) return;
		var msg = '<small><em>User <strong>' + socket.userName + '</strong> has left the room.</em></small>';
		io.sockets.emit('new message', msg);
		delete users[socket.userName];
		io.sockets.emit('usernames', Object.keys(users));
	});
});