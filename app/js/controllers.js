angular.module('pxlAdmin.controllers', ['nvd3ChartDirectives', 'angularFileUpload']).
controller('loginController', function ($scope, pxlAdminService, $state) {
	$scope.isLoggedIn = false;
	$scope.doLogin = function() {
		pxlAdminService.login($scope.pxl_username, $scope.pxl_password).success(function(response) {
			$scope.isLoggedIn = true;
			$state.go('dashboard', {id: response._id});
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
controller('pagesController', function ($scope, $stateParams, $upload, pxlAdminService) {
	$scope.variables = { accountCreatives: null }
	$scope.pageActions = { reloadImages: false, pageImages: false };
	$scope.id = $stateParams.id;
	$scope.imageSelected = false;
	$scope.files = [];
	$scope.selectedUploadImage = {};
	$scope.isValidImage = true;

	// Open New Creative Modal
	$scope.newCreativeModal = function() {
		$('#creative-upload-modal').modal('show');
	}

	// Open New Campaign Modal
	$scope.createCampaignModal = function() {
		// Load new images if page images have not been update
		if($scope.pageActions.pageImages) {
			pxlAdminService.getCreatives($scope.id).success(function(response) {
				$scope.variables.accountCreatives = response;
				$scope.pageActions.pageImages = false;
			});
		}

		if($scope.variables.accountCreatives === null || $scope.variables.accountCreatives.length === 0) {
			$('#intro-modal').modal('show');
		} else {
			$('#create-campaign').modal('show');
		}
	}

	// Upload the image
	$scope.doFileUpload = function() {
		if($scope.isValidImage) {
			for (var i = 0; i < $scope.files.length; i++) {
		      	var file = $scope.files[i];
		      	$scope.selectedUploadImage.name = $scope.creative_name;
		      	pxlAdminService.addCreative($scope.selectedUploadImage).success(function(response) {
		        	$('#creative-upload-modal').modal('hide');
		        	$scope.pageActions.reloadImages = true;
		        	$scope.pageActions.pageImages = true;
		      	});
		    }
		}
	}

	// Select the image and Load preview.
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
}).
controller('accountController', function($scope, $stateParams, pxlAdminService){

	/* ======================================
		VARIABLE DECLARATION & INITIALIZATION
	========================================= */

	// $scope.selectedIndex = 0;
	$scope.id = $stateParams.id;

	/* ======================================
		CONTROLLER ACTIONS
	========================================= */
	$scope.editAccountModal = function() {
		$('#edit-account').modal('show');
	}

	$scope.doAccountUpdate = function() {
		pxlAdminService.updateAccount($scope.account).success(function(response) {
			$('#edit-account').modal('hide');
		})
	}

	/* ======================================
		SERVICE CALLS
	========================================= */

	pxlAdminService.getAccount($scope.id).success(function(response) {
		$scope.account = response;
		delete $scope.account.contactPass;
	});
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
	$scope.accountCreatives = [];
	$scope.campaignCreatives = [];
	$scope.sliderFirst = 0;
	$scope.accountSliderFirst = 0;
	$scope.newCampaign = {};

	/* ======================================
		CONTROLLER ACTIONS
	========================================= */

	$scope.sliderNext = function() {
		if($scope.sliderFirst + 3 < $scope.campaignCreatives.length) {
			$scope.sliderFirst = ++$scope.sliderFirst === $scope.campaignCreatives.length ? 0 : $scope.sliderFirst;
		}
	} 

	$scope.sliderPrev = function() {
		if($scope.sliderFirst !== 0) {
			$scope.sliderFirst = --$scope.sliderFirst < 0 ? $scope.campaignCreatives.length - 1 : $scope.sliderFirst;
		}
	} 

	$scope.showSlide = function(index) {
		if(index >= $scope.sliderFirst && index < $scope.sliderFirst + 3)
			return true;
		else
			return false;
	} 

	$scope.sliderAccountNext = function() {
		if($scope.accountSliderFirst + 3 < $scope.accountCreatives.length) {
			$scope.accountSliderFirst = ++$scope.accountSliderFirst === $scope.accountCreatives.length ? 0 : $scope.accountSliderFirst;
		}
	} 

	$scope.sliderAccountPrev = function() {
		if($scope.accountSliderFirst !== 0) {
			$scope.accountSliderFirst = --$scope.accountSliderFirst < 0 ? $scope.accountCreatives.length - 1 : $scope.accountSliderFirst;
		}
	} 

	$scope.showAccountSlide = function(index) {
		if(index >= $scope.accountSliderFirst && index < $scope.accountSliderFirst + 3)
			return true;
		else
			return false;
	} 
	
	$scope.manageCreativeModal = function() {
		$scope.sliderFirst = 0;
		$scope.accountSliderFirst = 0;

		if($scope.pageActions.reloadImages) {
			// Get new images
			$scope.loadAccountCreatives();
		}

		$('#manage-creatives').modal('show');
	}

	$scope.editCampaignModal = function() {
		$('#edit-campaign').modal('show');
	}

	$scope.refreshCampaignCreatives = function() {
		$scope.campaignCreatives = [];
	    if($scope.campaigns[$scope.selectedIndex].creatives.length !== 0) {
			for(var i in $scope.campaigns[$scope.selectedIndex].creatives)
			{
				var creative = $scope.campaigns[$scope.selectedIndex].creatives[i];
				if(creative !== null) {
					$scope.campaignCreatives.push(creative);
				}
			}
		}
	}

	$scope.loadAccountCreatives = function() {
		pxlAdminService.getCreatives($stateParams.id).success(function(response) {
			if(response.length === 0) {
				$('#intro-modal').modal('show');
			} else {
				$scope.accountCreatives = response;
				$scope.variables.accountCreatives = response;
			}
			$scope.pageActions.reloadImages = false;
			$scope.pageActions.pageImages = false;
		});
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
	    $scope.refreshCampaignCreatives();
	}

	$scope.selectNewCampaignPrimary  = function(id) {
		$scope.newCampaign.creative = $scope.accountCreatives[id];
		console.log($scope.newCampaign.creative);
	}

	$scope.addCreativeToCampaign = function(creative) {
		var selectedCampaign =  $scope.campaigns[$scope.selectedIndex];
		var found = false;
		for(var i in $scope.campaignCreatives) {
			if( $scope.campaignCreatives[i]._id == creative._id ) {
				found = true;
				break;
			}
		}
		if(!found) {
			pxlAdminService.addCampaignCreative( creative, selectedCampaign ).success(function(response) {
				$scope.campaigns[$scope.selectedIndex] = response;
				$scope.refreshCampaignCreatives();
			});
		}
	}

	$scope.removeCreativeFromCampaign = function(creative) {
		var selectedCampaign =  $scope.campaigns[$scope.selectedIndex];
		pxlAdminService.removeCampaignCreative( creative, selectedCampaign ).success(function(response) {
			console.log(response);
			$scope.campaigns[$scope.selectedIndex] = response;
			$scope.refreshCampaignCreatives();
		});
	}

	$scope.setPrimaryCreative = function(creative) {
		var selectedCampaign = $scope.campaigns[$scope.selectedIndex];
		pxlAdminService.newPrimaryCreative( creative, selectedCampaign ).success(function(response) {
			console.log(response)
		});
	}

	$scope.doCampaignUpdate = function() {
		var selectedCampaign =  $scope.campaigns[$scope.selectedIndex];
		pxlAdminService.updateCampaign( selectedCampaign ).success(function(response) {
			$('#edit-campaign').modal('hide');
		})
	}

	$scope.doCampaignCreate = function() {
		pxlAdminService.createCampaign( $scope.id, $scope.newCampaign ).success(function(response) {
			$('#create-campaign').modal('hide');
			console.log(response);
		})
	}

	$scope.enableCampaign = function() {
		var selectedCampaign =  $scope.campaigns[$scope.selectedIndex];
		pxlAdminService.enableCampaign( selectedCampaign._id ).success(function(response) {
			$scope.campaigns[$scope.selectedIndex].disabled = false;
			$scope.campaigns[$scope.selectedIndex].status = "Active";
		});
	}

	$scope.disableCampaign = function() {
		var selectedCampaign =  $scope.campaigns[$scope.selectedIndex];
		pxlAdminService.disableCampaign( selectedCampaign._id ).success(function(response) {
			$scope.campaigns[$scope.selectedIndex].disabled = true;
			$scope.campaigns[$scope.selectedIndex].status = "Inactive";
		});
	}

	/* ======================================
		SERVICE CALLS
	========================================= */

	pxlAdminService.getCampaigns($stateParams.id).success(function(response) {
		$scope.campaigns = response;
		// console.log(response);
		$scope.setSelected(0);
		$scope.loadAccountCreatives();
	});


});