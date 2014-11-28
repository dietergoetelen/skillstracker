(function (app) {
	'use strict';
	
	var AccountService = (function () {
		
		function AccountService($http) {
			this._$http = $http;
			
			this.data = {
				user: {},
				authenticated: false
			};
		}
		
		AccountService.prototype.login = function (user, cb) {
			
			var vm = this;
			
			// Todo: do $http call
			vm.data.user = user;
			vm.data.authenticated = true;
			
			cb(null, user);
			
		};
		
		AccountService.prototype.register = function (user, cb) {
			var vm = this;
			
			// Todo: do $http call
			vm.data.user = user;
			vm.data.authenticated = true;
			
			cb(null, user);
		};
		
		AccountService.$inject = ['$http'];
		
		return AccountService;
		
	}());
	
	app.service('AccountService', AccountService);
	
}(angular.module('app.account'))); 