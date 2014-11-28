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