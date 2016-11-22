let MainController = ($scope, $rootScope, SocketService) => {
	$scope.titulo = "Esse é um fucking título!";

	$scope.verifyUser = () => {
		if($scope.name !== null && $scope.name !== '') {
		}
	};
}

export default MainController;