let Config = ($routeProvider) => {
	$routeProvider.when('/', {
		controller: 'LoginController',
		templateUrl: 'views/home.html'
	})
	.when('/chat', {
		controller: 'ChatController',
		templateUrl: 'views/chat.html'
	})
	.otherwise({
		redirectTo: '/'
	});
};

let Run = ($rootScope, $window, $location, SocketService) => {
	$rootScope.userName = '';
	$rootScope.users = [];

	$rootScope.$on('$routeChangeStart', () => {
		if($rootScope.getUserName() === '' && ($window.localStorage.getItem('userName') === '' || $window.localStorage.getItem('userName') === undefined || $window.localStorage.getItem('userName') === null)) {
			$location.path('/');
		}
    });
	
	SocketService.on('usernames', (data) => {
		$rootScope.users = data;
	});

	$rootScope.getUserName = () => {
		return $rootScope.userName;
	};

	$rootScope.setUserName = (name) => {
		if(!name) {
			if($window.localStorage.getItem('userName') !== '' 
				&& $window.localStorage.getItem('userName') !== undefined 
				&& $window.localStorage.getItem('userName') !== null) {
				$rootScope.userName = $window.localStorage.getItem('userName');
			}
		} else {
			if(!$window.localStorage.getItem('userName')) {
				$window.localStorage.setItem('userName', name);
			} else {
				$window.localStorage.userName = name;
			}
		}
	};
};

export { Config, Run };