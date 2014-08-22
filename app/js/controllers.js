angular.module('pxlAdmin.controllers', []).
controller('loginController', function ($scope, pxlAdminService) {
	$scope.isLoggedIn = false;
	$scope.doLogin = function() {
		pxlAdminService.login($scope.pxl_username, $scope.pxl_password).success(function(response) {
			$scope.isLoggedIn = true;
			$scope.loggedInUser = $scope.pxl_username;
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
			$scope.isRegistered = true;
			$scope.registeredUser = $scope.userdetails.contactFirst;
			// Transition for Registration
			// $scope.registerActionPerformed = false;
		});
	}
});