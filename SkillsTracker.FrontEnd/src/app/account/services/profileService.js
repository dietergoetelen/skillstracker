(function (app) {
	'use strict';
	
	var ProfileService = (function () {
		
		function ProfileService($http, $q, $timeout, BASEURL) {
			this._$http = $http;
			this._$q = $q;
			this._$timeout = $timeout;
			this._BASEURL = BASEURL;
		}
		
		ProfileService.prototype.getProjects = function (userId) {
			var deferred = this._$q.defer();
			
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
				
			return deferred.promise;
		};
		
		ProfileService.prototype.getSkills = function (userId) {
			
			return this._$http.get(this._BASEURL + 'api/users/me/skills');
			
		};
		
		ProfileService.$inject = ['$http', '$q', '$timeout', 'BASEURL'];
		
		return ProfileService;
		
	}());
	
	app.service('ProfileService', ProfileService);
	
}(angular.module('app.account')));