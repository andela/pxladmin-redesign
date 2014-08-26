'use strict';
// Declare app level module which depends on filters, and services
angular.module('pxlAdminDashboard', [
	'ngRoute',
	'pxlAdminDashboard.controllers',
	'pxlAdminDashboard.services'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/:id', {templateUrl: 'partials/campaigns.html', controller: 'campaignController'});
	// $routeProvider.otherwise({redirectTo: '/login'});
}]);
