(function (app) {
	'use strict';
	
	var AccountService = (function () {
		
		function AccountService($http, $q, BASEURL) {
			this._$http = $http;
			this._BASEURL = BASEURL;
			this._$q = $q;
			
			this.data = {
				user: {},
				authenticated: false
			};
		}
		
		AccountService.prototype.login = function (user) {
			var vm = this;
			var deferred = vm._$q.defer();
			
			user.grant_type = "password";
			
			this._$http.post(this._BASEURL + 'token', user).then(
				function (userData) {
					vm.data.user = userData;
					vm.data.authenticated = true;
					
					console.log(userData);
					
					deferred.resolve(userData);
				},
				function (errorData) {
					deferred.reject(errorData);
				});
			
			return deferred.promise;
		};
		
		AccountService.prototype.register = function (user) {
			var vm = this;
			
			// Todo: do $http call
			vm.data.user = user;
			vm.data.authenticated = true;
			
			return this._$http.post(this._BASEURL + 'api/account/register', user);
		};
		
		AccountService.$inject = ['$http', '$q', 'BASEURL'];
		
		return AccountService;
		
	}());
	
	app.service('AccountService', AccountService);
	
}(angular.module('app.account'))); 