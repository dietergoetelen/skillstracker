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
			
			vm.accountService.register(function (err, user) {
				
				if (!err) {
					vm.$state.go('account');
				}
				
			});
			
		};
		
		RegisterController.$inject = ['AccountService', '$state'];
		
		return RegisterController;
		
	}());
	
	app.controller('RegisterController', RegisterController);
	
}(angular.module('app.account')));