/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('newsPageCtrl', ['ngSanitize','pageCtrl']);
    app.controller("NewsPageController", ['$http', '$element', '$scope', '$sce', '$rootScope','ShareComponents',
    function($http, element, $scope, $sce, $rootScope, sharedComponents) {
            var newsCtrl = this;
            newsCtrl.single = {
                'thumbnail': '',
                'title': '',
                'content': '',
                'link': '',
            };
            newsCtrl.openYoutube = function(link){
            	window.open(link, '_system');
            };
            newsCtrl.showSingle = function(index)
            {
            	if(newsCtrl.news[index].embed_video!=null)
                {
                	var video = $sce.trustAsResourceUrl(newsCtrl.news[index].embed_video);
                	newsCtrl.openYoutube(video);
                }
            };
            /*
            newsCtrl.showSingle = function(index) {
                //console.log("Single News");
                sharedComponents.changePage('news-single');

                newsCtrl.single = {
                    'thumbnail': newsCtrl.news[index].thumbnail,
                    'title': newsCtrl.news[index].title,
                    'content': newsCtrl.news[index].content,
                    'link': newsCtrl.news[index].link,

                };
                console.log(newsCtrl.news[index].embed_video);
                if(newsCtrl.news[index].embed_video!=null)
                {
                	newsCtrl.single.embed_video = $sce.trustAsResourceUrl(newsCtrl.news[index].embed_video);
                }
                //console.log(newsCtrl.news[index].embed_video);
            };
            */
            $scope.$watch(function(){
            	return sharedComponents.currentPage;
            },function(v){
            	if(v=="news")
            	{
            		newsCtrl.getData();
            	}
            });
            newsCtrl.news = [];
            $scope.$watch(function() {
				return localStorage.getItem("language");
			}, function(v) {
				newsCtrl.getData();
			});
            newsCtrl.getData = function(){


              $http.get('http://membermy.unicity-easynet.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_news&args[posts_per_page]=1').success(function(response) {
                  console.log(response);
                  newsCtrl.news = [];
                  var language = localStorage.getItem("language");
                  for (var i in response)
                  {
                    var title = "";
            var content = "";
            var excerpt = "";
            if(language=="th")
            {
              title = response[i].post_title_th;
              content = response[i].post_content_th;
              excerpt = response[i].post_excerpt_th;
            }
            else{
              title = response[i].post_title;
              content = response[i].post_content;
              excerpt = response[i].post_excerpt;
            }
            localStorage.setItem("newsimg",response[i].image);
                      var news = {
                          'thumbnail': response[i].image,
                          'title': title,
                          'content': content,
                          'excerpt' : excerpt,
                          'embed_video' : null
                      };
                      //console.log(response[i].embed_video);
                      if(response[i].embed_video!=null && response[i].embed_video!="")
                      {
                        //console.log("News has video");
                        news.embed_video = response[i].embed_video;
                        //console.log(news.embed_video);
                      }
                      newsCtrl.news.push(news);
                  }
              });



            	$http.get('http://membermy.unicity-easynet.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_news&args[posts_per_page]=-1').success(function(response) {
                	console.log(response);
                	newsCtrl.news = [];
                	var language = localStorage.getItem("language");
                	for (var i in response)
                	{
                		var title = "";
						var content = "";
						var excerpt = "";
						if(language=="th")
						{
							title = response[i].post_title_th;
							content = response[i].post_content_th;
							excerpt = response[i].post_excerpt_th;
						}
						else{
							title = response[i].post_title;
							content = response[i].post_content;
							excerpt = response[i].post_excerpt;
						}

                    	var news = {
                        	'thumbnail': response[i].image,
	                        'title': title,
    	                    'content': content,
        	                'excerpt' : excerpt,
        	                'embed_video' : null
            	        };
            	        //console.log(response[i].embed_video);
            	        if(response[i].embed_video!=null && response[i].embed_video!="")
            	        {
            	        	//console.log("News has video");
            	        	news.embed_video = response[i].embed_video;
            	        	//console.log(news.embed_video);
            	        }
                	    newsCtrl.news.push(news);
	                }
            	});
            };
            newsCtrl.getData();
        }]);
})();
