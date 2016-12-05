let LoginController = ($scope, $rootScope, $timeout, $location, SocketService) => {
	$scope.name = '';
	$scope.invalidUser = false;

	$scope.verifyUser = () => {
		if($scope.name !== null && $scope.name !== '') {
			SocketService.emit(
				'user:join',
				$scope.name,
				(data) => {
					if(!data) {
						$timeout(() => {
							$scope.invalidUser = true;
						}, 100);
					} else {
						$rootScope.setUserName($scope.name);
						console.log('lorem');
						$timeout(() => {
							$location.path('/chat');
						}, 100);
					}
				}
			);
		}
	};
}

export default LoginController;