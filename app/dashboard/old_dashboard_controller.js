angular.module('pxlAdminDashboard.controllers', ['chartjs']).
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

	// Initialize Plotting variables
	var month_labels = ["1", "2", "3", "4", "5", "6", "7", "6", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
	var zero_set = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    $scope.clickOptions = {
    	bezierCurve: false,
    	responsive: true
    };
    $scope.impressionOptions = {
    	responsive: true
    };
    // Default Datasets
	var default_dataset = {
        labels: month_labels,
        datasets: [
            {
                label: "Clicks",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(22,22,22,1)",
                pointColor: "rgba(22,22,22,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
    			responsive: true,
                data: zero_set
            }
        ]
    };
    // Initialize
    $scope.clicks_monthly_dataset = default_dataset;
    $scope.impressions_monthly_dataset = default_dataset;
    // Change for Monthly Clicks
    $scope.clicks_monthly_dataset.datasets[0].label = "Clicks";
    $scope.impressions_monthly_dataset.datasets[0].label = "Impressions";
	
	$scope.selectedIndex = 0;
	$scope.id = $routeParams.id;
	userService.getCampaigns($routeParams.id).success(function(response) {
		$scope.campaigns = response;
		$scope.setSelected(0);
	});
	$scope.setSelected = function(index) {
		$scope.selectedIndex = index;
    	var impression_counts = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    	var click_counts = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    	if($scope.campaigns[$scope.selectedIndex].impressionHistory.length > 0) {
	    	for(var i = 0; i < $scope.campaigns[$scope.selectedIndex].impressionHistory.length; i++) {
	    		var this_impression = $scope.campaigns[$scope.selectedIndex].impressionHistory[i];
	    		if( this_impression.date.substring(0,7) == return_formatted_date() ) {
	    			var index = parseInt(this_impression.date.substring(8,10));
					impression_counts[index-1] += this_impression.impressions == null ? 0 : parseInt(this_impression.impressions);
					click_counts[index-1] += this_impression.clicks == null ? 0 : parseInt(this_impression.clicks);
	    		}
	    	}
	    }
		// Set Click Dataset
		$timeout( function() { $scope.clicks_monthly_dataset.datasets[0].data =  click_counts }, 0 );
	    // Set Impression DataSet
	    /* $timeout( function() { $scope.impressions_monthly_dataset.datasets[0].data = impression_counts }, 0 ) */;
	    console.log($scope.clicks_monthly_dataset.datasets[0].data);
	}
})