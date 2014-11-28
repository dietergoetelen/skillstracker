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
					id: 1,
					name: '.NET',
					rating: 3
				},
				{
					id: 2,
					name: 'AngularJS',
					rating: 4
				},
				{
					id: 3,
					name: 'REST',
					rating: 3
				},
				{
					id: 4,
					name: 'Web API',
					rating: 3
				},
				{
					id: 5,
					name: 'JavaScript',
					rating: 4
				},
				{
					id: 6,
					name: 'MongoDB',
					rating: 3
				}
			];
			
			// Todo: should come from a service
			this.projects = [
				{
					title: 'Chronorace',
					lead: 'Front end JavaScript developer',
					intro: '<p>Introduction</p>',
					contribution: '<ul><li>AngularJS <ul><li>...</li><li>...</li></ul></li></ul>',
					tags: ['AngularJS', 'JavaScript', 'GIT', 'Bower', 'Grunt']
				},
				{
					title: 'acADDemICTs course',
					lead: 'Docent',
					intro: '<p>Introduction</p>',
					contribution: '<ul><li>AngularJS <ul><li>...</li><li>...</li></ul></li></ul>',
					tags: ['AngularJS', 'NodeJS', 'JavaScript']
				}
			];
		}
		
		ProfileController.prototype.setFilter = function (tag) {
			this.filterPredicate = tag;
		};
		  
		ProfileController.prototype.updateSkill = function (skill, oldSkill) {
			console.log('Todo: updating database for skill: ', skill, 'oldSkill: ', oldSkill); 
		};
		  
		ProfileController.prototype.deleteSkill = function (skill) {
			var skills = [];
			
			angular.forEach(this.skills, function (s) {
				if (s.id !== skill.id) {
					skills.push(s);
				}
			});

			console.log('Todo: delete skill in database for', skill);
			
			this.skills = skills;
		};
		
		return ProfileController;
		
	}());
	
	app.controller('ProfileController', ProfileController);
	
}(angular.module('app.account')));