/*
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
*/
angular.module('pxlAdminDashboard', [
	'ui.router',
	'pxlAdminDashboard.controllers',
	'pxlAdminDashboard.services'
]).
config(function($stateProvider, $urlRouterProvider) {
    
    // $urlRouterProvider.otherwise('/:id');
    
    $stateProvider
        
        // CAMPAIGNS PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('campaigns', {
            url: '/:id',
	        views: {

	            // the main template will be placed here (relatively named)
	            '': {
	            	templateUrl: 'partials/header.html',
	            	controller: 'userController'
	            },

	            'campaignView@campaigns': { 
	                templateUrl: 'partials/campaigns.html',
	                controller: 'campaignController'
	            }
	        }      
        });
        
});
