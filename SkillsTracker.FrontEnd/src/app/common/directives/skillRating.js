(function (app) {
	'use strict';
	
	app.directive('skillRating', function () {
		
		return {
			restrict: 'E',
			scope: {
				skill: '='	
			},
			templateUrl: 'app/common/directives/templates/skillRatingTemplate.html'
		};
		
	});
	
	
}(angular.module('app.common')));