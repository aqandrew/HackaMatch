// AngularJS stuff

var hackaMatch = angular.module('hackathonAidApp', []);

hackaMatch.controller('hackathonAidController', function ($scope) {
	window.onSignIn = onSignIn;
	$scope.hackerName;
	$scope.infoLabel = 'Register';
	$scope.upcomingHackathons = [
		'HackHeaven',
		'HackHell',
		'Hack Your Face Off 2012',
		'Hack a Loogie'
	]; /*function () { // TODO AJAX get present-future hackathons from MLH's website
		httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function () {

		};

		// TODO make the list year-agnostic
		httpRequest.open('GET', 'https://mlh.io/seasons/na-2017/events', true);
	};*/
	$scope.currentHackathon;

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

	$scope.setCurrentHackathon = function (hackathon) {
		$scope.currentHackathon = hackathon;
		console.log('$scope.currentHackathon: ' + $scope.currentHackathon);
	};

	function onSignIn (googleUser) {
		var profile = googleUser.getBasicProfile();

	    console.log('Full Name: ' + profile.getName());
	    console.log('Family Name: ' + profile.getFamilyName());
	    console.log("Image URL: " + profile.getImageUrl());
	    console.log("Email: " + profile.getEmail());

	    $scope.hackerName = profile.getGivenName();
	    $scope.infoLabel = 'My info';
	    $scope.$digest();
	}

	$scope.isChosen = function (interest) {
		return $scope.chosenInterests.includes(interest);
	};

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

	$scope.submitRegisterForm = function () {
		alert('huehuehue you submitted');
	};
});