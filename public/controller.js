// public/controller.js

var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	var refresh = function() {
		$http.get('/user').success(function(response) {
			console.log("Get all users");
			$scope.userlist = response.obj;
		});
	};
	
	refresh();	
	
	$scope.addUser = function() {
		console.log("Adding: " + $scope.user);
		$http.post('/user', $scope.user).success(function(response) {
			console.log(response);
			$scope.user = "";
			refresh();
		});
	};
		
	$scope.deleteUser = function(id) {
		console.log("Deleting: " + id);
		$http.delete('/user/' + id).success(function(response) {
			refresh();
		});
	};
	
	$scope.getUser = function(id) {
		console.log(id);
		$http.get('/user/' + id).success(function(response) {
			$scope.user = response.obj;
		});
	};
	
	$scope.updateUser = function() {
		console.log("Updating: " + $scope.user._id);
		$http.put('/user/' + $scope.user._id, $scope.user).success(function(response) {
			refresh();
		});
	};
	
	$scope.clearForm = function() {
		console.log("Clearing form");
		$scope.user = "";
		refresh();
	};
}]);