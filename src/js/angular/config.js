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

let Run = ($rootScope) => {
	$rootScope.userName = 'Kenshin';
};

export { Config, Run };