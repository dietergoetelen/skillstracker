(function () {
	'use strict';
	
	
	var app = angular.module('app', [
		'app.account',
		'ui.router'
	]);
	
	
	app.config([
		'$urlRouterProvider', function ($urlRouterProvider) {
			
			$urlRouterProvider.otherwise('/login');
			
		}
	]);
	
	app.run(
		['$rootScope', function ($rootScope) {
			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				
				if (toState.data && toState.data.private && toState.data.private === true) {
					
				}
				
			});
		}
	]);
}());
(function () {
	'use strict';
	
	var app = angular.module('app.account', [
		'ui.router'
	]);
	
	app.config([
		'$stateProvider', function ($stateProvider) {
		
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'app/account/views/login.html'
				})
				.state('register', {
					url: '/register',
					templateUrl: 'app/account/views/register.html'
				})
				.state('account', {
					url: '/account',
					data: {
						private: true
					},
					templateUrl: 'app/account/views/account.html'
				}); 
		}
	]);
	
}());
(function (app) {
	'use strict';
	
	var LoginController = (function () {
		
		function LoginController(AccountService, $state) {
			this.formData = {};
			this.accountService = AccountService;
			this.$state = $state;
		}
		
		LoginController.prototype.login = function () {
			var vm = this;
			
			vm.accountService.login(vm.formData, function (err, user) {
				
				if (!err) {
					vm.$state.go('account');
				}
				
			});
			
			
		};
		
		LoginController.$inject = ['AccountService', '$state'];
		
		return LoginController;
		
	}());
	
	app.controller('LoginController', LoginController);
	
}(angular.module('app.account')));
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
		
		
		AccountService.$inject = ['$http'];
		
		return AccountService;
		
	}());
	
	app.service('AccountService', AccountService);
	
}(angular.module('app.account'))); 