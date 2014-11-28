(function (app) {
	'use strict';
	
	app.directive('customValidator', function () {
		
		return {
			restrict: 'A',
			require: '^ngModel',
			scope: {
				validates: '&'	
			},
			link: function(scope, element, attributes, ngModel) {
				
				ngModel.$parsers.unshift(function (value) {
					if (scope.validates({'value': value}) == true) {
						console.log(attributes.customValidator, '<-- true'); 
						
						ngModel.$setValidity(attributes.customValidator, true);
					 } else {
						 console.log(attributes.customValidator, '<-- false');
						 
						 ngModel.$setValidity(attributes.customValidator, false);
					 }
					
					return value;
				});
				
			}
		};
		
	});
	
}(angular.module('app.common')));