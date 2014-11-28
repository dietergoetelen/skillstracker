(function (app) {
	'use strict';
	
	app.directive('skillRating', function () {
		
		return {
			restrict: 'E',
			scope: {
				skill: '=',
				onUpdate: '&',
				onDelete: '&'
			},
			controller: ['$scope', function ($scope) {
				function setSkillHolder() {
					$scope.skillHolder = angular.copy($scope.skill);
				}
				
				$scope.over = function (index) {
					$scope.skillHolder.rating = (index + 1);
				};
				
				$scope.leave = function (index) {
					$scope.skillHolder.rating = $scope.skill.rating;
				};
				
				$scope.set = function (index) {
					var copy = angular.copy($scope.skill);

					$scope.skill.rating = (index + 1);
					$scope.onUpdate({'skill': $scope.skill, 'oldSkill': copy});
					
					setSkillHolder();
				};
				
				$scope.delete = function () {
					$scope.onDelete({'skill': $scope.skill});
				};
				
				setSkillHolder();
			}],
			templateUrl: 'app/common/directives/templates/skillRatingTemplate.html'
		};
	});
	
}(angular.module('app.common')));