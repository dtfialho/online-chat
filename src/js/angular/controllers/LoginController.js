let LoginController = ($scope, $rootScope, $timeout, SocketService) => {
	$scope.titulo = "Esse é um fucking título!";
	$scope.name = '';
	$scope.invalidUser = false;

	SocketService.on('usernames', (data) => {
		console.log(data);
	});

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
						$timeout(() => {
							$scope.invalidUser = false;
						}, 100);
						$rootScope.setUserName($scope.name);
					}
				}
			);
		}
	};
}

export default LoginController;