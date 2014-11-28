(function (app) {
	'use strict';
	
	var MainController = (function () {
		
		function MainController(AccountService, Spinner) {
			this.accountService = AccountService;
			this.userData = this.accountService.data;
			this.spinner = Spinner;
		}
		
		MainController.$inject = ['AccountService', 'Spinner'];
		
		return MainController;
		
	}());
	
	app.controller('MainController', MainController);
	
}(angular.module('app.common')));