/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
	var app = angular.module('homeNewsCtrl', ['ngSanitize']);
	app.controller("HomeNewsController", ['$http', '$element', '$scope', 'ShareComponents',
	function($http, element, $scope, sharedComponents) {
		var newsCtrl = this;
		newsCtrl.news = [];
		$scope.$watch(function() {
			return sharedComponents.currentPage;
		}, function(v) {
			if (v == "home") {
				newsCtrl.getData();
			}
		});
		$scope.$watch(function() {
			return localStorage.getItem("language");
		}, function(v) {
			newsCtrl.getData();
		});
		newsCtrl.getData = function() {
			$http.get('http://membermy.unicity-easynet.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_news&args[posts_per_page]=-1').success(function(response) {
				console.log(response);
				newsCtrl.news = [];
				var language = localStorage.getItem("language");
				for (var i in response) {
					if (i > 3) {
						break;
					}
					var title = "";
					var content = "";
					var excerpt = "";
					if (language == "th") {
						title = response[i].post_title_th;
						content = response[i].post_content_th;
						excerpt = response[i].post_excerpt_th;
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
					};
					newsCtrl.news.push(news);
				}
			});
		};
		newsCtrl.getData();
	}]);

})();
