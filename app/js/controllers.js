angular.module('pxlAdmin.controllers', []).
controller('loginController', function ($scope, pxlAdminService) {
	var isLoggedIn = false;
	$scope.doLogin = function() {
		pxlAdminService.login($scope.pxl_username, $scope.pxl_password).success(function(response) {
			isLoggedIn = true;
		});
	}
	
}).
controller('registerController', function ($scope, pxlAdminService) {
	var isRegistered = false;
	$scope.doRegister = function() {
		pxlAdminService.register($scope.userdetails).success(function(response) {
			isRegistered = true;
		});
	}
});