/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
	var app = angular.module('profileHeaderCtrl', ['pageCtrl']);
	app.factory("ProfileDataBlock", ['$rootScope', 'Configuration', 'ShareComponents',
	function($rootScope, config, sharedComponents) {
		var profileDataBlock = {
			sessionToken : "",
			href : "",
			pinShort : {
				"Dst" : "1",
				"Ph1" : "2",
				"Mgr" : "3",
				"SrM" : "4",
				"ExM" : "5",
				"Dir" : "6",
				"SrD" : "7",
				"ExD" : "8",
				"PrD" : "9",
				"PrS" : "10",
				"PrR" : "11",
				"DIA" : "12"
			},
			pinImage : {
				"Dst" : "01-distributor.png",
				"Ph1" : "02-phase-1.png",
				"Mgr" : "03-manager.png",
				"SrM" : "04-senior-manager.png",
				"ExM" : "05-executive-manager.png",
				"Dir" : "06-drector.png",
				"SrD" : "07-senior-director.png",
				"ExD" : "08-executive-director.png",
				"PrD" : "09-presidential-director.png",
				"PrS" : "10-presidential-sapphire.png",
				"PrR" : "11-presidential-ruby.png",
				"DIA" : "12-presidential-diamond.png",
			},
			pinName : {
				"Dst" : _echo("pinshort", "th", "distributor"),
				"Ph1" : _echo("pinshort", "th", "phase_1"),
				"Mgr" : _echo("pinshort", "th", "manager"),
				"SrM" : _echo("pinshort", "th", "senior_manager"),
				"ExM" : _echo("pinshort", "th", "executive_manager"),
				"Dir" : _echo("pinshort", "th", "director"),
				"SrD" : _echo("pinshort", "th", "senior_director"),
				"ExD" : _echo("pinshort", "th", "executive_director"),
				"PrD" : _echo("pinshort", "th", "presidential_director"),
				"PrS" : _echo("pinshort", "th", "presidential_sapphire"),
				"PrR" : _echo("pinshort", "th", "presidential_ruby"),
				"DIA" : _echo("pinshort", "th", "presidential_diamond"),
			},
			pv :0,
			tv:0,
			ov:0
		};

		if (!config.debug) {

			profileDataBlock.get = function() {
				return profileDataBlock.data;
			};
			profileDataBlock.getData = function(callback, retry) {
				if (retry > 5) {
					//callback();
					navigator.notification.alert("Cannot retrieve your profile data. Please try again");
					$(".loading-container").addClass("hide");
					return;
				}
				//console.log("Profiling : " + profileDataBlock.sessionToken);

				$.ajax({
					'type' : 'GET',
					'headers' : {
						'Authorization' : 'Bearer ' + profileDataBlock.sessionToken
					},
					'url' : profileDataBlock.href + '?expand=metricsProfile,metricsProfileHistory,profilePicture,achievementsHistory,cumulativeMetricsProfile',
					'success' : function(result) {
						console.log(result);
						// check if user was authenticated
						profileDataBlock.data = result;
						console.log("Profile Data Loaded");


						var today = new Date();
						var this_date = today.getDate();
						var this_month = today.getMonth();
						var this_year = today.getFullYear();
						var pv,ov,tv;
						if (this_date < 6) {
							this_year = this_month - 1 < 0 ? this_year - 1 : this_year;
							this_month = this_month - 1 < 0 ? 11 : this_month - 1;
							pv = profileDataBlock.data.metricsProfileHistory.items[1].value.pv;
							ov = profileDataBlock.data.metricsProfileHistory.items[1].value.ov;
							tv = profileDataBlock.data.metricsProfileHistory.items[1].value.tv;
						}
						else
						{
							pv = profileDataBlock.data.metricsProfile.pv;
							ov = profileDataBlock.data.metricsProfile.ov;
							tv = profileDataBlock.data.metricsProfile.tv;
						}


						profileDataBlock.currentData = {
							"pv" : pv,
							"ov" : ov,
							"tv" : tv,
						};


						$rootScope.$broadcast('ProfileComplete');
						callback();
						//profileDataBlock.$broadcast("DataBlockChanged");
					},
					'error' : function() {
						profileDataBlock.data = {};
						setTimeout(function() {
							profileDataBlock.getData(callback, retry + 1);
						}, 500);

					}
				});
			};
		}
		return profileDataBlock;
	}]);
	app.controller("ProfileHeaderController", ['$http', '$element', '$scope', 'ProfileDataBlock', 'ShareComponents',
	function($http, element, $scope, profileDataBlock, sharedComponents) {
		var profileCtrl = this;

		profileCtrl.profile = {
			"name" : "Profile Name",
			"pin" : "Profile Position",
			"pinImage" : ''
		};
		profileCtrl.upload = false;
		profileCtrl.getImage = function() {
			$.ajax({
				'type' : 'GET',
				'headers' : {
					'Authorization' : 'Bearer ' + profileDataBlock.sessionToken
				},
				'url' : 'https://hydra.unicity.net/v5/customers/me/profilePicture',
				'success' : function(result) {
					if(typeof(result.sizes[1])!="undefined")
                    {
                      //profileCtrl.profile.image = result.sizes[1].media.replace('d27zzi0gwko92h.cloudfront.net','api.unicity-th.com');
											profileCtrl.profile.image = result.sizes[1].media;
                    }
                    else
                    {
                    //  profileCtrl.profile.image = result.sizes[0].media.replace('d27zzi0gwko92h.cloudfront.net','api.unicity-th.com');
											profileCtrl.profile.image = result.sizes[0].media;
                    }
                    //Change to Thailand Server
                    //profileCtrl.profile.image;
										  localStorage.setItem("profileimg",profileCtrl.profile.image);
                    profileCtrl.upload = false;
					$scope.$apply();
				},
				'error' : function() {
				}
			});
		};
		$('#profile-image-upload').change(function() {
			profileCtrl.uploadImage();
		});
		profileCtrl.uploadImage = function() {
			var photo = $('#profile-image-upload')[0].files[0];
			profileCtrl.upload = true;
			profileCtrl.profile.image = "./imgs/loading.gif";
			$scope.$apply();
			var form_data = new FormData();
			form_data.append('media', photo);
			$.ajax({
				'type' : 'POST',
				'headers' : {
					'Authorization' : 'Bearer ' + profileDataBlock.sessionToken
				},
				'data' : form_data,
				'contentType' : false,
				'processData' : false,
				'url' : 'https://hydra.unicity.net/v5/customers/me/profilePicture',
				'success' : function(result) {

					setTimeout(function(){
						profileCtrl.getImage();
						$scope.$apply();
					},3000);
				},
				'error' : function() {
				}
			});
		};
		$scope.$on('ProfileComplete', function() {

			var data = profileDataBlock.get();
			profileCtrl.getImage();
			console.log("Arrange Profile Header");
			if (data !== undefined) {
				//console.log(data);
                                if (window.localStorage) {
                                    localStorage.setItem("baid", data.unicity);
				}

				var name;
				var language = localStorage.getItem("language");
				if (language=="th") {
					name = data.humanName['fullName@th'];
				} else {
					name = data.humanName.fullName;
				}

localStorage.setItem("name", name);
localStorage.setItem("rank", data.cumulativeMetricsProfile.highestRankShort);

				var today = new Date();
				var this_date = today.getDate();
				var this_month = today.getMonth();
				var this_year = today.getFullYear();
				var pv,ov,tv;
				if (this_date < 6) {
					this_year = this_month - 1 < 0 ? this_year - 1 : this_year;
					this_month = this_month - 1 < 0 ? 11 : this_month - 1;
					pv = data.metricsProfileHistory.items[1].value.pv;
					ov = data.metricsProfileHistory.items[1].value.ov;
					tv = data.metricsProfileHistory.items[1].value.tv;
				}
				else
				{
					pv = data.metricsProfile.pv;
					ov = data.metricsProfile.ov;
					tv = data.metricsProfile.tv;
				}
				profileDataBlock.pv = pv;
				profileDataBlock.ov = ov;
				profileDataBlock.tv = tv;

				profileCtrl.profile = {
					"name" : name,
					"pin" : profileDataBlock.pinName[data.cumulativeMetricsProfile.highestRankShort],
					"pinImage" : "./imgs/pin/" + profileDataBlock.pinImage[data.cumulativeMetricsProfile.highestRankShort],
					"pv" : profileDataBlock.pv,
					"tv" : profileDataBlock.tv,
					"ov" : profileDataBlock.ov

				};



			}
			/*if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var user_id = data.unicity;
					var lat = position.coords.latitude;
					var long = position.coords.longitude;
					$http.get('http://mobile.unicity-th.com/wp-admin/admin-ajax.php?action=unimobiapp_set_position&user_id=' + user_id + '&lat=' + lat + '&long=' + long).success(function(response) {
						console.log("Set Position");
						console.log(response);
					});
				});
			}*/

		});






		$scope.$watch(function() {
			return localStorage.getItem("language");
		}, function(v) {
			profileCtrl.onLanguageChange(v);
		});
		profileCtrl.onLanguageChange = function(language) {
			var data = profileDataBlock.get();
			var name;
			if (language=="th") {
				name = data.humanName['fullName@th'];
			} else {
				name = data.humanName.fullName;
			}


			profileCtrl.profile.name = name;
			profileDataBlock.pinName = {
				"Dst" : _echo("pinshort", "th", "distributor"),
				"Ph1" : _echo("pinshort", "th", "phase_1"),
				"Mgr" : _echo("pinshort", "th", "manager"),
				"SrM" : _echo("pinshort", "th", "senior_manager"),
				"ExM" : _echo("pinshort", "th", "executive_manager"),
				"Dir" : _echo("pinshort", "th", "director"),
				"SrD" : _echo("pinshort", "th", "senior_director"),
				"ExD" : _echo("pinshort", "th", "executive_director"),
				"PrD" : _echo("pinshort", "th", "presidential_director"),
				"PrS" : _echo("pinshort", "th", "presidential_sapphire"),
				"PrR" : _echo("pinshort", "th", "presidential_ruby"),
				"PDi" : _echo("pinshort", "th", "presidential_diamond"),
			};



							var today = new Date();
							var this_date = today.getDate();
							var this_month = today.getMonth();
							var this_year = today.getFullYear();
							var pv,ov,tv;
							if (this_date < 6) {
								this_year = this_month - 1 < 0 ? this_year - 1 : this_year;
								this_month = this_month - 1 < 0 ? 11 : this_month - 1;
								pv = data.metricsProfileHistory.items[1].value.pv;
								ov = data.metricsProfileHistory.items[1].value.ov;
								tv = data.metricsProfileHistory.items[1].value.tv;
							}
							else
							{
								pv = data.metricsProfile.pv;
								ov = data.metricsProfile.ov;
								tv = data.metricsProfile.tv;
							}
							profileDataBlock.pv = pv;
							profileDataBlock.ov = ov;
							profileDataBlock.tv = tv;




                        profileCtrl.profile = {
						"name" : name,
						"pin" : profileDataBlock.pinName[data.cumulativeMetricsProfile.highestRankShort],
						"pinImage" : "./imgs/pin/" + profileDataBlock.pinImage[data.cumulativeMetricsProfile.highestRankShort],
						"pv" : profileDataBlock.pv,
						"tv" : profileDataBlock.tv,
						"ov" : profileDataBlock.ov

					};
		};
		$scope.$watch(function() {
			return profileDataBlock.sessionToken;
		}, function(v) {
			//console.log("Profiling : " + v);

			if (v !== undefined) {
				var data = profileDataBlock.get();

				if (data !== undefined) {
					var name;
					var language = localStorage.getItem("language");
					if (language=="th") {
						name = data.humanName['fullName@th'];
					} else {
						name = data.humanName.fullName;
					}


					profileCtrl.profile = {
						"name" : name,
						"image" : "./imgs/profile/default.png",
						"pin" : profileDataBlock.pinName[data.cumulativeMetricsProfile.highestRankShort],
						"pinImage" : "./imgs/pin/" + profileDataBlock.pinImage[data.cumulativeMetricsProfile.highestRankShort]
						//"pinImage": data.Highest_Achieved_Rank.Rank_Name
					};
				}
			}
		});

	}]);
})();
