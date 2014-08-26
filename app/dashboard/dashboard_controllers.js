angular.module('pxlAdminDashboard.controllers', []).
controller('userController', function ($scope, $routeParams, userService) {
	
}).
controller('campaignController', function($scope, $routeParams, userService) {
	$scope.selectedIndex = 0;
	userService.getCampaigns($routeParams.id).success(function(response) {
		$scope.campaigns = response;
	});
	$scope.setSelected = function(index) {
		$scope.selectedIndex = index;
	}
})