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