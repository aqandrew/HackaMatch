// AngularJS stuff

var hackaMatch = angular.module('hackathonAidApp', []);

hackaMatch.controller('hackathonAidController', function ($scope, $http) {
	window.onSignIn = onSignIn;
	$scope.hackerName;
	$scope.school;
	$scope.hackerEmail;
	$scope.hackerPicture;
	$scope.major;
	$scope.experience = 0;
	$scope.progLanguage;

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
	    $scope.hackerPicture = profile.getImageUrl();
	    $scope.hackerEmail = profile.getEmail();

	    $scope.hackerName = profile.getGivenName();
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

	$scope.experienceClicked = function(value){
		$scope.experience = value;
		console.log(value);
	}

	$scope.submitForm = function () {
		console.log($scope.school, $scope.hackerName, $scope.hackerEmail,
					$scope.hackerPicture, $scope.major, $scope.chosenInterests,
					$scope.experience, $scope.progLanguage);

		var req = {
			method: 'POST',
			url: 'http://localhost:8080/api/users/new',
			data:{
				email: $scope.hackerEmail,
				school: $scope.school,
				name: $scope.hackerName,
				picture: $scope.hackerPicture,
				major: $scope.major,
				interest: $scope.chosenInterests.join(','),
				experience: $scope.experience,
				progLanguage: $scope.progLanguage
			}
		};

		$http(req).then(function returnData(res){
			console.log(res);
		});
	};




});