// public/controller.js

var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	
	var refresh = function() {
		$http.get('/user').success(function(response) {
			console.log('Get all users');
			$scope.userlist = response._result.rows;
		});
	};
	refresh();
	
	$scope.addUser = function() {
		console.log('Adding: ' + $scope.user.username);
		$http.post('/user', $scope.user).success(function(response) {
			console.log(response);
			$scope.user = '';
			refresh();
		});
	};
		
	$scope.fun = function() {
		console.log($scope.testForm);
		console.log($scope.testForm.boo.$valid);
	};
	
	$scope.deleteUser = function(id) {
		console.log("Deleting: " + id);
		$http.delete('/user/' + id).success(function(response) {
			refresh();
		});
	};
		
}]);

myApp.directive('phoneNumber', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, el, atts, ngModel) {
			//called when model is changed from the input element
			ngModel.$parsers.unshift(function(viewValue) {
				
				var numbers = viewValue.replace(/\D/g, ''),
					char = {0:'(',3:') ',6:' - '};
				numbers = numbers.slice(0, 10);
				viewValue = '';
				
				for(var i = 0; i < numbers.length; i++) {
					viewValue += (char[i]||'') + numbers[i];
				}
				
				//set the input to formatted value
				el.val(viewValue);
				
				return viewValue;
			});
		}
	}
});
















