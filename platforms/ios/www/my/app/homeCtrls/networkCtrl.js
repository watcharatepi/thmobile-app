/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
	var app = angular.module('homeNetworkCtrl', ['pageCtrl', 'profileHeaderCtrl','networkListingCtrl']);
	app.controller("HomeNetworkController", ['$http', '$element', '$scope', 'ShareComponents', 'ProfileDataBlock','NetworkFrontline',
	function($http, $element, $scope, sharedComponents, profileDataBlock,networkFrontline) {
		var networkCtrl = this;
		networkCtrl.network = [];
		networkCtrl.displayDepth = function(profile){
			networkFrontline.openDepthPageFromHome(profile);
		};
		networkCtrl.baseline = function() {
			networkCtrl.network = networkFrontline.frontline;
			//networkCtrl.setup();
		};
		$scope.$watch(function() {
			return networkFrontline.frontline;
		}, function(v) {
			if (v !== undefined) {
				networkCtrl.baseline();
			}
		});
		$scope.$watch(function() {
			return profileDataBlock.sessionToken;
		}, function(v) {
			if (v !== undefined) {
				//networkCtrl.baseline();
			}
		});
		networkCtrl.setup = function() {
			var network = networkCtrl.network.length + 5;
			var width = sharedComponents.width;
			var profile_width = width / 4;
			$element.find('.slider').css("width", (profile_width * network) + "px");
			setTimeout(function() {
				$(".network-profile").css("width", profile_width + "px");
			}, 1000);
		};

	}]);

})();
