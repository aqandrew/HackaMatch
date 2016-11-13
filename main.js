// AngularJS stuff

var hackaMatch = angular.module('hackathonAidApp', []);

hackaMatch.controller('hackathonAidController', function ($scope, $http) {
	$scope.wipeInfo = function () {
		$scope.isSignedIn = false;
		$scope.hackerName = '';
		$scope.school = '';
		$scope.hackerEmail = '';
		$scope.hackerPicture = '';
		$scope.major = '';
		$scope.experience = 0;
		$scope.progLanguage = [];
		$scope.userGroupName = '';
		$scope.userGroupID = '';
		$scope.groupSlackID = '';
		$scope.groupGitHub = '';
		$scope.infoLabel = 'Register';
		$scope.currentHackathon = '';
		$scope.findMode = '';
		$scope.currentGroup = '';
		$scope.userId;
		$scope.userGroupNameCreation = '';
		$scope.userGroupDescription = '';

		// TODO sync chosenInterests with backend info
		$scope.chosenInterests = [];
	};

	$scope.wipeInfo();
	window.onSignIn = onSignIn;

	$scope.upcomingHackathons = [
		{
			name: 'HackHeaven',
			date: new Date(2016, 11, 29),
			location: 'Heaven, WV',
			pictureUrl: 'https://s-media-cache-ak0.pinimg.com/736x/62/e8/6c/62e86c167e7075e24399a5f73f689a6d.jpg'
		},
		{
			name: 'HackHell',
			date: new Date(2017, 1, 1),
			location: 'Hell, NM',
			pictureUrl: 'http://vignette1.wikia.nocookie.net/jedipedia/images/0/06/Exogorthen.jpg/revision/latest?cb=20090224172627&path-prefix=de'
		},
		{
			name: 'Hack Your Face Off 2017',
			date: new Date(2016, 1, 3),
			location: 'Troy, NY',
			pictureUrl: 'http://pixel.nymag.com/imgs/daily/vulture/2015/10/09/09-dancing-skeleton.w529.h529.jpg'
		},
		{
			name: 'Hack a Loogie',
			date: new Date(2016, 1, 15),
			location: 'Morristown, NJ',
			pictureUrl: 'http://www.newyork-injurylawyerblog.com/wp-content/uploads/sites/204/2016/03/T0oUM9k2-300x300.jpg'
		}
	]; /*function () { // TODO AJAX get present-future hackathons from MLH's website
		httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function () {

		};

		// TODO make the list year-agnostic
		httpRequest.open('GET', 'https://mlh.io/seasons/na-2017/events', true);
	};*/

	$scope.hackerGroups = [
		{
			id: 0,
			name: 'Team Spongedog',
			members: [5, 6],
			description: 'bark bark I am a happy sponge'
		},
		{
			id: 1,
			name: 'Dogbert',
			members: [5, 7],
			description: 'we are unstoppable'
		},
		{
			id: 2,
			name: 'Everyone',
			members: [5, 6, 7],
			description: 'hivemind'
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

	$scope.getHackerById = function (someId) {
		return $scope.dummyHackers.find(function (someHacker) {
			return someHacker.id == someId;
		});
	};

	$scope.createGroup = function () {
		alert('you just created a group!');
		document.getElementById('createGroupDialog').style.display = 'none';
		$scope.setFindMode('member');
	};

	$scope.makeGroup = function() {
		var req = {
			method: 'POST',
			url: 'https://hackahtonaid.appspot.com/api/users/newGroup',
			data : {
				location: $scope.currentHackathon,
				name: $scope.userGroupName,
				gitHub: $scope.groupGitHub,
				slack: $scope.groupSlackID,
				description: $scope.userGroupDescription,
				userId: $scope.userId
			}
		};

		$http(req).then(function returnData(res){
			document.getElementById('createGroupDialog').style.display='none';
			$scope.setFindMode('member');
		});
	};

	$scope.clearButtonMode = function () {
		document.getElementById('chooseHackathonDialog').style.display = 'none';
		$scope.setFindMode('');
		$scope.setCurrentHackathon('');
	};

	$scope.setCurrentHackathon = function (hackathon) {
		document.getElementById('chooseHackathonDialog').style.display = 'none';
		$scope.currentHackathon = hackathon;
		document.title = 'HackaMatch // ' + hackathon.name;
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
    		$scope.userGroupName = res.data[0].groupName;
			$scope.userGroupID = res.data[0].groupID;
	    	$scope.school = res.data[0].school;
	    	$scope.major = res.data[0].major;
	    	$scope.experience = res.data[0].experience;
	    	$scope.chosenInterests = res.data[0].interests.split(',');
	    	$scope.progLanguage = res.data[0].progLanguages;
	    	$scope.groupSlackID = res.data[0].slackID;
	    	$scope.groupGitHub = res.data[0].ghSite;
	    	$scope.userGroupDescription = res.data[0].description;
	    	$scope.userId = res.data[0].ID;
	    });

	    $scope.isSignedIn = true;
	    $scope.$digest();
	}

	$scope.signOut = function () {
		var auth2 = gapi.auth2.getAuthInstance();
	    auth2.signOut().then(function () {
			$scope.wipeInfo();
			$scope.isSignedIn = false;
			$scope.$digest();
			console.log('User signed out.');
	    });
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
				document.getElementById('registerDialog').style.display='none';
			}
		});
	};

	$scope.dummyHackers = [];

	$scope.setFindMode = function (mode) {
		if(mode === 'members'){
			//get data for users from backend
			var req = {
				method: 'GET',
				url: 'https://hackahtonaid.appspot.com/api/users/'
			};

			$http(req).then(function returnData(res){
				for(var i = 0; i < res.data.items.length; i++){
					console.log(res.data.items[i]);
					var temp = res.data.items[i];
					 $scope.dummyHackers.push({
					 	'id': temp.ID,
					 	'name': temp.name,
					 	'iconUrl' : temp.pictureURL,
					 	'major' : temp.major,
					 	'github' : temp.userGitHub,
					 	'skills' : temp.progLanguages,
					 	'experience' : temp.experience,
					 	'interests' : [
					 		'None']
					 });
				};

				$scope.findMode = mode;
			});
		}
	};

	// 	$scope.dummyHackers = [
	// 	{
	// 		'id': 5,
	// 		'name': 'a dog',
	// 		'iconUrl': 'https://pbs.twimg.com/profile_images/671724177934696448/joRkM3fP.jpg',
	// 		'school': 'Harvard University',
	// 		'major': 'Computer Science',
	// 		'github': 'doge666',
	// 		'skills': 'LISP, Python, C#, Database Design, Fetch',
	// 		'experience': 0,
	// 		'interests': [
	// 			'Hardware',
	// 			'Video Games/Virtual Reality'
	// 		]
	// 	},
	// 	{
	// 		'id': 7,
	// 		'name': 'Albert Lo',
	// 		'iconUrl': 'resources/lestWeForget.png',
	// 		'school': 'Harvard University',
	// 		'major': 'Computer Science',
	// 		'github': 'alo2',
	// 		'skills': 'medicine, law, tomfoolery, JavaScript',
	// 		'experience': 1,
	// 		'interests': [
	// 			'Data Science',
	// 			'Frontend Development',
	// 			'Backend Development',
	// 			'Full-Stack Development',
	// 			'Mobile Development',
	// 			'Artificial Intelligence',
	// 			'Hardware',
	// 			'Video Games/Virtual Reality',
	// 			'Graphic Design',
	// 			'Business'
	// 		]
	// 	},
	// 	{
	// 		'id': 6,
	// 		'name': 'Spongebob Squarepants',
	// 		'iconUrl': 'https://pbs.twimg.com/profile_images/549306202245824512/tH0FYilQ.jpeg',
	// 		'school': "Mrs. Puff's Boating School",
	// 		'major': 'Fry Cookery',
	// 		'github': 'spengbab',
	// 		'skills': 'fine dining, breathing, JavaScript',
	// 		'experience': 2,
	// 		'interests': [
	// 			'Full-Stack Development',
	// 			'Video Games/Virtual Reality',
	// 			'Mobile Development',
	// 			'Graphic Design'
	// 		]
	// 	}
	// ];
});