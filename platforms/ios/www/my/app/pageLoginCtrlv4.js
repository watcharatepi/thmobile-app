/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
	var app = angular.module('pageLoginCtrl', ['pageCtrl', 'profileHeaderCtrl']);
	app.controller("PageLoginController", ['$http', '$element', '$scope', 'Configuration', 'ShareComponents', 'ProfileDataBlock',
	function($http, element, $scope, config, sharedComponents, profileDataBlock) {
		this.username = "108357166";
		if (config.test) {
			this.username = "171810666";
			this.password = "0863352975";
		}
		this.login = function() {
			if (config.debug) {
				//alert("Login Test Mode");
				sharedComponents.changePage("home");
			} else {
				$(element).find(".loading-container").removeClass("hide");
				var username = this.username;
				var password = this.password;
				console.log("Username : " + username);
				console.log("Password : " + password);

				var data = {
					'transactionId' : window.transaction_id++,
					'requestType' : 'authenticate',
					'requestVersion' : '1',
					'sessionToken' : '',
					'appDeviceOSVersion' : mobile.OSVersion,
					'appDeviceOSName' : mobile.OSName,
					'requestObj' : {
						'passwordToken' : password,
						'applicationVersion' : application.version,
						'applicationId' : application.id,
						'userToken' : username,
						"deviceId" : mobile.DeviceId,
					}
				};
				data = JSON.stringify(data);
				console.log(data);
				$.ajax({
					'type' : 'GET',
					'url' : 'https://hydra.unicity.net/index.php/ws/v4/authenticate.jsonp?r=' + data,
					'dataType' : 'jsonp',
					'success' : function(result) {
						//debugger;
						console.log(result);
						if (result.responses[0].success) {
							profileDataBlock.sessionToken = result.responses[0].sessionToken;

							profileDataBlock.getData(function() {
								$(element).find(".loading-container").addClass("hide");
								$(element).addClass("hide");
								$("footer.icon-bar a:first-child").trigger("click");
							}, 0);

						} else {
							alert("Incorrect username/password");
							$(element).find(".loading-container").addClass("hide");
						}
					},
					'error' : function() {
						$(element).find(".loading-container").addClass("hide");
						alert("Cannot connect to server. Please try again.");
					}
				});

			}
		};
		
		//this.playAnimation();
	}]);

	app.run(function($http) {

	});

})();

