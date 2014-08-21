angular.module('pxlAdmin.controllers', []).
controller('loginController', function ($scope, pxlAdminService) {
	$scope.doLogin = function() {
		pxlAdminService.login($scope.pxl_username, $scope.pxl_password).success(function(response) {
			console.log(response);
		});
	}
	
}).
controller('registerController', function ($scope) {
	
});