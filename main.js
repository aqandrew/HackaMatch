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
	$scope.userGroupName;
	$scope.userGroupID;
	$scope.groupSlackID;
	$scope.groupGitHub;
	$scope.infoLabel = 'Register';
	$scope.upcomingHackathons = [
		{
			name: 'HackHeaven',
			date: new Date(2016, 11, 29),
			location: 'Hell, NM'
		},
		{
			name: 'HackHell',
			date: new Date(2017, 1, 1)
		},
		{
			name: 'Hack Your Face Off 2017',
			date: new Date(2016, 1, 3)
		},
		{
			name: 'Hack a Loogie',
			date: new Date(2016, 1, 15)
		}
	]; /*function () { // TODO AJAX get present-future hackathons from MLH's website
		httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function () {

		};

		// TODO make the list year-agnostic
		httpRequest.open('GET', 'https://mlh.io/seasons/na-2017/events', true);
	};*/
	$scope.currentHackathon = '';
	$scope.findMode = '';
	$scope.currentGroup = '';
	$scope.dummyHackers = [
		{
			'name': 'a dog',
			'iconUrl': 'https://pbs.twimg.com/profile_images/671724177934696448/joRkM3fP.jpg',
			'school': 'Harvard University',
			'major': 'Computer Science',
			'github': 'doge666',
			'skills': 'LISP, Python, C#, Database Design, Fetch',
			'experience': 0,
			'interests': [
				'Hardware',
				'Video Games/Virtual Reality'
			]
		},
		{
			'name': 'Spongebob Squarepants',
			'iconUrl': 'https://pbs.twimg.com/profile_images/549306202245824512/tH0FYilQ.jpeg',
			'school': "Mrs. Puff's Boating School",
			'major': 'Fry Cookery',
			'github': 'spengbab',
			'skills': 'fine dining, breathing, JavaScript',
			'experience': 2,
			'interests': [
				'Full-Stack Development',
				'Video Games/Virtual Reality',
				'Mobile Development',
				'Graphic Design'
			]
		},
		{
			'name': 'Albert Lo',
			'iconUrl': 'resources/lestWeForget.png',
			'school': 'Harvard University',
			'major': 'Computer Science',
			'github': 'alo2',
			'skills': 'medicine, law, tomfoolery, JavaScript',
			'experience': 1,
			'interests': $scope.allInterests
		}
	];

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

	$scope.$watch(
		function () {
			return $scope.findMode;
		},
		function (newFindMode, oldFindMode) {
			if (newFindMode) {
				document.getElementById('myHeader').style.height = '70vh';
			}
			// No findMode selected
			else {
				document.getElementById('myHeader').style.height = '100vh';	
			}
		}
	);

	$scope.createGroup = function () {
		alert('you just created a group!');
		document.getElementById('createGroupDialog').style.display='none';
		$scopee.setFindMode('member');
	};

	$scope.clearButtonMode = function () {
		document.getElementById('chooseHackathonDialog').style.display='none';
		$scope.setFindMode('');
		$scope.setCurrentHackathon('');
	};

	$scope.setCurrentHackathon = function (hackathon) {
		document.getElementById('chooseHackathonDialog').style.display='none';
		$scope.currentHackathon = hackathon;
		document.title = 'HackaMatch // ' + hackathon.name;
		console.log('$scope.currentHackathon: ' + $scope.currentHackathon);
	};

	function onSignIn (googleUser) {
		var profile = googleUser.getBasicProfile();

	    console.log('Full Name: ' + profile.getName());
	    console.log('Family Name: ' + profile.getFamilyName());
	    $scope.hackerPicture = profile.getImageUrl();
	    $scope.hackerEmail = profile.getEmail();

	    $scope.hackerName = profile.getGivenName();
	    $scope.infoLabel = 'My info';

	    var req = {
	    	method: 'POST',
	    	url: 'https://hackahtonaid.appspot.com/api/users/getUserLogInInfo',
	    	data: {
	    		email: $scope.hackerEmail
	    	}
	    };
	    $http(req).then(function returnData(res){
	    	console.log(res);
    		$scope.userGroupName = res.data[0].name;
			$scope.userGroupID = res.data[0].groupID;
	    	$scope.school = res.data[0].school;
	    	$scope.major = res.data[0].major;
	    	$scope.experience = res.data[0].experience;
	    	$scope.chosenInterests = res.data[0].interests.split(',');
	    	$scope.progLanguage = res.data[0].progLanguages;
	    	$scope.groupSlackID = res.data[0].slackID;
	    	$scope.groupGitHub = res.data[0].ghSite;
	    });

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

	$scope.experienceClicked = function(value){
		$scope.experience = value;
		console.log(value);
	}

	$scope.submitRegisterForm = function () {
		console.log($scope.school, $scope.hackerName, $scope.hackerEmail,
					$scope.hackerPicture, $scope.major, $scope.chosenInterests,
					$scope.experience, $scope.progLanguage);

		var req = {
			method: 'POST',
			url: 'https://hackahtonaid.appspot.com/api/users/new',
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
			console.log(res.status);
			if(res.status === 200){
				document.getElementById('id01').style.display='none';
			}
		});
	};

	$scope.setFindMode = function (mode) {
		$scope.findMode = mode;
	};
});