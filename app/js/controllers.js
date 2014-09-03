angular.module('pxlAdmin.controllers', ['nvd3ChartDirectives', 'angularFileUpload']).
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
}).
controller('userController', function ($scope, $stateParams, $timeout, $upload, pxlAdminService) {
	$scope.imageSelected = false;
	$scope.files = []
	pxlAdminService.getCreatives($stateParams.id).success(function(response) {
		if(response.length === 0) {
			$('#intro_modal').modal('show');
		}
	});
	$scope.doFileUpload = function() {
		console.log("Start");
		for (var i = 0; i < $scope.files.length; i++) {
	      	var file = $scope.files[i];
	      	$scope.upload = pxlAdminService.addCreative($stateParams.id, file, $scope.creative_name).progress(function(evt) {
	        	console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	      	}).success(function(data, status, headers, config) {
	        	console.log(data);
	        	$('#creative_upload_modal').modal('hide');
	      	});
	    }
	}
	$scope.onFileSelect = function($files) {
	    //$files: an array of files selected, each file has name, size, and type.
	    $scope.files = $files;
	    $scope.imageSelected = true;
	    if($files && $files[0]) {
		    var reader = new FileReader();
	        reader.onload = function (e) {
	            $('#uploadImage').attr('src', e.target.result).width(400).height(200);
	        };
	        reader.readAsDataURL($files[0]);
	    }
	}
}).
controller('campaignController', function($scope, $stateParams, $timeout, pxlAdminService) {
	// Returns the date as a double digit
	var return_double_digit = function(number) {    
	    if(number <= 99)
	        return number > 9 ? number : "0" + number;
	    else
	        return false
	}

	// Returns date in the format YYYY-MM-DD
	var return_formatted_date = function() {
	    var d = new Date();
	    //return d.getFullYear() + "-" + return_double_digit(parseInt(d.getMonth()) + 1) + "-" + return_double_digit(d.getDate());
	    return d.getFullYear() + "-" + return_double_digit(parseInt(d.getMonth()) + 1);
	}

    // Default Zero Datasets
	$scope.clickData = [{
        "key": "Clicks",
        "values": [ [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 8, 0 ], [ 9, 0 ], [ 10, 0 ], [ 11, 0 ], [ 12, 0 ], [ 13, 0 ], [ 14, 0 ], [ 15, 0 ], [ 16, 0 ], [ 17, 0 ], [ 18, 0 ], [ 19, 0 ], [ 20, 0 ], [ 21, 0 ], [ 22, 0 ], [ 23, 0 ], [ 24, 0 ], [ 25, 0 ], [ 26, 0 ], [ 27, 0 ], [ 28, 0 ], [ 29, 0 ], [ 30, 0 ], [ 31, 0 ] ]
    }];
    $scope.impressionData = [{
        "key": "Impressions",
        "values": [ [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 8, 0 ], [ 9, 0 ], [ 10, 0 ], [ 11, 0 ], [ 12, 0 ], [ 13, 0 ], [ 14, 0 ], [ 15, 0 ], [ 16, 0 ], [ 17, 0 ], [ 18, 0 ], [ 19, 0 ], [ 20, 0 ], [ 21, 0 ], [ 22, 0 ], [ 23, 0 ], [ 24, 0 ], [ 25, 0 ], [ 26, 0 ], [ 27, 0 ], [ 28, 0 ], [ 29, 0 ], [ 30, 0 ], [ 31, 0 ] ]
    }];
	
	$scope.selectedIndex = 0;
	$scope.id = $stateParams.id;
	
	$scope.setSelected = function(index) {
		var campaign = $scope.campaigns[index];
		$scope.selectedIndex = index;
		var clickSet = [ [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 8, 0 ], [ 9, 0 ], [ 10, 0 ], [ 11, 0 ], [ 12, 0 ], [ 13, 0 ], [ 14, 0 ], [ 15, 0 ], [ 16, 0 ], [ 17, 0 ], [ 18, 0 ], [ 19, 0 ], [ 20, 0 ], [ 21, 0 ], [ 22, 0 ], [ 23, 0 ], [ 24, 0 ], [ 25, 0 ], [ 26, 0 ], [ 27, 0 ], [ 28, 0 ], [ 29, 0 ], [ 30, 0 ], [ 31, 0 ] ];
		var impressionSet = [ [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 8, 0 ], [ 9, 0 ], [ 10, 0 ], [ 11, 0 ], [ 12, 0 ], [ 13, 0 ], [ 14, 0 ], [ 15, 0 ], [ 16, 0 ], [ 17, 0 ], [ 18, 0 ], [ 19, 0 ], [ 20, 0 ], [ 21, 0 ], [ 22, 0 ], [ 23, 0 ], [ 24, 0 ], [ 25, 0 ], [ 26, 0 ], [ 27, 0 ], [ 28, 0 ], [ 29, 0 ], [ 30, 0 ], [ 31, 0 ] ];
    	if(campaign.impressionHistory.length > 0) {
	    	for(var i = 0; i < campaign.impressionHistory.length; i++) {
	    		// if( campaign.impressionHistory[i].date.substring(0,7) === return_formatted_date() ) {
	    			var index = parseInt(campaign.impressionHistory[i].date.substring(8,10));
					// console.log(campaign.impressionHistory);
	    			if(campaign.impressionHistory[i].impressions !== null) {
	    				impressionSet[index-1][1] += parseInt(campaign.impressionHistory[i].impressions);
	    			}
	    			if(campaign.impressionHistory[i].clicks !== null) {
	    				clickSet[index-1][1] += parseInt(campaign.impressionHistory[i].clicks);
	    			}
	    		// }
	    	}
	    }
	    // Reassign Datasets based on ImpressionHistory array
		$scope.clickData = [{
	        "key": "Clicks",
	        "values": clickSet
	    }];
	    $scope.impressionData = [{
	        "key": "Impressions",
	        "values": impressionSet
	    }];
    
	}

	pxlAdminService.getCampaigns($stateParams.id).success(function(response) {
		$scope.campaigns = response;
		$scope.setSelected(0);
	});
	
});