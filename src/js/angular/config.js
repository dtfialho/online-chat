let Config = ($routeProvider) => {
	$routeProvider.when('/', {
		controller: 'MainController',
		templateUrl: 'views/home.html'
	})
	.when('/chat', {
		controller: 'MainController',
		templateUrl: 'views/chat.html'
	})
	.otherwise({
		redirectTo: '/'
	});
};

let Run = ($rootScope, LocalStorageService) => {
	$rootScope.userName = '';
	
	$rootScope.getUserName = () => {
		return $rootScope.userName;
	};

	$rootScope.setUserName = (name) => {
		if(!name) {
			if(LocalStorageService.exists('userName')) {
				$rootScope.userName = LocalStorageService.get('userName');
			}
		} else {
			LocalStorageService.set('userName', name);
		}
	};
};

export { Config, Run };