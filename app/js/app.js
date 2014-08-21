'use strict';
// Declare app level module which depends on filters, and services
angular.module('pxlAdmin', [
  'ngRoute',
  'pxlAdmin.services',
  'pxlAdmin.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: 'registerController'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
