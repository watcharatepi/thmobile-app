/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
	var app = angular.module('pageLoginCtrl', ['pageCtrl', 'profileHeaderCtrl']);
	app.controller("PageLoginController", ['$http', '$element', '$scope', 'Configuration', 'ShareComponents', 'ProfileDataBlock',
	function($http, element, $scope, config, sharedComponents, profileDataBlock) {
		//this.username = "108357166";

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
				//console.log("Username : " + username);
				//console.log("Password : " + password);
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
						//console.log(result);
						profileDataBlock.sessionToken = result.token;
						if (window.localStorage) {
							localStorage.setItem("sessionToken", result.token);
							localStorage.setItem("profileUrl", result.customer.href);
							localStorage.setItem("username",username);
							console.log("username ==>"+username);
							localStorage.setItem("baid", username);
						}
						profileDataBlock.href = result.customer.href;
						profileDataBlock.getData(function() {
							$(element).find(".loading-container").addClass("hide");
						//	$(element).addClass("hide");
							window.setTimeout(function(){$("#page-login").addClass("hide");}, 600);
							$("footer.icon-bar a:first-child").trigger("click");
						}, 0);
					},
					'error' : function() {
						navigator.notification.alert("Incorrect username/password");
						$(element).find(".loading-container").addClass("hide");
					}
				});
			}
		};

		//this.playAnimation();
	}]);

	app.run(['$http', 'ProfileDataBlock',
	function($http, profileDataBlock) {
		$(document).ready(function() {
			if (localStorage.getItem("sessionToken") != null) {
				//console.log("Auto Login");
				//$("#page-login").find(".loading-container").addClass("hide");
				//
				$(".login-form").addClass("hide");
				$("#login-logo").addClass("hide");
				window.setTimeout(function(){$("#page-login").addClass("hide");}, 600);
				$("footer.icon-bar a:first-child").trigger("click");
				profileDataBlock.sessionToken = localStorage.getItem("sessionToken");
				profileDataBlock.href = localStorage.getItem("profileUrl");
				profileDataBlock.getData(function(){},0);


			}

		});
	}]);



			function dumpLocalStorageToJSON() {
				 var d = [];
				 for(i = 0; i < localStorage.length; i++){
	console.log("dumpLocalStorageToJSON======> "+localStorage.key(i));
				//	d.push(localStorage.getItem(localStorage.key(i))	);
				//	 d[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
					/*var str = ""+localStorage.key(i);
							var product = {
								str : localStorage.getItem(localStorage.key(i))
							};
				d.push(product);*/

					if(localStorage.key(i) == "sessionToken"){
						var product = {
							"token" : localStorage.getItem(localStorage.key(i))
						};
						d.push(product);
					}
				}

				 return JSON.stringify(d);
			 }

	console.log("dumpLocalStorageToJSON======> "+dumpLocalStorageToJSON());
	

        // voy-edit
        var applaunchCount = window.localStorage.getItem('launchCount');
				localStorage.setItem("monthid",1);
        //Check if it already exists or not
        if(applaunchCount){
           //This is a second time launch, and count = applaunchCount
        }else{
          //Local storage is not set, hence first time launch. set the local storage item
          window.localStorage.setItem('launchCount',1);
          localStorage.setItem("language","th");

          //Do the other stuff related to first time launch
        }

})();
