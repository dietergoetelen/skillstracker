(function (app) {
	'use strict';
	
	app.filter('projectfilter', function () {
		
		function checkPredicate(tag, pred) {
			return tag.toLowerCase().indexOf(pred.toLowerCase()) >= 0;
		}
		
		return function (projects, predicate) {
			var retVal = [], found;
			
			// Nothing to filter
			if (predicate && predicate.length !== 0 && angular.isArray(projects)) {
				
				angular.forEach(projects, function (project) {
					
					found = false;
					
					if (project.tags && angular.isArray(project.tags)) {
						
						angular.forEach(project.tags, function (tag) {
							if (angular.isArray(predicate)) {
								
								angular.forEach(predicate, function (pred) {
									if (checkPredicate(tag, pred)) {
										found = true;	
									}
								});
								
							} else if (checkPredicate(tag, predicate)) {
								found = true;
							}
						});
						
					}
					
					if (found === true) {
						retVal.push(project);
					}
					
				});
				
			} else {
				retVal = projects;
			}
			
			return retVal;	
		};
		
	});
	
}(angular.module('app.account')));