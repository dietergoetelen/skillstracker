(function (app) {
	'use strict';
	
	var LoginController = (function () {
		
		function LoginController() {
			this.formData = {};
		}
		
		return LoginController;
		
	}());
	
	app.controller('LoginController', LoginController);
	
}(angular.module('app.account'));