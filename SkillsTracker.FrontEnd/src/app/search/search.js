(function () {
	'use strict';
	
	var app = angular.module('app.search', [
		'ui.router'
	]);
	
	app.config([
		'$stateProvider', function ($stateProvider) {
			$stateProvider
				.state('search', {
					url: '/search',
					templateUrl: 'app/search/views/search.html'
				});
		}
   	]);
}());