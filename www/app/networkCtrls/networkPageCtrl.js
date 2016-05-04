/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
	var app = angular.module('networkPageCtrl', ['networkListingCtrl', 'profileHeaderCtrl']);
	app.controller("NetworkPageController", ['$http', '$element', '$scope', '$rootScope', 'ProfileDataBlock',
	function($http, element, $scope, $rootScope, profileDataBlock) {
		var networkPageCtrl = this;
		//networkPageCtrl.uplineProfile = {};
		/*
		networkPageCtrl.getSponsor = function(href) {
			//console.log("Get upline : "+href);
			$.ajax({
				'type' : 'GET',
				'headers' : {
					'Authorization' : 'Bearer ' + profileDataBlock.sessionToken
				},
				'url' : href + '?expand=profilePicture,cumulativeMetricsProfile',
				'success' : function(result) {
					//console.log("Upline");
					//console.log(result);
					var image;
					if ( typeof (result.profilePicture.sizes[1]) != "undefined") {
						image = result.profilePicture.sizes[1].media;
					} else {
						image = result.profilePicture.sizes[0].media;
					}
					//Change to Thailand Server
                    image = image.replace('d27zzi0gwko92h.cloudfront.net','api.unicity-th.com');
					
					var language = localStorage.getItem("language");
					var name = "";
					if (language == "th") {
						name = result.humanName['fullName@th'];
					} else {
						name = result.humanName.fullName;
					}
					networkPageCtrl.uplineProfile = {
						"name" : name,
						"image" : image,
						"email" : result.email,
						"phone" : result.workPhone != "" ? result.workPhone : result.homePhone
						//"pin" : profileDataBlock.pinName[result.metricsProfile.rank],
						//"pinImage" : "./imgs/pin/" + profileDataBlock.pinImage[data.metricsProfile.rank]
					};
					$scope.$apply();
				},
				'error' : function() {
				}
			});
		};
		*/
		$scope.$watch(function() {
			return profileDataBlock.data;
		}, function(v) {
			if (v !== undefined) {
				var data = profileDataBlock.get();
				//networkPageCtrl.getSponsor(data.sponsor.href);
			}
		});

	}]);
})();

