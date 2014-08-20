'use strict';
// Declare app level module which depends on filters, and services
angular.module('pxlAdmin', [
  'ngRoute',
  'pxlAdmin.services',
  'pxlAdmin.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginController'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
