/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
	var app = angular.module('networkListingCtrl', ['profileHeaderCtrl', 'profileHeaderCtrl', 'pageCtrl','successTrackerCtrl']);
	app.factory("NetworkFrontline", ['$rootScope', 'ProfileDataBlock',
	function($rootScope, profileDataBlock) {
		var networkFrontline = {};
		networkFrontline.frontline = [];
		networkFrontline.networkDepth = [];
		var isDepth = 0;
		var tmpprofile;
		var pinImage = {
			"undefined" : "01-distributor.png",
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
		};
		var pinName = {
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
			};
		$rootScope.$watch(function() {
			return localStorage.getItem("language");
		}, function(v) {

		/*	if(localStorage.getItem("isDepth") == 1){
						networkFrontline.openDepthPage(tmpprofile);
			}else{
						networkFrontline.getBaseline();
			}*/
	networkFrontline.getBaseline();
			pinName = {
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
			};
		});



		/*$rootScope.$watch(function() {

			console.log("monthid=>"+localStorage.getItem("monthid"));
			return localStorage.getItem("monthid");
		}, function(v) {
			console.log("function");
			networkFrontline.getBaseline1();
			pinName = {
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
			};


		});*/


		networkFrontline.getBaseline1 = function() {
			networkFrontline.frontline = [];
			var token = profileDataBlock.sessionToken;
			var href = "https://hydra.unicity.net/v5/customers/me";
			//console.log("Get Baseline");
			$.ajax({
				'type' : 'GET',
				'headers' : {
					'Authorization' : 'Bearer ' + token
				},
				'url' : href + '/sponsoredCustomers?expand=metricsProfile,metricsProfileHistory,profilePicture,cumulativeMetricsProfile&orderBy=metricsProfile.ov%20desc',
				'success' : function(result) {
				//	console.log("token === >"+token);
				//		console.log("href === >"+href);
					//var dataSet = JSON.stringify(result, undefined, 4);
					var today = new Date();
					var this_date = today.getDate();
					var language = localStorage.getItem("language");
					for (var i in result.items) {
						var frontline = result.items[i];
							console.log("frontline : "+frontline);
						//console.log("Frontline");
						//console.log(frontline);
						var profileImage;
						//console.log(frontline.profilePicture.sizes);
						if (frontline.profilePicture.sizes != null && frontline.profilePicture.sizes.length!=0) {
							//console.log("Has profile image");
							profileImage = frontline.profilePicture.sizes[0].media;
							if (frontline.profilePicture.sizes[1] != null) {
								profileImage = frontline.profilePicture.sizes[1].media;
							}

							//	profileImage = profileImage.replace('d27zzi0gwko92h.cloudfront.net','api.unicity-th.com');

						} else {
							profileImage = "./imgs/pin/"+pinImage[frontline.cumulativeMetricsProfile.highestRankShort];
						}
						//Change to Thailand Server


						var name = "";
					/*	if (language == "th") {
							name = frontline.humanName['fullName@th'];
						} else {
							name = frontline.humanName.fullName;
						}*/

						if (language == "th") {
							if(typeof frontline.humanName['fullName@th'] != 'undefined'){

								name = frontline.humanName['fullName@th'];
							}else{
									name = frontline.humanName.fullName;
							}
						} else {
							name = frontline.humanName.fullName;
						}

		console.log("frontline x : "+name);
						var profile = {
							"id" : frontline.unicity,
							"name" : name,
							"image" : profileImage,
							"email" : frontline.email,
							"phone" : frontline.workPhone != "" ? frontline.workPhone : frontline.homePhone,
						};

							month_id = localStorage.getItem("monthid")-1;
							console.log("frontline x : "+frontline.metricsProfileHistory.items[month_id].period);
						profile.pin = frontline.cumulativeMetricsProfile.highestRankShort;

						if(month_id == 1 ){

						var cal  = frontline.metricsProfileHistory.items[month_id].value.ov ;

						var cal1  = frontline.metricsProfileHistory.items[2].value.ov ;

					//	var total = cal - cal1;
						var total = 0 ;
						var img = "";
						var style = "";
						var minus = "";
						//	total = Math.round(total);


						if(cal1==0 && cal >0){
							cal1 = 1;
						}
						var per = 100/cal1 * cal;
						per = per-100;

						if(cal1 == cal){
								per = 0;
								total = 0;
						}else{

						}

							console.log("calov : "+cal1+"/"+cal);
					/*	if(total == 0){
								per = 0;
						}*/
						total = Math.round(per);
						total = Math.round(total);
						if(total>0&&total<1){
							total = 0;
						}
						if (total > 0) {
							img = "./imgs/icon_up.png";
							style = "width:8px;height:16px";
							minus = "+";
						}else if(total == 0){
							img =  "./imgs/stay.gif";
								style = "width:20px;height:20px";
									minus = "";
						}else{
							img = "./imgs/icon_down.png";
								style = "width:8px;height:16px";
									minus = "";
						}


							if(per>0&&per<1){
								per = 0;
							}
							profile.calov = "";
						profile.icon_img = img;
						profile.icon_style = style;
						profile.calov = "("+minus+""+commaSeparateNumber(Math.round(total))+"%)";
						profile.total = Math.round(total);
						}

						profile.pv = frontline.metricsProfileHistory.items[month_id].value.pv;
						profile.ov = frontline.metricsProfileHistory.items[month_id].value.ov;
						profile.tv = frontline.metricsProfileHistory.items[month_id].value.tv;


					/*
						old
						profile.pv = frontline.metricsProfileHistory.items[month_id].value.pv;
						profile.ov = frontline.metricsProfileHistory.items[month_id].value.ov;
						profile.tv = frontline.metricsProfileHistory.items[month_id].value.tv;*/


					/*	if (frontline.sponsoredCustomers != null) {
							profile.depth = frontline.sponsoredCustomers.href;
						}
						profile.pinLabel = pinName[profile.pin];
						profile.pinImage = "./imgs/pin/"+pinImage[profile.pin];*/
						networkFrontline.frontline.push(profile);

								console.log("frontline1 x : ");
					}

					console.log("Baseline  x : ");
					console.log(networkFrontline.frontline);
					$rootScope.$broadcast('Baseline');

				},
				'error' : function() {
				}
			});
		};



		networkFrontline.getBaseline = function() {
			networkFrontline.frontline = [];
			var token = profileDataBlock.sessionToken;
			var href = "https://hydra.unicity.net/v5/customers/me";
			//console.log("Get Baseline");
			$.ajax({
				'type' : 'GET',
				'headers' : {
					'Authorization' : 'Bearer ' + token
				},
				'url' : href + '/sponsoredCustomers?expand=metricsProfile,metricsProfileHistory,profilePicture,cumulativeMetricsProfile&orderBy=metricsProfile.ov%20desc',
				'success' : function(result) {
				//	console.log("token === >"+token);
				//		console.log("href === >"+href);
					//var dataSet = JSON.stringify(result, undefined, 4);
					var today = new Date();
					var this_date = today.getDate();
					var language = localStorage.getItem("language");
					for (var i in result.items) {
						var frontline = result.items[i];
						//console.log("Frontline");
						//console.log(frontline);
						var profileImage;
						//console.log(frontline.profilePicture.sizes);
						if (frontline.profilePicture.sizes != null && frontline.profilePicture.sizes.length!=0) {
							//console.log("Has profile image");
							profileImage = frontline.profilePicture.sizes[0].media;
							if (frontline.profilePicture.sizes[1] != null) {
								profileImage = frontline.profilePicture.sizes[1].media;
							}
							  //profileImage = profileImage.replace('d27zzi0gwko92h.cloudfront.net','api.unicity-th.com');
						} else {
							profileImage = "./imgs/pin/"+pinImage[frontline.cumulativeMetricsProfile.highestRankShort];
						}
						//Change to Thailand Server

						if(profileImage == "./imgs/pin/undefined"){
							profileImage = "./imgs/pin/01-distributor.png";
						}

						var name = "";
					/*	if (language == "th") {
							name = frontline.humanName['fullName@th'];
						} else {
							name = frontline.humanName.fullName;
						}*/

						if (language == "th") {
							if(typeof frontline.humanName['fullName@th'] != 'undefined'){

								name = frontline.humanName['fullName@th'];
							}else{
									name = frontline.humanName.fullName;
							}
						} else {
							name = frontline.humanName.fullName;
						}

						var profile = {
							"id" : frontline.unicity,
							"name" : name,
							"image" : profileImage,
							"email" : frontline.email,
							"phone" : frontline.workPhone != "" ? frontline.workPhone : frontline.homePhone,
						};
						if (this_date < 6) {
							profile.pin = frontline.cumulativeMetricsProfile.highestRankShort;
							profile.pv = frontline.metricsProfileHistory.items[1].value.pv;
							profile.ov = frontline.metricsProfileHistory.items[1].value.ov;
							profile.tv = frontline.metricsProfileHistory.items[1].value.tv;
						} else {
							profile.pin = frontline.cumulativeMetricsProfile.highestRankShort;
							profile.pv = frontline.metricsProfile.pv;
							profile.ov = frontline.metricsProfile.ov;
							profile.tv = frontline.metricsProfile.tv;
						}


						if (frontline.sponsoredCustomers != null) {
							profile.depth = frontline.sponsoredCustomers.href;
						}
						profile.pinLabel = pinName[profile.pin];
						profile.pinImage = "./imgs/pin/"+pinImage[profile.pin];
						networkFrontline.frontline.push(profile);
					}
					console.log("Baseline : ");
					console.log(networkFrontline.frontline);
					$rootScope.$broadcast('Baseline');
				},
				'error' : function() {
				}
			});
		};



		networkFrontline.getProfilePicture = function(link, callback) {
			var image;
			$.ajax({
				'type' : 'GET',
				'headers' : {
					'Authorization' : 'Bearer ' + profileDataBlock.sessionToken
				},
				'url' : link,
				'success' : function(result) {
					//console.log("Network Get Image");
					//console.log(result);
					var image;
					if (result.sizes.lenght > 0) {
						if (result.sizes[1] != null) {
							image = result.sizes[1].media;
						} else {
							image = result.sizes[0].media;
						}
						  //image = image.replace('d27zzi0gwko92h.cloudfront.net','api.unicity-th.com');
					} else {
						image = "./imgs/profile/default.png";
					}
					//Change to Thailand Server


					callback(image);
					//return image;
				},
				'error' : function() {
				}
			});
		};
		networkFrontline.openDepthPageFromHome = function(profile) {
				//localStorage.setItem("isDepth",1);
			$rootScope.$broadcast('DepthFromHome', profile);
		};

		function commaSeparateNumber(val){
					while (/(\d+)(\d{3})/.test(val.toString())){
						val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
					}
					return val;
				}
		networkFrontline.openDepthPage = function(profile) {

			$('#page-network-depth').addClass("loading");

			localStorage.setItem("isDepth",1);
			tmpprofile = profile;
			href = profile.depth;
			networkFrontline.networkDepth = [];
			//console.log("Displaying Depth");
			//console.log(profile);
			var token = profileDataBlock.sessionToken;
			var today = new Date();
			var this_date = today.getDate();

			$.ajax({
				'type' : 'GET',
				'headers' : {
					'Authorization' : 'Bearer ' + token
				},
				'url' : href + "?expand=metricsProfile,metricsProfileHistory,profilePicture,cumulativeMetricsProfile&orderBy=metricsProfile.ov%20desc",
				'success' : function(result) {
					//console.log("Depth Loaded");
					//console.log("result==>"+result);
					var language = localStorage.getItem("language");
					for (var i in result.items) {
						var frontline = result.items[i];
						//console.log("Depth Frontline");
						//console.log(frontline);
						var profileImage;
						if (frontline.profilePicture.sizes != null && frontline.profilePicture.sizes.length!=0) {
							profileImage = frontline.profilePicture.sizes[0].media;
							if ( typeof (frontline.profilePicture.sizes[1]) != "undefined") {
								profileImage = frontline.profilePicture.sizes[1].media;
							}
							//profileImage = profileImage.replace('d27zzi0gwko92h.cloudfront.net','api.unicity-th.com');
						} else {
							profileImage = "./imgs/pin/"+pinImage[frontline.cumulativeMetricsProfile.highestRankShort];
						}
						//Change to Thailand Server

						var name = "";
						/*if (language == "th") {
							name = frontline.humanName['fullName@th'];
						} else {
							name = frontline.humanName.fullName;
						}*/
						//alert(frontline.humanName.fullName);
						if (language == "th") {
							if(typeof frontline.humanName['fullName@th'] != 'undefined'){

								name = frontline.humanName['fullName@th'];
							}else{
									name = frontline.humanName.fullName;
							}
						} else {
							name = frontline.humanName.fullName;
						}

						var profile = {
							"id" : frontline.unicity,
							"name" : name,
							//"name_th" : frontline.humanName['fullName@th'],
							"image" : profileImage,
							"email" : frontline.email,
							"phone" : frontline.workPhone != "" ? frontline.workPhone : frontline.homePhone,
						};
							month_id = localStorage.getItem("monthid")-1;

							profile.pin = frontline.cumulativeMetricsProfile.highestRankShort;

						if(month_id == 1 ){

						var cal  = frontline.metricsProfileHistory.items[month_id].value.ov ;

						var cal1  = frontline.metricsProfileHistory.items[2].value.ov ;

					//	var total = cal - cal1;
						var total = 0 ;
						var img = "";
						var style = "";
						var minus = "";
						//	total = Math.round(total);


						if(cal1==0 && cal >0){
							cal1 = 1;
						}
						var per = 100/cal1 * cal;
						per = per-100;

						if(cal1 == cal){
								per = 0;
								total = 0;
						}else{

						}

							console.log("calov : "+cal1+"/"+cal);
					/*	if(total == 0){
								per = 0;
						}*/
						total = Math.round(per);
						total = Math.round(total);
						if(total>0&&total<1){
							total = 0;
						}
						if (total > 0) {
							img = "./imgs/icon_up.png";
							style = "width:8px;height:16px";
							minus = "+";
						}else if(total == 0){
							img =  "./imgs/stay.gif";
								style = "width:20px;height:20px";
									minus = "";
						}else{
							img = "./imgs/icon_down.png";
								style = "width:8px;height:16px";
									minus = "";
						}


							if(per>0&&per<1){
								per = 0;
							}
							profile.calov = "";
							profile.icon_img = img;
							profile.icon_style = style;
							profile.calov = "("+minus+""+commaSeparateNumber(Math.round(total))+"%)";
							profile.total = Math.round(total);
						}


						if (this_date < 6) {
							profile.pin = frontline.cumulativeMetricsProfile.highestRankShort;
							profile.pv = frontline.metricsProfileHistory.items[1].value.pv;
							profile.ov = frontline.metricsProfileHistory.items[1].value.ov;
							profile.tv = frontline.metricsProfileHistory.items[1].value.tv;
						} else {
						/*	profile.pin = frontline.cumulativeMetricsProfile.highestRankShort;
							profile.pv = frontline.metricsProfile.pv;
							profile.ov = frontline.metricsProfile.ov;
								profile.tv = frontline.metricsProfile.tv;*/



							profile.pin = frontline.cumulativeMetricsProfile.highestRankShort;
							profile.pv = frontline.metricsProfileHistory.items[month_id].value.pv;
							profile.ov = frontline.metricsProfileHistory.items[month_id].value.ov;
							profile.tv = frontline.metricsProfileHistory.items[month_id].value.tv;

						}

						profile.pinLabel = pinName[profile.pin];
						profile.pinImage = "./imgs/pin/"+pinImage[profile.pin];
						if (frontline.sponsoredCustomers != null) {
							profile.depth = frontline.sponsoredCustomers.href;
						}
						networkFrontline.networkDepth.push(profile);
					}
					console.log("Depth : ");
					console.log(networkFrontline.networkDepth);
					$rootScope.$broadcast('Depth');
								$('#page-network-depth').removeClass("loading");
					$('#page-network').removeClass("loading");
						$('#page-home').removeClass("loading");
				},
				'error' : function() {
							$('#page-network-depth').removeClass("loading");
					$('#page-network').removeClass("loading");
						$('#page-home').removeClass("loading");
				}
			});

		};
		return networkFrontline;
	}]);

	function isNullAndUndef(variable) {

    return (variable !== null && variable !== undefined);
}


	app.controller("NetworkListingController", ['$http', '$element', '$scope', '$rootScope', 'ProfileDataBlock', 'ShareComponents', 'NetworkFrontline',
	function($http, element, $scope, $rootScope, profileDataBlock, sharedComponents, networkFrontline) {
		var networkListCtrl = this;

		networkListCtrl.network = [];
		networkListCtrl.networkDepth = [];
		networkListCtrl.depth = {};
		networkListCtrl.depthLevel = [];
		networkListCtrl.selectedIndex = 0;
		networkListCtrl.backDepth = function() {
			//console.log("Back Depth");
			networkListCtrl.depthLevel.pop();
			//console.log(networkListCtrl.depthLevel);
			if (networkListCtrl.depthLevel.length <= 0) {
				sharedComponents.changePage('network');
			} else {
				var profile = networkListCtrl.depthLevel[networkListCtrl.depthLevel.length - 1];
				networkListCtrl.displayDepth(profile, "back");
			}
			networkListCtrl.rebindBackButton();
		};

			networkListCtrl.displayMonth = function(month_id) {
				console.log('test');
	$('#page-network').addClass("loading");
				$('#dmonth_1').removeClass("active");
				$('#dmonth_1').removeClass("btn-info");
				$('#dmonth_1').addClass("btn-primary");


				$('#dmonth_2').removeClass("active");
				$('#dmonth_2').removeClass("btn-info");
				$('#dmonth_2').addClass("btn-primary");


				$('#dmonth_3').removeClass("active");
				$('#dmonth_3').removeClass("btn-info");
				$('#dmonth_3').addClass("btn-primary");


				if(month_id == 1){
					$('#dmonth_1').addClass("active");
					$('#dmonth_1').removeClass("btn-primary");
					$('#dmonth_1').addClass("btn-info");
					networkListCtrl.selectedIndex = 0;
				}else if(month_id == 2){
					$('#dmonth_2').addClass("active");
					$('#dmonth_2').removeClass("btn-primary");
					$('#dmonth_2').addClass("btn-info");
					networkListCtrl.selectedIndex = 1;
				}else if(month_id == 3){
					$('#dmonth_3').addClass("active");
					$('#dmonth_3').removeClass("btn-primary");
					$('#dmonth_3').addClass("btn-info");
					networkListCtrl.selectedIndex = 2;
				}

				localStorage.setItem("monthid",month_id);



				console.log("Get Baseline"+networkListCtrl.selectedIndex);
				var token = profileDataBlock.sessionToken;
				var href = "https://hydra.unicity.net/v5/customers/me";
				//console.log("Get Baseline");
				$.ajax({
					'type' : 'GET',
					'headers' : {
						'Authorization' : 'Bearer ' + token
					},
					'url' : href + '/sponsoredCustomers?expand=metricsProfile,metricsProfileHistory,profilePicture,cumulativeMetricsProfile&orderBy=metricsProfile.ov%20desc',
					'success' : function(result) {
						console.log("token === >"+token);
							console.log("href === >"+href);

						var dataSet = JSON.stringify(result, undefined, 4);
							console.log("dataSet === >"+dataSet);
						var today = new Date();
						var this_date = today.getDate();
						var language = localStorage.getItem("language");

							networkFrontline.frontline = [];


						for (var i in result.items) {
							var frontline = result.items[i];

						//	console.log("Frontline 1");
						//	console.log(frontline);
							var profileImage;
						//	console.log("Frontline2");
							//console.log(frontline.profilePicture.sizes);

							var pinName = {
								"Dst" : _echo("pinshort", language, "distributor"),
								"Ph1" : _echo("pinshort", language, "phase_1"),
								"Mgr" : _echo("pinshort", language, "manager"),
								"SrM" : _echo("pinshort", language, "senior_manager"),
								"ExM" : _echo("pinshort", language, "executive_manager"),
								"Dir" : _echo("pinshort", language, "director"),
								"SrD" : _echo("pinshort", language, "senior_director"),
								"ExD" : _echo("pinshort", language, "executive_director"),
								"PrD" : _echo("pinshort", language, "presidential_director"),
								"PrS" : _echo("pinshort", language, "presidential_sapphire"),
								"PrR" : _echo("pinshort", language, "presidential_ruby"),
								"DIA" : _echo("pinshort", language, "presidential_diamond"),
							};

							var pinImage = {
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
							};


							if (frontline.profilePicture.sizes != null && frontline.profilePicture.sizes.length!=0) {
								//console.log("Has profile image");
								profileImage = frontline.profilePicture.sizes[0].media;
								if (frontline.profilePicture.sizes[1] != null) {
									profileImage = frontline.profilePicture.sizes[1].media;
								}
								//	profileImage = profileImage.replace('d27zzi0gwko92h.cloudfront.net','api.unicity-th.com');
							} else {
								profileImage = "./imgs/pin/"+pinImage[frontline.cumulativeMetricsProfile.highestRankShort];
							}
							//	console.log("หฟอำ Has profile image");

							//Change to Thailand Server

	//	console.log("profileImage "+profileImage);
							var name = "";
							if (language == "th") {
								if(typeof frontline.humanName['fullName@th'] != 'undefined'){

									name = frontline.humanName['fullName@th'];
								}else{
										name = frontline.humanName.fullName;
								}
							} else {
								name = frontline.humanName.fullName;
							}
console.log("-----"+name);
							var profile = {
								"id" : frontline.unicity,
								"name" : name,
								"image" : profileImage,
								"email" : frontline.email,
								"phone" : frontline.workPhone != "" ? frontline.workPhone : frontline.homePhone,
							};

								month_id = localStorage.getItem("monthid")-1;

								console.log("frontline x : "+frontline.metricsProfileHistory.items[month_id].period);
							profile.pin = frontline.cumulativeMetricsProfile.highestRankShort;

							if(month_id == 1 ){
									networkListCtrl.selectedIndex = 1;
							var cal  = frontline.metricsProfileHistory.items[month_id].value.ov ;

							var cal1  = frontline.metricsProfileHistory.items[2].value.ov ;

						//	var total = cal - cal1;
							var total = 0 ;
							var img = "";
							var style = "";
							var minus = "";
							//	total = Math.round(total);


							if(cal1==0 && cal >0){
								cal1 = 1;
							}
							var per = 100/cal1 * cal;
							per = per-100;

							if(cal1 == cal){
									per = 0;
									total = 0;
							}else{

							}

								console.log("calov : "+cal1+"/"+cal);
						/*	if(total == 0){
									per = 0;
							}*/
							total = Math.round(per);
							total = Math.round(total);
							if(total>0&&total<1){
								total = 0;
							}
							if (total > 0) {
								img = "./imgs/icon_up.png";
								style = "width:8px;height:16px";
								minus = "+";
							}else if(total == 0){
								img =  "./imgs/stay.gif";
									style = "width:20px;height:20px";
										minus = "";
							}else{
								img = "./imgs/icon_down.png";
									style = "width:8px;height:16px";
										minus = "";
							}


								if(per>0&&per<1){
									per = 0;
								}
								profile.calov = "";
							profile.icon_img = img;
							profile.icon_style = style;
							profile.calov = "("+minus+""+commaSeparateNumber(Math.round(total))+"%)";
							profile.total = Math.round(total);
							}

							profile.pv = frontline.metricsProfileHistory.items[month_id].value.pv;
							profile.ov = frontline.metricsProfileHistory.items[month_id].value.ov;
							profile.tv = frontline.metricsProfileHistory.items[month_id].value.tv;


							/*profile.pin = frontline.cumulativeMetricsProfile.highestRankShort;
							profile.pv = frontline.metricsProfileHistory.items[month_id].value.pv;
							profile.ov = frontline.metricsProfileHistory.items[month_id].value.ov;
							profile.tv = frontline.metricsProfileHistory.items[month_id].value.tv;*/


							var pinName = {
								"Dst" : _echo("pinshort", language, "distributor"),
								"Ph1" : _echo("pinshort", language, "phase_1"),
								"Mgr" : _echo("pinshort", language, "manager"),
								"SrM" : _echo("pinshort", language, "senior_manager"),
								"ExM" : _echo("pinshort", language, "executive_manager"),
								"Dir" : _echo("pinshort", language, "director"),
								"SrD" : _echo("pinshort", language, "senior_director"),
								"ExD" : _echo("pinshort", language, "executive_director"),
								"PrD" : _echo("pinshort", language, "presidential_director"),
								"PrS" : _echo("pinshort", language, "presidential_sapphire"),
								"PrR" : _echo("pinshort", language, "presidential_ruby"),
								"DIA" : _echo("pinshort", language, "presidential_diamond"),
							};

							var pinImage = {
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
							};


	console.log("profile.pinLabel === >"+profile.pin);
							if (frontline.sponsoredCustomers != null) {
								profile.depth = frontline.sponsoredCustomers.href;
							}

							profile.pinLabel = pinName[profile.pin];
							profile.pinImage = "./imgs/pin/"+pinImage[profile.pin];

console.log("profile.pinLabel === >"+profile);

						/*	if (frontline.sponsoredCustomers != null) {
								profile.depth = frontline.sponsoredCustomers.href;
							}
							profile.pinLabel = pinName[profile.pin];
							profile.pinImage = "./imgs/pin/"+pinImage[profile.pin];*/

							console.log("profile.pinLabel === >"+profile);

							networkFrontline.frontline.push(profile);



									console.log("frontline1 : ");
						}

						console.log("Baseline : ");
						console.log(networkFrontline.frontline);
						$rootScope.$broadcast('Baseline');


						//profileDataBlock.pv = profileDataBlock.data.metricsProfileHistory.items[month_id].value.pv;
					//	profileDataBlock.ov = profileDataBlock.data.metricsProfileHistory.items[month_id].value.ov;
					//	profileDataBlock.tv = profileDataBlock.data.metricsProfileHistory.items[month_id].value.tv;


	$('#page-network').removeClass("loading");

						sharedComponents.changePage("network");
					},
					'error' : function() {
							$('#page-network').removeClass("loading");
					}
				});







			}
function commaSeparateNumber(val){
			while (/(\d+)(\d{3})/.test(val.toString())){
				val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
			}
			return val;
		}

		networkListCtrl.displayDepth = function(profile, back) {
			$('#page-home').addClass("loading");
			$('#page-network').addClass("loading");
			href = profile.depth;
			if (href == "" || href == null) {
					$('#page-home').removeClass("loading");
				$('#page-network').removeClass("loading");
				navigator.notification.alert(_echo("content", "th", "last_downline"),function(){}," ");
				return;
			}

			if (back != "back") {

				networkListCtrl.depthLevel.push(profile);
				//console.log(networkListCtrl.depthLevel);
			}

			//console.log("Displaying Depth");
			//console.log(profile);
			var language = localStorage.getItem("language");
		/*	if (language == "th") {
				if(	profile.name_th ){
						networkListCtrl.depth.name = profile.name_th;
				}else{
					networkListCtrl.depth.name = profile.name_th;
				}
			} else {
					if(	profile.name_th ){
						 networkListCtrl.depth.name = profile.name_th;
					}else{
							networkListCtrl.depth.name = profile.name;
					}

			}*/

			networkListCtrl.depth.profileid = profile.id;
		networkListCtrl.depth.name = profile.name;
		networkListCtrl.depth.pinLabel = profile.pinLabel;
		networkListCtrl.depth.pinImage = profile.pinImage;
		networkListCtrl.depth.image = profile.image;
		networkListCtrl.depth.pv = profile.pv;
		networkListCtrl.depth.ov = profile.ov;
		networkListCtrl.depth.tv = profile.tv;
		networkListCtrl.depth.monthid = localStorage.getItem("monthid");

					//	networkListCtrl.selectedIndex = localStorage.getItem("monthid");
					console.log(localStorage.getItem("monthid")+" calov / "+profile.calov )
						if(localStorage.getItem("monthid") == 2){

							networkListCtrl.depth.icon_img = 	profile.icon_img;
							networkListCtrl.depth.icon_style = 		profile.icon_style;
							networkListCtrl.depth.calov = 	profile.calov ;
								networkListCtrl.depth.total = 	profile.total ;
							/*if (profile.total  > 0) {
								img = "./imgs/icon_up.png";
								style = "width:8px;height:16px";
							}else if(profile.total == 0){
								img =  "./imgs/stay.gif";
								style = "width:20px;height:20px";
							}else{
								img = "./imgs/icon_down.png";
								style = "width:8px;height:16px";
							}
							profile.icon_img = img;
							profile.icon_style = style;

							var per = 100/cal1 * cal;
							per = per-100;
							if(total == 0){
									per = 0;
							}


							profile.icon_img = img;
							profile.icon_style = style;
							profile.calov = "("+minus+""+Math.round(per)+"%)";
							profile.total = total;





							networkListCtrl.depth.icon_img = profile.icon_img;
							networkListCtrl.depth.icon_style = profile.icon_style;
							networkListCtrl.depth.calov = profile.calov;*/
						}else{
							img =  "./imgs/stay.gif";
								style = "width:20px;height:20px";
							networkListCtrl.depth.icon_img = img;
							networkListCtrl.depth.icon_style = style;
							networkListCtrl.depth.calov = "";
							networkListCtrl.depth.total = 0;
						}


		/*	networkListCtrl.depth.name = profile.name;

			networkListCtrl.depth.id = profile.id;
			networkListCtrl.depth.pinLabel = profile.pinLabel;
			networkListCtrl.depth.pinImage = profile.pinImage;
			networkListCtrl.depth.image = profile.image;*/
			/*networkListCtrl.depth.pv = profile.pv;
			networkListCtrl.depth.ov = profile.ov;
			networkListCtrl.depth.tv = profile.tv;*/
		//	networkListCtrl.depth.email = profile.email;
		//	networkListCtrl.depth.phone = profile.email;
			networkListCtrl.networkDepth = [];

			//console.log(networkListCtrl.depth);
			//console.log(href);
			networkFrontline.openDepthPage(profile);

		};
		networkListCtrl.baseline = function() {
			networkListCtrl.network = [];
			networkFrontline.getBaseline();
		};
		$scope.$on("Baseline", function() {
			networkListCtrl.network = networkFrontline.frontline;

		});
		$scope.$on("Depth", function() {
			networkListCtrl.networkDepth = networkFrontline.networkDepth;
			$scope.$apply();
			sharedComponents.changePage('network-depth');
		});
		$scope.$on("DepthFromHome", function(event, profile) {
			networkListCtrl.displayDepth(profile);
		});



		$scope.$watch(function() {
			return profileDataBlock.sessionToken;
		}, function(v) {
			if (v !== undefined) {
				networkListCtrl.baseline();
				networkListCtrl.rebindBackButton();
			}
		});
		networkListCtrl.rebindBackButton = function() {
			$("#network-depth-back-button").bind("click", function() {
				$("#network-depth-back-button").unbind("click");
				networkListCtrl.backDepth();
			});
		};

	}]);
})();
