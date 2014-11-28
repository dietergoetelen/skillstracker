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
				.state('profile', {
					url: '/profile',
					data: {
						private: true
					},
					templateUrl: 'app/account/views/profile.html'
				}); 
		}
	]);
	
}());