(function () {
	'use strict';
	
	
	var app = angular.module('app', [
		'app.account',
		'ui.router'
	]);
	
	
	app.config([
		'$urlRouterProvider', function ($urlRouterProvider) {
			
			$urlRouterProvider.otherwise('/login');
			
		}
	]);
	
	app.run(
		['$rootScope', function ($rootScope) {
			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				
				if (toState.data && toState.data.private && toState.data.private === true) {
					
				}
				
			});
		}
	]);
}());
(function () {
	'use strict';
	
	var app = angular.module('app.account', [
		'ui.router'
	]);
	
	app.config([
		'$stateProvider', function ($stateProvider) {
		
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'app/account/views/login.html'
				})
				.state('register', {
					url: '/register',
					templateUrl: 'app/account/views/register.html'
				})
				.state('account', {
					url: '/account',
					data: {
						private: true
					},
					templateUrl: 'app/account/views/account.html'
				});
		}
	]);
	
}());