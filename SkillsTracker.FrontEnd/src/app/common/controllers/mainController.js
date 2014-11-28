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