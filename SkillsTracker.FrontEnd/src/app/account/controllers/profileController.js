(function (app) {
	'use strict';
	
	var ProfileController = (function () {

		function ProfileController(AccountService, ProfileService) {
			
			this.accountService = AccountService;
			this.profileService = ProfileService;
			
			// Todo: should come from AccountService
			this.userData = {
				user: {
					fullName: 'Dieter Goetelen',
					title: 'Software Engineer .NET'
				}
			};
			
			this.getSkills();
			this.getProjects();
		}
		
		ProfileController.prototype.getSkills = function () {
			var vm = this;
			
			vm.profileService.getSkills(vm.userData, function (err, skills) {
				if (!err) {
					vm.skills = skills;
				}
			});
		};
		
		ProfileController.prototype.getProjects = function () {
			var vm = this;
			
			vm.profileService.getProjects(vm.userData, function (err, projects) {
				if (!err) {
					vm.projects = projects;
				}
			});
		};
		
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
		
		ProfileController.$inject = ['AccountService', 'ProfileService'];
		
		return ProfileController;
		
	}());
	
	app.controller('ProfileController', ProfileController);
	
}(angular.module('app.account')));