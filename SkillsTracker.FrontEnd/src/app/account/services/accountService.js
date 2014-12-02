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
			
			this._$http({
				method: 'POST',
				url: this._BASEURL + 'token',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj) {
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
					return str.join("&");

				},
				data: user
			}).success(function (token) {
				vm.data.user.token = token;
				vm.data.user = user;
				vm.data.authenticated = true;
				
				deferred.resolve(token);
				
			}).error(function (err) {
				deferred.rect(err);
			});
			
			return deferred.promise;
		};
		
		AccountService.prototype.register = function (user) {
			var vm = this;
			
			return this._$http.post(this._BASEURL + 'api/account/register', user);
		};
		
		AccountService.$inject = ['$http', '$q', 'BASEURL'];
		
		return AccountService;
		
	}());
	
	app.service('AccountService', AccountService);
	
}(angular.module('app.account'))); 