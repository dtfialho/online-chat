let Socket = ($rootScope) => {
	let socket = io.connect();

	return {
		on: (eventName, callback) => {
			socket.on(eventName, () => {
				var args = arguments;
				$rootScope.$apply(() => {
					callback.apply(socket, args);
				});
			});
		},
		emit: (eventName, data, callback) => {
			socket.emit(eventName, data, () => {
				var args = arguments;
				$rootScope.$apply(() => {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		}
	};
};

export default Socket;