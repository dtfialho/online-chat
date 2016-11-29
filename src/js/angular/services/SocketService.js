let Socket = ($rootScope) => {
	let socket = io.connect();

	return {
		on: (eventName, callback) => {
			socket.on(eventName, callback);
		},
		emit: (eventName, data, callback) => {
			socket.emit(eventName, data, (res) => {
				if (callback) {
					callback(res);
				}
			})
		}
	};
};

export default Socket;