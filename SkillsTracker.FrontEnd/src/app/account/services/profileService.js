(function (app) {
	'use strict';
	
	var ProfileService = (function () {
		
		function ProfileService($http) {
			this._$http = $http;
		}
		
		ProfileService.prototype.getProjects = function (userId, cb) {
			
			if (cb) {
				cb(null, [
					{
						title: 'Chronorace',
						lead: 'Front end JavaScript developer',
						intro: '<p>Introduction</p>',
						contribution: '<ul><li>AngularJS <ul><li>...</li><li>...</li></ul></li></ul>',
						tags: ['AngularJS', 'JavaScript', 'GIT', 'Bower', 'Grunt']
					},
					{
						title: 'acADDemICTs course',
						lead: 'Docent',
						intro: '<p>Introduction</p>',
						contribution: '<ul><li>AngularJS <ul><li>...</li><li>...</li></ul></li></ul>',
						tags: ['AngularJS', 'NodeJS', 'JavaScript']
					}
				]);
			}
			
		};
		
		ProfileService.prototype.getSkills = function (userId, cb) {
			
			if (cb) {
				cb(null, [
					{
						id: 1,
						name: '.NET',
						rating: 3
					},
					{
						id: 2,
						name: 'AngularJS',
						rating: 4
					},
					{
						id: 3,
						name: 'REST',
						rating: 3
					},
					{
						id: 4,
						name: 'Web API',
						rating: 3
					},
					{
						id: 5,
						name: 'JavaScript',
						rating: 4
					},
					{
						id: 6,
						name: 'MongoDB',
						rating: 3
					}
				]);
			}
			
		};
		
		ProfileService.$inject = ['$http'];
		
		return ProfileService;
		
	}());
	
	app.service('ProfileService', ProfileService);
	
}(angular.module('app.account')));