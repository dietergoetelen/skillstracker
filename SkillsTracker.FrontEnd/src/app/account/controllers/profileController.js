(function (app) {
	'use strict';
	
	var ProfileController = (function () {

		function ProfileController(AccountService, skills, projects) {
			
			this.accountService = AccountService;
			
			// Todo: should come from AccountService
			this.userData = {
				user: {
					fullName: 'Dieter Goetelen',
					title: 'Software Engineer .NET'
				}
			};
			
			this.editMode = false;
			
			this.skills = skills.data;
			this.projects = projects;
		}
		
		ProfileController.prototype.setFilter = function (tag) {
			if (! angular.isArray(this.filterPredicate)) {
				this.filterPredicate = [];
			}
			
			this.filterPredicate.push(tag);
		};
		  
		ProfileController.prototype.removeFilter = function (index) {
			this.filterPredicate.splice(index, 1);
		};
		
		ProfileController.prototype.updateSkill = function (skill, oldSkill) {
			console.log('Todo: updating database for skill: ', skill, 'oldSkill: ', oldSkill); 
		};
		
		ProfileController.prototype.addSkill = function (skill) {
			
			this.skills.push(
				{
					id: 0,
					name: skill.name,
					rating: 1
				}
			);
			
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
		
		ProfileController.$inject = ['AccountService', 'skills', 'projects'];
		
		return ProfileController;
		
	}());
	
	app.controller('ProfileController', ProfileController);
	
}(angular.module('app.account')));