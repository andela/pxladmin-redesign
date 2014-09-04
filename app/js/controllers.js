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
controller('pagesController', function ($scope, $stateParams, $timeout, $upload, pxlAdminService) {

}).
controller('campaignController', function($scope, $stateParams, $timeout, pxlAdminService) {
	/* ======================================
		USER-DEFINED FUNCTIONS
	========================================= */

	/* Returns a month number as a double digit */
	var return_double_digit = function(number) {    
	    if(number <= 99)
	        return number > 9 ? number : "0" + number;
	    else
	        return false
	}

	/* Returns date in the format YYYY-MM-DD */
	var return_formatted_date = function() {
	    var d = new Date();
	    return d.getFullYear() + "-" + return_double_digit(parseInt(d.getMonth()) + 1);
	}
	
	/* ======================================
		VARIABLE DECLARATION & INITIALIZATION
	========================================= */

    /* Default Zero Datasets */
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

	$scope.imageSelected = false;
	$scope.files = []
	$scope.accountCreatives = [];
	$scope.campaignCreatives = [];
	$scope.sliderFirst = 0;
	$scope.accountSliderFirst = 0;
	$scope.selectedUploadImage = {};
	$scope.isValidImage = true;

	/* ======================================
		CONTROLLER ACTIONS
	========================================= */

	$scope.sliderNext = function() {
		$scope.sliderFirst = ++$scope.sliderFirst === $scope.campaignCreatives.length ? 0 : $scope.sliderFirst;
	} 

	$scope.sliderPrev = function() {
		$scope.sliderFirst = --$scope.sliderFirst < 0 ? $scope.campaignCreatives.length - 1 : $scope.sliderFirst;
	} 

	$scope.showSlide = function(index) {
		if(index >= $scope.sliderFirst && index < $scope.sliderFirst + 3)
			return true;
		else
			return false;
	} 

	$scope.sliderAccountNext = function() {
		$scope.accountSliderFirst = ++$scope.accountSliderFirst === $scope.accountCreatives.length ? 0 : $scope.accountSliderFirst;
	} 

	$scope.sliderAccountPrev = function() {
		$scope.accountSliderFirst = --$scope.accountSliderFirst < 0 ? $scope.accountCreatives.length - 1 : $scope.accountSliderFirst;
	} 

	$scope.showAccountSlide = function(index) {
		if(index >= $scope.accountSliderFirst && index < $scope.accountSliderFirst + 3)
			return true;
		else
			return false;
	} 

	$scope.doFileUpload = function() {
		if($scope.isValidImage) {
			for (var i = 0; i < $scope.files.length; i++) {
		      	var file = $scope.files[i];
		      	$scope.selectedUploadImage.name = $scope.creative_name;
		      	pxlAdminService.addCreative($stateParams.id, $scope.selectedUploadImage).success(function(response) {
		        	// console.log(data);
		        	$('#creative_upload_modal').modal('hide');
		      	});
		    }
		}
	}

	$scope.onFileSelect = function($files) {
	    //$files: an array of files selected, each file has name, size, and type.
	    $scope.files = $files;
	    if($files && $files[0]) {
	    	if($files[0].type === "image/jpeg" || $files[0].type === "image/png") {
	    		$scope.isValidImage = true;
	    		$scope.imageSelected = true;
			    var reader = new FileReader();
		        reader.onload = function (e) {
		        	var imageObj = new Image();
					imageObj.src = e.target.result;
					var scale = imageObj.width > imageObj.height ? 400/imageObj.width : 400/imageObj.height ;
		            $('#uploadImage').attr('src', e.target.result).width(imageObj.width * scale).height(imageObj.height * scale);
		            // Formulate the object
		            $scope.selectedUploadImage.width = imageObj.width;
		            $scope.selectedUploadImage.height = imageObj.height;
		            $scope.selectedUploadImage.imageType = $scope.files[0].type === "image/jpeg" ? 'jpg' : 'png';
		            $scope.selectedUploadImage.image = e.target.result;
		            $scope.selectedUploadImage.owner = $scope.id;
		        }
		        reader.readAsDataURL($files[0]);
		    } else {
		    	$scope.isValidImage = false;
		    }
	    }
	}
	
	$scope.manageCreativeModal = function() {
		$('#manage-creatives').modal('show');
		
	}
	
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
		$scope.clickData = [{ "key": "Clicks", "values": clickSet }];
	    $scope.impressionData = [{ "key": "Impressions", "values": impressionSet }];
	    
	    // Populate the campaignCreatives Array
	    $scope.campaignCreatives = [];
	    if($scope.campaigns[$scope.selectedIndex].creatives.length !== 0) {
			for(var creative in $scope.campaigns[$scope.selectedIndex].creatives)
			{
				if(creative !== null) {
					$scope.campaignCreatives.push(creative);
				}
			}
		}
	}

	$scope.addCreativeToCampaign = function(creative) {
		var selectedCampaign =  $scope.campaigns[$scope.selectedIndex];
		pxlAdminService.addCampaignCreative( selectedCampaign.campaignId, creative, selectedCampaign ).success(function(response) {
			// Update campaignCreatives
			// console.log(response);
		});
	}

	$scope.removeCreativeFromCampaign = function(creative) {
		var selectedCampaign =  $scope.campaigns[$scope.selectedIndex];
		pxlAdminService.removeCampaignCreative( selectedCampaign.campaignId, creative, selectedCampaign ).success(function(response) {
			// console.log(response);
		});
	}

	/* ======================================
		SERVICE CALLS
	========================================= */

	pxlAdminService.getCampaigns($stateParams.id).success(function(response) {
		$scope.campaigns = response;
		$scope.setSelected(0);
	});

	pxlAdminService.getCreatives($stateParams.id).success(function(response) {
		if(response.length === 0) {
			$('#intro_modal').modal('show');
		} else {
			$scope.accountCreatives = response;
		}
	});
});