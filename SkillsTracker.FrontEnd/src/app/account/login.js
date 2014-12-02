(function () {
	'use strict';
	
	var app = angular.module('app.account', [
		'ui.router'
	]);
	
	app.config(['$httpProvider', function($httpProvider) {
		$httpProvider.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
    }]);
	
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
				.state('profile', {
					url: '/profile',
					data: {
						private: true
					},
					controller: 'ProfileController',
					controllerAs: 'vm',
					resolve: {
						skills: ['ProfileService', 'AccountService', function (profileService, accountService) {
							
							return profileService.getSkills(accountService.userData);
							
						}],
						projects: ['ProfileService', 'AccountService', function (profileService, accountService) {
							
							return profileService.getProjects(accountService.userData);
							
						}]
					},
					templateUrl: 'app/account/views/profile.html'
				}); 
		}
	]);
	
}());