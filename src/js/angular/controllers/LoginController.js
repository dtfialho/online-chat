let LoginController = ($scope, $rootScope, $timeout, $location, SocketService) => {
	$scope.titulo = "Esse é um fucking título!";
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
						$timeout(() => {
							$location.path('/chat');
						});
					}
				}
			);
		}
	};
}

export default LoginController;