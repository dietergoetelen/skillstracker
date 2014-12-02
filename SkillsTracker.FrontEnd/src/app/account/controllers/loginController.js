(function (app) {
	'use strict';
	
	var LoginController = (function () {
		
		function LoginController(AccountService, $state) {
			this.formData = {};
			this.accountService = AccountService;
			this.$state = $state;
			this.error = '';
		}
		
		LoginController.prototype.login = function () {
			var vm = this;
			
			vm.accountService.login(vm.formData).then(
				function (userData) {
					vm.$state.go('profile');
				}, 
				function(errorData) {
					// Todo: handle error
					vm.error = errorData && errorData.error_description || 'Woops: something bad has happened';
				});
		};
		
		LoginController.$inject = ['AccountService', '$state'];
		
		return LoginController;
		
	}());
	
	app.controller('LoginController', LoginController);
	
}(angular.module('app.account')));