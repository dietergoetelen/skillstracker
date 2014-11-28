(function () {
	'use strict';
	
	
	var app = angular.module('app', [
		'app.common',
		'app.account',
		'ui.router'
	]);
	
	
	app.config([
		'$urlRouterProvider', function ($urlRouterProvider) {
			
			$urlRouterProvider.otherwise('/login');
			
		}
	]);
	
	app.run(
		['$rootScope', 'AccountService', '$state', function ($rootScope, accountService, $state) {
			$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
				
				if (toState.data && toState.data.private && toState.data.private === true) {
					
					if (accountService.data.authenticated === false) {
						// Todo: implement tryLogin when there is a token in localstorage
						// Todo: uncomment when token set
						//event.preventDefault();
						//$state.go('login');
					}
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
				.state('profile', {
					url: '/profile',
					data: {
						private: true
					},
					templateUrl: 'app/account/views/profile.html'
				}); 
		}
	]);
	
}());
(function () {
	'use strict';
	
	angular.module('app.common', []);
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
					vm.$state.go('profile');
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
	
	var ProfileController = (function () {

		function ProfileController() {
			// Todo: should come from AccountService
			this.userData = {
				user: {
					fullName: 'Dieter Goetelen',
					title: 'Software Engineer .NET'
				}
			};
			
			// Todo; should come from SkillsService
			this.skills = [
				{
					name: '.NET',
					rating: 3
				},
				{
					name: 'AngularJS',
					rating: 4
				},
				{
					name: 'REST',
					rating: 3
				},
				{
					name: 'Web API',
					rating: 3
				},
				{
					name: 'JavaScript',
					rating: 4
				},
				{
					name: 'MongoDB',
					rating: 3
				}
			];
		}
		
		ProfileController.prototype.updateSkill = function (skill, oldSkill) {
			console.log('updating database for skill: ', skill, 'oldSkill: ', oldSkill); 
		};
		
		return ProfileController;
		
	}());
	
	app.controller('ProfileController', ProfileController);
	
}(angular.module('app.account')));
(function (app) {
	'use strict';
	
	var RegisterController = (function () {
		
		function RegisterController(AccountService, $state) {
			this.formData = {};
			this.accountService = AccountService;
			this.$state = $state;
		}
		
		RegisterController.prototype.register = function () {
			var vm = this;
			
			vm.accountService.register(vm.formData, function (err, user) {
				
				if (!err) {
					vm.$state.go('profile');
				}
				
			});
			
		};
		
		RegisterController.prototype.validateEmail = function (value) {
			
			return value.indexOf('@realdolmen.com') >= 0;
			
		};
		
		RegisterController.prototype.validateEmailMatch = function (value) {
			var vm = this;
			return vm.formData.email === value;
		};
		
		RegisterController.prototype.validatePasswordMatch = function (value) {
			var vm = this;
			console.log(value, vm.formData.password, vm.formData.password == value);
			
			return vm.formData.password == value;
		};
		
		RegisterController.$inject = ['AccountService', '$state'];
		
		return RegisterController;
		
	}());
	
	app.controller('RegisterController', RegisterController);
	
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
			
			if (cb) {
				cb(null, user);
			}
			
		};
		
		AccountService.prototype.register = function (user, cb) {
			var vm = this;
			
			// Todo: do $http call
			vm.data.user = user;
			vm.data.authenticated = true;
			
			if (cb) {
				cb(null, user);
			}
		};
		
		AccountService.$inject = ['$http'];
		
		return AccountService;
		
	}());
	
	app.service('AccountService', AccountService);
	
}(angular.module('app.account'))); 
(function (app) {
	'use strict';
	
	var MainController = (function () {
		
		function MainController(AccountService) {
			this.accountService = AccountService;
			this.userData = this.accountService.data;
		}
		
		MainController.$inject = ['AccountService'];
		
		return MainController;
		
	}());
	
	app.controller('MainController', MainController);
	
}(angular.module('app.common')));
(function (app) {
	'use strict';
	
	app.directive('customValidator', function () {
		
		return {
			restrict: 'A',
			require: '^ngModel',
			scope: {
				validates: '&'	
			},
			link: function(scope, element, attributes, ngModel) {
				
				ngModel.$parsers.unshift(function (value) {
					if (scope.validates({'value': value}) == true) {
						ngModel.$setValidity(attributes.customValidator, true);
					 } else {
						 ngModel.$setValidity(attributes.customValidator, false);
					 }
					
					return value;
				});
				
			}
		};
		
	});
	
}(angular.module('app.common')));
(function (app) {
	'use strict';
	
	app.directive('skillRating', function () {
		
		return {
			restrict: 'E',
			scope: {
				skill: '=',
				onUpdate: '&'
			},
			controller: ['$scope', function ($scope) {
				function setSkillHolder() {
					$scope.skillHolder = angular.copy($scope.skill);
				}
				
				$scope.over = function (index) {
					$scope.skillHolder.rating = (index + 1);
				};
				
				$scope.leave = function (index) {
					$scope.skillHolder.rating = $scope.skill.rating;
				};
				
				$scope.set = function (index) {
					var copy = angular.copy($scope.skill);

					$scope.skill.rating = (index + 1);
					$scope.onUpdate({'skill': $scope.skill, 'oldSkill': copy});
					
					setSkillHolder();
				};
				
				setSkillHolder();
			}],
			templateUrl: 'app/common/directives/templates/skillRatingTemplate.html'
		};
		
	});
	
	
}(angular.module('app.common')));