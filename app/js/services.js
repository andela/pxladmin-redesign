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
			data: { 
				accountData: {
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
				}
			}
		});
	}

	// Get all campaigns for user
	pxlAdmin.getCampaigns = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/campaignsByAcct/' + id
		});
	}

	// Get single campaign
	pxlAdmin.getCampaign = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/campaign/' + id
		});
	}

	// Update the selected campaign
	pxlAdmin.updateCampaign = function(campaign) {
		return $http({
			method: 'POST',
			url: base_url + '/api/campaign/update/' + campaign._id,
			data: {
				campaign: {
					_id: campaign._id,
					owner: campaign.owner,
					landingUrl: campaign.landingUrl,
					name: campaign.name
				}
			}
		});
	}

	// Create a new campaign
	pxlAdmin.createCampaign = function(owner, campaign) {
		return $http({
			method: 'POST',
			url: base_url + '/api/campaign/create/',
			data: {
				campaign: {
					owner: owner,
					campaignId: "N/A",
					sampleAssetUrl: "N/A",
					pixelId: "N/A",
					disabled: false,
					primary: campaign.creative,
					landingUrl: campaign.landingUrl,
					name: campaign.name
				}
			}
		});
	}

	pxlAdmin.enableCampaign = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/campaign/enable/' + id
		})
	}

	pxlAdmin.disableCampaign = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/campaign/disable/' + id
		})
	}

	// Get all creatives for user
	pxlAdmin.getCreatives = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/creatives/' + id
		});
	}

	// Creates a single creative
	pxlAdmin.addCreative = function(creative) {
		return $http({
			method: 'POST',
			url: base_url + '/api/creatives/create/',
			data: creative
		})
	}

	// Adds creative to the campaign
	pxlAdmin.addCampaignCreative = function(creative, campaign) {
		var creatives = [];
		creatives.push(creative);
		return $http({
			method: 'POST',
			url: base_url + '/api/campaign/addCreative/' + campaign._id,
			data: {
				campaign: campaign,
				newCreatives: creatives
			}
		});
	}

	// Removes creative from the campaign
	pxlAdmin.removeCampaignCreative = function(creative, campaign) {
		var creatives = [];
		creatives.push(creative);
		return $http({
			method: 'POST',
			url: base_url + '/api/campaign/removeCreative/' + campaign._id,
			data: {
				campaign: campaign,
				newCreatives: creatives
			}
		});
	}

	// Set primary creative of the campaign
	pxlAdmin.newPrimaryCreative = function(creative, campaign) {
		return $http({
			method: 'POST',
			url: base_url + '/api/campaign/newPrimary/' + campaign._id,
			data: {
				campaign: campaign,
				primary: creative
			}
		});
	}

	// Get account representation
	pxlAdmin.getAccount = function(id) {
		return $http({
			method: 'GET',
			url: base_url + '/api/account/' + id
		})
	}

	// Update account
	pxlAdmin.updateAccount = function(account) {
		return $http({
			method: 'POST',
			url: base_url + '/api/account/update/',
			data: { accountData: account }
		})
	}

	return pxlAdmin;
});