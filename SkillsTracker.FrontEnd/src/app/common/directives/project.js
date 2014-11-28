(function (app) {
	'use strict';
	
	app.directive('project', function() {
		
		return {
			
			templateUrl: 'app/common/directives/templates/projectTemplate.html',
			scope: {
				title: '@',
				lead: '@',
				tags: '=',
				intro: '@',
				contribution: '@',
				onSetFilter: '&'
			},
			controller: ['$sce','$scope', function ($sce, $scope) {
				
				$scope.trustAsHtml = function (value) {
					return $sce.trustAsHtml(value);
				};
				
			}]
			
		};
		
	});
	
}(angular.module('app.common')));