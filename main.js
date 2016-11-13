// AngularJS stuff

var hackaMatch = angular.module('hackathonAidApp', []);

hackaMatch.controller('hackathonAidController', function ($scope) {
	window.onSignIn = onSignIn;
	$scope.hackerName;
	$scope.infoLabel = 'Register';

	$scope.allInterests = [
		'Data Science',
		'Frontend Development',
		'Backend Development',
		'Full-Stack Development',
		'Mobile Development',
		'Artificial Intelligence',
		'Hardware',
		'Video Games/Virtual Reality',
		'Graphic Design',
		'Business'
	];

	// TODO sync chosenInterests with backend info
	$scope.chosenInterests = [];

	function onSignIn (googleUser) {
		var profile = googleUser.getBasicProfile();

	    console.log('Full Name: ' + profile.getName());
	    //console.log('Given Name: ' + profile.getGivenName());
	    console.log('Family Name: ' + profile.getFamilyName());
	    console.log("Image URL: " + profile.getImageUrl());
	    console.log("Email: " + profile.getEmail());

	    $scope.hackerName = profile.getGivenName();
	    $scope.infoLabel = 'My Info';
	    $scope.$digest();
	};

	$scope.isChosen = function (interest) {
		return $scope.chosenInterests.includes(interest);
	}

	$scope.kebabify = function (someString) {
		return someString.replace(/\s+/g, '-').toLowerCase();
	};

	$scope.interestClicked = function (interest) {
		// Deactivate this interest.
		if ($scope.isChosen(interest)) {
			$scope.chosenInterests.splice($scope.chosenInterests.indexOf(interest), 1);
		}
		// Activate this interest.
		else {
			$scope.chosenInterests.push(interest);
		}
	};

	$scope.submitForm = function () {
		alert('huehuehue you submitted');
	};
});