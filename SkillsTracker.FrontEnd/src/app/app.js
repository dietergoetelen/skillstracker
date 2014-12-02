(function () {
	'use strict';
	
	var app = angular.module('app', [
		'app.common',
		'app.account',
		'app.search',
		'ui.router'
	]);
	
	app.config([
		'$urlRouterProvider', function ($urlRouterProvider) {
			
			$urlRouterProvider.otherwise('/login');
			
		}
	]);
	
	app.constant('BASEURL', 'http://localhost:25462/');
	
	app.value('Spinner', {
		loading: false	
	});
	
	app.run(
		['$rootScope', 'AccountService', '$state', 'Spinner', function ($rootScope, accountService, $state, Spinner) {
			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				if (toState.resolve) {
					Spinner.loading = true;
				}
				
				if (toState.data && toState.data.private && toState.data.private === true) {
					
					if (accountService.data.authenticated === false) {
						accountService.tryLogin()
							.success(function (user) {
								console.log('User is authenticated', user);
							})
							.error(function (err) {
								Spinner.loading = false;
							
								event.preventDefault();
								$state.go('login');
							});
					}
				}
			});
			
			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				// Check if state has resolve
				if (toState.resolve) {
					Spinner.loading = false;
				}
			});
		}
	]);
}());