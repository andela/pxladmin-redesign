'use strict';

angular.module('pxlAdmin', [
	'ui.router',
	'pxlAdmin.controllers',
	'pxlAdmin.services'
]).
config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/users');
    
    $stateProvider
        .state('users', {
            url: '/users',
            templateUrl: '../views/home/login.html',
            controller: 'loginController',
		    data: {
		    	title: 'PXLAdmin - Login'
		    }     
        })
        .state('users.register', {
            url: '/register',
            templateUrl: '../views/home/register.html',
            controller: 'registerController',
		    data: {
		    	title: 'PXLAdmin - Register'
		    }
        })
        .state('dashboard', {
            url: '/dashboard/:id',
	        views: {
	        	
	            '': {
	            	templateUrl: 'views/dashboard/header.html',
	            	controller: 'userController'
	            },

	            'campaignView@dashboard': { 
	                templateUrl: 'views/dashboard/campaigns.html',
	                controller: 'campaignController'
	            }
	        },
		    data: {
		    	title: 'PXLAdmin - Dashboard'
		    }      
        });
        
});