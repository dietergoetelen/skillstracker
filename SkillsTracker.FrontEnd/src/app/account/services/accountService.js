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
		
		AccountService.prototype.setToken = function (token) {
			localStorage.setItem('accToken', token);
		};
		
		AccountService.prototype.getToken = function () {
			return localStorage.getItem('accToken');
		};
		
		AccountService.prototype.tryLogin = function () {
			
			var token = this.getToken();
			
			if (token) {
				// Add token to $http
				this._$http.defaults.headers.common["Authorization"] = "Bearer " + token;	
			}
			
			return this._$http.get(this._BASEURL + 'api/users/me');
			
		}; 
		
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
				// Add token to local storage
				vm.setToken(token.access_token);
				
				// Try to do a login
				vm.tryLogin()
					.success(function (userData) {
						vm.data.user = userData;
					
						deferred.resolve(userData);
					})
					.error(function (err) {
						deferred.reject(err);
					});
			}).error(function (err) {
				deferred.reject(err);
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