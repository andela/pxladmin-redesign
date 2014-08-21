angular.module('pxlAdmin.services', []).
factory('pxlAdminService', function ($http) {

	var pxlAdmin = {};

	pxlAdmin.login = function(username, password) {
		return $http({
			method: 'POST',
			// Use server side endpoint
			url: 'http://pxladmindev1.herokuapp.com/api/login',
			params: {un: username, pw: password}
		});
	}

	return pxlAdmin;
})