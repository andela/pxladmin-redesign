angular.module('pxlAdminDashboard.controllers', ['nvd3ChartDirectives']).
controller('userController', function ($scope, $routeParams, $timeout, userService) {
	
}).
controller('campaignController', function($scope, $routeParams, $timeout, userService) {
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

    // Default Datasets
	$scope.clickData = [{
        "key": "Clicks",
        "values": [ [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 8, 0 ], [ 9, 0 ], [ 10, 0 ], [ 11, 0 ], [ 12, 0 ], [ 13, 0 ], [ 14, 0 ], [ 15, 0 ], [ 16, 0 ], [ 17, 0 ], [ 18, 0 ], [ 19, 0 ], [ 20, 0 ], [ 21, 0 ], [ 22, 0 ], [ 23, 0 ], [ 24, 0 ], [ 25, 0 ], [ 26, 0 ], [ 27, 0 ], [ 28, 0 ], [ 29, 0 ], [ 30, 0 ], [ 31, 0 ] ]
    }];
    $scope.impressionData = [{
        "key": "Impressions",
        "values": [ [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 8, 0 ], [ 9, 0 ], [ 10, 0 ], [ 11, 0 ], [ 12, 0 ], [ 13, 0 ], [ 14, 0 ], [ 15, 0 ], [ 16, 0 ], [ 17, 0 ], [ 18, 0 ], [ 19, 0 ], [ 20, 0 ], [ 21, 0 ], [ 22, 0 ], [ 23, 0 ], [ 24, 0 ], [ 25, 0 ], [ 26, 0 ], [ 27, 0 ], [ 28, 0 ], [ 29, 0 ], [ 30, 0 ], [ 31, 0 ] ]
    }];
	
	$scope.selectedIndex = 0;
	$scope.id = $routeParams.id;
	
	$scope.setSelected = function(index) {
		var campaign = $scope.campaigns[index];
		$scope.selectedIndex = index;
		var clickSet = [ [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 8, 0 ], [ 9, 0 ], [ 10, 0 ], [ 11, 0 ], [ 12, 0 ], [ 13, 0 ], [ 14, 0 ], [ 15, 0 ], [ 16, 0 ], [ 17, 0 ], [ 18, 0 ], [ 19, 0 ], [ 20, 0 ], [ 21, 0 ], [ 22, 0 ], [ 23, 0 ], [ 24, 0 ], [ 25, 0 ], [ 26, 0 ], [ 27, 0 ], [ 28, 0 ], [ 29, 0 ], [ 30, 0 ], [ 31, 0 ] ];
		var impressionSet = [ [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 5, 0 ], [ 6, 0 ], [ 7, 0 ], [ 8, 0 ], [ 9, 0 ], [ 10, 0 ], [ 11, 0 ], [ 12, 0 ], [ 13, 0 ], [ 14, 0 ], [ 15, 0 ], [ 16, 0 ], [ 17, 0 ], [ 18, 0 ], [ 19, 0 ], [ 20, 0 ], [ 21, 0 ], [ 22, 0 ], [ 23, 0 ], [ 24, 0 ], [ 25, 0 ], [ 26, 0 ], [ 27, 0 ], [ 28, 0 ], [ 29, 0 ], [ 30, 0 ], [ 31, 0 ] ];
    	if(campaign.impressionHistory.length > 0) {
	    	for(var i = 0; i < campaign.impressionHistory.length; i++) {
	    		if( campaign.impressionHistory[i].date.substring(0,7) === return_formatted_date() ) {
	    			var index = parseInt(campaign.impressionHistory[i].date.substring(8,10));
	    			if(campaign.impressionHistory[i].impressions !== null) {
	    				impressionSet[index-1][1] += parseInt(campaign.impressionHistory[i].impressions);
	    			}
	    			if(campaign.impressionHistory[i].clicks !== null) {
	    				clickSet[index-1][1] += parseInt(campaign.impressionHistory[i].clicks);
	    			}
	    		}
	    	}
	    }
		$scope.clickData = [{
	        "key": "Clicks",
	        "values": clickSet
	    }];

	    $scope.impressionData = [{
	        "key": "Impressions",
	        "values": impressionSet
	    }];
    
	}

	userService.getCampaigns($routeParams.id).success(function(response) {
		$scope.campaigns = response;
		$scope.setSelected(0);
	});
	
});