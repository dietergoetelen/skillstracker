(function (app) {
	'use strict';
	
	var AccountController = (function () {

		function AccountController() {
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
					name: 'JavaScript',
					rating: 4
				},
				{
					name: 'MongoDB',
					rating: 3
				}
			];
		}
		
		return AccountController;
		
	}());
	
	app.controller('AccountController', AccountController);
	
}(angular.module('app.account')));