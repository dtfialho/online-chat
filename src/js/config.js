let Config = ($routeProvider, $locationProvider) => {
	$routeProvider.when('/', {
		controller: 'ChatController',
		templateUrl: 'views/chat.html'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
};

let Run = ($rootScope, $location, SocketService) => {
	$rootScope.userName = '';
	$rootScope.users = [];
	
	SocketService.on('usernames', (data) => {
		$rootScope.users = data;
	});

	$rootScope.getUserName = () => {
		return $rootScope.userName;
	};

	$rootScope.setUserName = (name) => {
		$rootScope.userName = name;
	};
};

export { Config, Run };