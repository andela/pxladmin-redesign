angular.module('pxlAdminDashboard.services', ['angularFileUpload']).
factory('userService', function ($http, $upload) {
	var userServiceAPI = {};
	var base_url = 'http://pxladmindev1.herokuapp.com';
	userServiceAPI.getDetails = function(id) {
		
		/*return $http({
			method: 'POST',
			url: base_url + '/api/login',
			data: { un: username, pw: password }
		});*/

	}
	// Get all campaigns for user
	userServiceAPI.getCampaigns = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/campaignsByAcct/' + id
		});
	}
	// Get all creatives for user
	userServiceAPI.getCreatives = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/creatives/' + id
		});
	}

	userServiceAPI.addCreative = function(id, file, filename) {
		return $upload.upload({
        	method: 'POST',
        	url: base_url + '/api/creatives/' + id,
        	//headers: {'header-key': 'header-value'},
        	//withCredentials: true,
        	data: {name: filename},
	        file: file, // or list of files ($files) for html5 only
	        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
	        // customize file formData name ('Content-Disposition'), server side file variable name. 
	        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
	        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
	        //formDataAppender: function(formData, key, val){}
      	});
	}

	return userServiceAPI;
})