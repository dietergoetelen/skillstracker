(function (app) {
	'use strict';
	
	var LoginController = (function () {
		
		function LoginController() {
			this.formData = {};
		}
		
		LoginController.prototype.login = function () {
			
			
			
		};
		
		return LoginController;
		
	}());
	
	app.controller('LoginController', LoginController);
	
}(angular.module('app.account'));