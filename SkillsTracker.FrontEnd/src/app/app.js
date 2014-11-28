(function () {
	'use strict';
	
	
	var app = angular.module('app', [
		'app.common',
		'app.account',
		'ui.router'
	]);
	
	
	app.config([
		'$urlRouterProvider', function ($urlRouterProvider) {
			
			$urlRouterProvider.otherwise('/login');
			
		}
	]);
	
	app.run(
		['$rootScope', 'AccountService', '$state', function ($rootScope, accountService, $state) {
			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				
				if (toState.data && toState.data.private && toState.data.private === true) {
					
					if (accountService.data.authenticated === false) {
						$state.go('login');
					}
					
				}
				
			});
		}
	]);
}());