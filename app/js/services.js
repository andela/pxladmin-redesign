angular.module('pxlAdmin.services', ['angularFileUpload']).
factory('pxlAdminService', function ($http, $upload) {

	var pxlAdmin = {};
	var base_url = 'http://pxladmindev1.herokuapp.com';

	pxlAdmin.login = function(username, password) {
		return $http({
			method: 'POST',
			url: base_url + '/api/login',
			data: { un: username, pw: password }
		});
	}

	pxlAdmin.register = function(userdetails) {
		return $http({
			method: 'POST',
			url: base_url + '/api/account/usercreate',
			data: { accountData: {
				AmountOutstanding: 0,
				TotalMonthSpend: 0,
				campaignLimit: 0,
				companyName: userdetails.companyName,
				contactEmail: userdetails.contactEmail,
	  			contactFirst: userdetails.contactFirst,
	  			contactLast: userdetails.contactLast,
	  			contactPass: userdetails.contactPass,
	  			contactPhone: userdetails.contactPhone,
	  			sfdcId: userdetails.sfdcId,
	  			userLimit: 1
			} }
		});
	}

	pxlAdmin.getDetails = function(id) {
		
		/*return $http({
			method: 'POST',
			url: base_url + '/api/login',
			data: { un: username, pw: password }
		});*/

	}
	// Get all campaigns for user
	pxlAdmin.getCampaigns = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/campaignsByAcct/' + id
		});
	}
	// Get all creatives for user
	pxlAdmin.getCreatives = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/creatives/' + id
		});
	}

	pxlAdmin.addCreative = function(id, file, filename) {
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

	return pxlAdmin;
})