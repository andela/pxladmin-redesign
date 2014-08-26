angular.module('pxlAdmin.controllers', []).
controller('loginController', function ($scope, pxlAdminService, $window) {
	$scope.isLoggedIn = false;
	$scope.doLogin = function() {
		pxlAdminService.login($scope.pxl_username, $scope.pxl_password).success(function(response) {
			$scope.isLoggedIn = true;
			$window.location.href = "/dashboard/#/" + response._id;
		});
	}
	
}).
controller('registerController', function ($scope, pxlAdminService) {
	$scope.isRegistered = false;
	// Transition for Registration
	// $scope.registerActionPerformed = false;
	$scope.doRegister = function() {
		// Transition for Registration
		// $scope.registerActionPerformed = true;
		pxlAdminService.register($scope.userdetails).success(function(response) {
			// $scope.isRegistered = true;
			// $timeout(function() { $scope.isRegistered = false }, 2000)
			// $scope.registeredUser = $scope.userdetails.contactFirst;
			// Transition for Registration
			// $scope.registerActionPerformed = false;
		});
	}
});