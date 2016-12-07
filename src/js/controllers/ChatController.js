let ChatController = ($scope, $rootScope, $timeout, $location, SocketService) => {
	$scope.messages = [];
	$scope.message = '';
	$scope.name = '';
	$scope.invalidUser = false;
	$scope.showUsers = false;
	$scope.selectedUser = null;

	SocketService.on('new message', (data) => {
		$timeout(() => {
			$scope.messages.push(data);
		});
	});


	$scope.verifyUser = () => {
		if($scope.name !== null && $scope.name !== '') {
			SocketService.emit(
				'user:join',
				$scope.name,
				(data) => {
					$timeout(() => {
						if(!data) {
							$scope.invalidUser = true;
						} else {
							$rootScope.setUserName($scope.name);
						}
					}, 100);
				}
			);
		}
	};

	$scope.submitMsg = (e) => {
		if((e.type === 'keyup' && e.keyCode === 13 && !e.shiftKey) || e.type === 'submit') {
			e.preventDefault();
			SocketService.emit('send message', $scope.message);
			$scope.message = '';
		}
	}

	$scope.showHideUsers = () => {
		$scope.showUsers = !$scope.showUsers;
	};

	$scope.selectUser = (user) => {
		if(user !== $rootScope.getUserName()) {
			$scope.selectedUser = (user === $scope.selectedUser) ? null : user;
		}
	};
}

export default ChatController;