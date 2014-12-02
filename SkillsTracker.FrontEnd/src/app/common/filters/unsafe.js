(function (app) {
	
	app.filter('unsafe', ['$sce', function ($sce) {
		
		return $sce.trustAsHtml;
		
	}]);
	
}(angular.module('app.common')));