let LoginController = ($scope, $rootScope, SocketService) => {
	$scope.titulo = "Esse é um fucking título!";
	$scope.name = '';

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
						console.log('erro');
					} else {
						$rootScope.setUserName($scope.name);
					}
				}
			);
		}
	};
}

export default LoginController;