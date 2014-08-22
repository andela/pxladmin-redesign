angular.module('pxlAdmin.services', []).
factory('pxlAdminService', function ($http) {

	var pxlAdmin = {};
	var base_url = 'http://pxladmindev1.herokuapp.com';

	pxlAdmin.login = function(username, password) {
		return $http({
			method: 'POST',
			// Use server side endpoint
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

	return pxlAdmin;
})