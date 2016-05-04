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
				//V2

				var data = {
					'type' : 'base64',
					'value' : btoa(username + ":" + password),
					'namespace' : 'https://hydra.unicity.net/v5/customers'
				};
				// convert data to json
				data = JSON.stringify(data);
				$.ajax({
					'type' : 'POST',
					'headers' : {
						'Content-Type' : 'application/json'
					},
					'url' : 'https://hydra.unicity.net/v5/loginTokens',
					'data' : data,
					'success' : function(result) {
						profileDataBlock.sessionTokenV2 = result.token;
						
							profileDataBlock.getData(function() {
								$(element).find(".loading-container").addClass("hide");
								$(element).addClass("hide");
								$("footer.icon-bar a:first-child").trigger("click");
							}, 0);
					},
					'error' : function() {
						alert("Incorrect username/password");
						$(element).find(".loading-container").addClass("hide");
					}
				});
			}
		};

		//this.playAnimation();
	}]);

	app.run(function($http) {

	});

})();

