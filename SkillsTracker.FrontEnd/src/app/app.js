(function () {
	'use strict';
	
	
	var app = angular.module('app', [
		'ui.router'
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