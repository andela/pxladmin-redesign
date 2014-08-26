angular.module('pxlAdminDashboard.services', []).
factory('userService', function ($http) {
	var userServiceAPI = {};
	var base_url = 'http://pxladmindev1.herokuapp.com';
	userServiceAPI.getDetails = function(id) {
		
		/*return $http({
			method: 'POST',
			url: base_url + '/api/login',
			data: { un: username, pw: password }
		});*/

	}

	userServiceAPI.getCampaigns = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/campaignsByAcct/' + id
		});
	}

	return userServiceAPI;
})