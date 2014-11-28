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