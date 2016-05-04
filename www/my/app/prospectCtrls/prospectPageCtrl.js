/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function() {
	var app = angular.module('prospectPageCtrl', ['ngSanitize', 'pageCtrl']);
	app.controller("ProspectPageController", ['$http', '$element', '$scope', '$rootScope', '$sce', 'ShareComponents',
	function($http, element, $scope, $rootScope, $sce, sharedComponents) {
		var prospectCtrl = this;
		prospectCtrl.single = {
			'thumbnail' : '',
			'title' : '',
			'content' : '',
			'link' : '',
		};
		prospectCtrl.openYoutube = function(link){
            window.open(link, '_system');
        };
        prospectCtrl.showSingle = function(index) {

			sharedComponents.changePage('prospect-single');
			prospectCtrl.single = {
				'thumbnail' : prospectCtrl.data[index].thumbnail,
				'title' : prospectCtrl.data[index].title,
				'content' : prospectCtrl.data[index].content,
				'link' : prospectCtrl.data[index].link,
			};
			if(prospectCtrl.data[index].embed_video!=null)
            {
                	prospectCtrl.single.embed_video = $sce.trustAsResourceUrl(prospectCtrl.data[index].embed_video);
            }

		};
		prospectCtrl.data = [];
		if (!(( typeof cordova == 'undefined') && ( typeof Cordova == 'undefined'))) {

			if(mobile.OSName=="iOS")
			{
				prospectCtrl.shareSMS = function(link) {
					sms.send('', link);
				};
			}
			else if(mobile.OSName=="Android")
			{

			}
			prospectCtrl.shareSMS = function(link) {
					//sms.send('', link);
					console.log("sms:?body="+link);
					//window.location.href = "sms:?body="+link;
					window.open("sms:?body="+link, "_system");
				//	console.log("window clicked");
			};
			prospectCtrl.shareFacebookLink = function(link, caption, description) {
				console.log("Sharing : " + link);


			/*	var canShare = window.plugins.socialsharing.canShareVia('com.apple.social.facebook', 'Share on Facebook', null, link, caption, function(e){}, function(e){});

				if(canShare){

					window.plugins.socialsharing.canShareVia('com.apple.social.facebook', 'Share on Facebook', null, link, caption, function(e){}, function(e){});
				}else{
					window.plugins.socialsharing.share(link);




				}*/

				window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint('Share on Facebook', null, link, caption, function() {
					console.log('share ok');
				}, function(errormsg) {
						//navigator.notification.alert(errormsg);
						window.plugins.socialsharing.share(link);
				});




			};
		}
		/*
		prospectCtrl.showSingle = function(index) {
			//console.log("Single Prospect");
			//console.log(index);
			sharedComponents.changePage('prospect-single');
			prospectCtrl.single = {
				'thumbnail' : prospectCtrl.data[index].thumbnail,
				'title' : prospectCtrl.data[index].title,
				'content' : prospectCtrl.data[index].content,
				'link' : prospectCtrl.data[index].link,
			};
			if(prospectCtrl.data[index].embed_video!=null)
            {
                	prospectCtrl.single.embed_video = $sce.trustAsResourceUrl(prospectCtrl.data[index].embed_video);
            }
			//console.log(prospectCtrl.single);
		};
		*/
		$scope.$watch(function() {
			return sharedComponents.currentPage;
		}, function(v) {
			if (v == "prospect") {
				prospectCtrl.getData();
			}
		});
		$scope.$watch(function() {
			return localStorage.getItem("language");
		}, function(v) {
			prospectCtrl.getData();
		});
		prospectCtrl.getData = function() {
			$http.get('http://membermy.unicity-easynet.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_prospect').success(function(response) {
				prospectCtrl.data = [];
				var language = localStorage.getItem("language");
				for (var i in response) {
					var title, content, excerpt;
					if (language == "th") {
						title = response[i].post_title_th;
						content = response[i].post_content_th;
						excerpt = response[i].post_excerpt;
					} else {
						title = response[i].post_title;
						content = response[i].post_content;
						excerpt = response[i].post_excerpt;
					}
					var news = {
						'thumbnail' : response[i].image,
						'title' : title,
						'content' : content,
						'excerpt' : excerpt,
						'link' : response[i].prospect_link,
						//'embed_video' : response[i].embed_video
					};
					if(response[i].embed_video!=null && response[i].embed_video!="")
            	    {
            	        news.embed_video = response[i].embed_video;
            	    }
					prospectCtrl.data.push(news);
				}
			});
		};
	}]);
})();
