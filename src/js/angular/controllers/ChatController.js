let ChatController = ($scope, $rootScope, $timeout, $location, SocketService) => {
	$scope.messages = [];
	$scope.message = '';

	SocketService.on('new message', (data) => {
		$timeout(() => {
			$scope.messages.push(data);
		});
	});

	$scope.submitMsg = (e) => {
		if((e.type === 'keyup' && e.keyCode === 13 && !e.shiftKey) || e.type === 'submit') {
			e.preventDefault();
			SocketService.emit('send message', $scope.message);
			$scope.message = '';
		}
	}

	$rootScope.setUserName();

	if($rootScope.userName === '') {
		$location.path('/');
	}
}

export default ChatController;