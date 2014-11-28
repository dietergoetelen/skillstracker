(function (app) {
	'use strict';
	
	app.filter('projectfilter', function () {
		
		return function (projects, predicate) {
			var retVal = [], found;
			
			if (predicate && angular.isArray(projects)) {
				
				angular.forEach(projects, function (project) {
					
					found = false;
					
					if (project.tags && angular.isArray(project.tags)) {
						
						angular.forEach(project.tags, function (tag) {
							if (tag.toLowerCase().indexOf(predicate.toLowerCase()) >= 0) {
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