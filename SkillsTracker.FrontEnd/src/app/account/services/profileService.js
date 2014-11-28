(function (app) {
	'use strict';
	
	var ProfileService = (function () {
		
		function ProfileService($http, $q, $timeout) {
			this._$http = $http;
			this._$q = $q;
			this._$timeout = $timeout;
		}
		
		ProfileService.prototype.getProjects = function (userId) {
			var deferred = this._$q.defer();
			
			// Simulate latency
			this._$timeout(function () {
				
				deferred.resolve([
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
				
			}, 2000);
			
			return deferred.promise;
		};
		
		ProfileService.prototype.getSkills = function (userId) {
			
			var deferred = this._$q.defer();
			
			deferred.resolve([
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
			
			return deferred.promise;
		};
		
		ProfileService.$inject = ['$http', '$q', '$timeout'];
		
		return ProfileService;
		
	}());
	
	app.service('ProfileService', ProfileService);
	
}(angular.module('app.account')));