/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
	//debug;
	window.transaction_id = 1;
	application = {
		id : "com.unicity.mobiapp",
		version : "0.5",
		fbApp : "924080647620158"
	};
	mobile = {
		OSVersion : '1.0.0',
		OSName : 'Android',
		DeviceId : 'AAAAAAAA-1111-1111-AAAA-FFFFFFFFFFF',
		referer: window.location.href
	};
	//108357166
	document.addEventListener("deviceready", onCordovaDeviceReady, false);
	function onCordovaDeviceReady() {
		mobile = {
			OSVersion : device.version,
			OSName : device.platform,
			DeviceId : device.uuid,
			referer: window.location.href
		};
		if(navigator.notification === undefined && navigator.notification.alert===undefined)
		{
			navigator.notification.alert = function(msg)
			{
				alert(msg);
			}
		}
		navigator.splashscreen.hide();
		/*if(navigator.splashscreen){
                        setTimeout(function () {
                            navigator.splashscreen.hide();
                        }, 100);
                }*/

		//navigator.notification.alert(window.location.href);
	}

	var app = angular.module('unicity', [
	'pageCtrl', 'pageLoginCtrl', 'profileHeaderCtrl',
	'successTrackerCtrl', 'homePageCtrl', 'networkPageCtrl',
	'newsPageCtrl', 'prospectPageCtrl', 'shoppingPageCtrl',
	'profilePageCtrl', 'ngTouch','settingCtrl','reportCtrl'
	]);
	app.factory('Configuration', function() {
		return {
			debug : false,
			test : false
		};
	});
	app.run(function($document) {
		$(".off-canvas-wrap").foundation("offcanvas");

		$document.ready(function() {

			if (( typeof cordova == 'undefined') && ( typeof Cordova == 'undefined')) {

			} else {

				if ( typeof CDV == 'undefined')
					navigator.notification.alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');

				if ( typeof FB == 'undefined')
					navigator.notification.alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

				FB.init({
					appId : application.fbApp,
					nativeInterface : CDV.FB,
					useCachedDialogs : false
				});

			}
		});


		//$(".tabs").foundation("tabs");
	});
})();
