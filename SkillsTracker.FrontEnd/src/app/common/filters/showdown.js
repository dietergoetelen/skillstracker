(function (app) {
	
	var converter = new Showdown.converter();
	
	app.filter('showdown', [function () {
		
		return function (input) {
			if (!input) {
				input = '';	
			}
			
			return converter.makeHtml(input);	
		};
		
	}]);
	
}(angular.module('app.common')));