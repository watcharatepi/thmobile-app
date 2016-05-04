/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('pageCtrl', []);
    app.factory("ShareComponents", ['$rootScope', function($rootScope) {
            var sharedComponents = {
                currentPage: "",
                prevPage: "",
                width: $(window).width(),
                height: $(window).height(),
            };
            sharedComponents.changePage = function(newPage,back) {
             	if(newPage==sharedComponents.currentPage)
             	{
                    sharedComponents.broadcastChangePage(newPage);
             		return;
             	}
                sharedComponents.prevPage = sharedComponents.currentPage;
                sharedComponents.currentPage = newPage;
                if (newPage == "login")
                {
                    $("#page-login").removeClass("hide");
                }
                localStorage.setItem("cpage",newPage);
                sharedComponents.broadcastChangePage(back);

            };
            sharedComponents.broadcastChangePage = function(back) {
               // console.log("Change page to : " + sharedComponents.currentPage);
                if(back==true)
                {
                    $rootScope.$broadcast('BackPage');
                }
                else
                {
                    $rootScope.$broadcast('ChangePage');
                }
            };
            return sharedComponents;
        }]);
    app.controller("ViewportController", ['$scope', '$element', 'ShareComponents', function($scope, $element, sharedComponents) {
            var viewport = this;
            this.changePage = function(newPage) {
                if(newPage=="logout")
                {
                   localStorage.removeItem("sessionToken");
                   newPage = "login";
                   $(".login-form").addClass("show");
                  $("#login-logo").addClass("show");
                }

                if(newPage=="facebook" || newPage=="instagram")
                {
                	if(newPage=="facebook")
                	window.open('http://www.facebook.com/unipower', '_system');
                	else if(newPage=="instagram")
                	window.open('http://instagram.com/unicity_thailand', '_system');
                }
                else
                {
                	sharedComponents.changePage(newPage);
                }

            };
            $scope.$on("ChangePage", function() {
                $element.removeClass("move-right");
            });
            $scope.$on("BackPage", function() {
                $element.removeClass("move-right");
            });
            $scope.$watch(function() {
                 return localStorage.getItem("language");
            }, function(v) {
                viewport.labels = _getLabels("content");
            });
            viewport.labels = _getLabels("content");
        }]);
    app.controller("HeaderController", ['$scope', 'ShareComponents', function($scope, sharedComponents) {
            var headerCtrl = this;
            headerCtrl.class = "top-bar";
            headerCtrl.title = {
                text: "Title"
            };
            headerCtrl.shopping = false;
            headerCtrl.goToCart = function() {
                sharedComponents.changePage('cart');



            };

            headerCtrl.refreshweb = function() {
            //  navigator.app.loadUrl("file:///android_asset/www/index.html", {wait:2000,  loadingDialog:"Wait,Loading App", loadUrlTimeoutValue: 60000});
console.log("reload");
window.location.reload();
            };
            headerCtrl.onChangePage = function(){
                if (sharedComponents.currentPage == "login")
                {
                    headerCtrl.class = "top-bar hide";
                }
                else if (sharedComponents.currentPage == 'shopping')
                {
                    headerCtrl.shopping = true;
                    headerCtrl.language = false;
                }
                else if (sharedComponents.currentPage == 'network-depth')
                  {
                      headerCtrl.shopping = false;
                      headerCtrl.language = false;
                  }

                else
                {
                    headerCtrl.class = "top-bar";
                    headerCtrl.shopping = false;
                     headerCtrl.language = true;
                }
                headerCtrl.title.text = _echo("header","th",sharedComponents.currentPage);

                $scope.$apply();
            };
            // void edit to change language
            $scope.$watch(function(){
      return localStorage.getItem("language");
          },function(v){
      headerCtrl.title.text = _echo("header","th",sharedComponents.currentPage);
    });
          $scope.$on('ChangePage', function() {
              headerCtrl.onChangePage();
          });
          $scope.$on('BackPage', function() {
              headerCtrl.onChangePage();
          });

            if(localStorage.getItem("language") == "en"){
                    headerCtrl.iconlanguage = "./imgs/thai_icon.png";
                }else{
                    headerCtrl.iconlanguage = "./imgs/english_icon.png";
            }


             headerCtrl.changeLanguage = function() {
                if(localStorage.getItem("language") == "th"){
                    localStorage.setItem("language","en");
                    headerCtrl.iconlanguage = "./imgs/thai_icon.png";
                }else{
                    localStorage.setItem("language","th");
                    headerCtrl.iconlanguage = "./imgs/english_icon.png";
                }

            };

             $scope.$watch(function() {
                 return localStorage.getItem("language");
            }, function(v) {
                  if(localStorage.getItem("language") == "en"){
                    headerCtrl.iconlanguage = "./imgs/thai_icon.png";
                }else{
                    headerCtrl.iconlanguage = "./imgs/english_icon.png";
            }

            });


            $scope.$watch(function(){
				return localStorage.getItem("language");
            },function(v){
				headerCtrl.title.text = _echo("header","th",sharedComponents.currentPage);
			});
            $scope.$on('ChangePage', function() {
                headerCtrl.onChangePage();
            });
            $scope.$on('BackPage', function() {
                headerCtrl.onChangePage();
            });
        }]);
    app.controller("FooterController", ['$scope', '$element', 'ShareComponents', function($scope, $element, sharedComponents) {
            var footerCtrl = this;
            footerCtrl.selectedTab = 1;
            footerCtrl.setupMenu = function(){
                                        footerCtrl.menus = [
                                                            {
                                                            "label": _echo("footer","th","home"),
                                                            "icon_inactive": "./imgs/footer/home.png",
                                                            "icon_active": "./imgs/footer/home-active.png",
                                                            },
                                                            {
                                                            "label": _echo("footer","th","success"),
                                                            "icon_inactive": "./imgs/footer/success-tracker.png",
                                                            "icon_active": "./imgs/footer/success-tracker-active.png",
                                                            },
                                                            {
                                                            "label": _echo("footer","th","network"),
                                                            "icon_inactive": "./imgs/footer/network.png",
                                                            "icon_active": "./imgs/footer/network-active.png",
                                                            },
                                                            {
                                                            "label": _echo("footer","th","news"),
                                                            "icon_inactive": "./imgs/footer/news.png",
                                                            "icon_active": "./imgs/footer/news-active.png",
                                                            },
                                                            {
                                                            "label": _echo("footer","th","shopping"),
                                                            "icon_inactive": "./imgs/footer/shopping.png",
                                                            "icon_active": "./imgs/footer/shopping-active.png",
                                                            }
                                                            ];

            };
                                        footerCtrl.setupMenu();
                                        $scope.$watch(function(){
                                                      return localStorage.getItem("language");
                                                      },function(v){
                                                      footerCtrl.setupMenu();
                                                      });
            footerCtrl.onChangePage = function(){
                if (sharedComponents.currentPage == "login")
                {
                    $element.addClass("hide");
                }
                else
                {
                    $element.removeClass("hide");
                }
                switch (sharedComponents.currentPage)
                {
                    case "home" :
                        footerCtrl.selectedTab = 1;
                        break;
                    case "tracker" :
                        footerCtrl.selectedTab = 2;
                        break;
                    case "network" :
                        footerCtrl.selectedTab = 3;
                        break;
                    case "news" :
                        footerCtrl.selectedTab = 4;
                        break;
                    case "shopping" :
                        footerCtrl.selectedTab = 5;
                        break;
                    default:
                        footerCtrl.selectedTab = 0;
                        break;
                }
            };

            $scope.$on('ChangePage', function() {
                footerCtrl.onChangePage();
            });
            $scope.$on('BackPage', function() {
                footerCtrl.onChangePage();
            });
            footerCtrl.selectTab = function(tab) {
                footerCtrl.selectedTab = tab;

                switch (tab)
                {
                    case 1 :

                        sharedComponents.changePage("home");
                        break;
                    case 2 :
                        sharedComponents.changePage("tracker");
                        break;
                    case 3 :
                        sharedComponents.changePage("network");
                        break;
                    case 4 :
                        sharedComponents.changePage("news");
                        break;
                    case 5 :
                        sharedComponents.changePage("shopping");
                        break;
                }
            };
            footerCtrl.checkTabClass = function(tab)
            {
                if (tab == footerCtrl.selectedTab)
                {
                    return "item selected";
                }
                else
                {
                    return "item";
                }
            };
        }]);
    app.controller("SideNavController", ['$scope', '$element', 'ShareComponents', function($scope, $element, sharedComponents) {
            var sideNavCtrl = this;
            sideNavCtrl.setupMenu = function(){
                                         sideNavCtrl.menus = [
                                                              {
                                                              "label": _echo("sidenav","th","home"),
                                                              "image": "./imgs/nav/nav-01.png",
                                                              "goto": "home"
                                                              },
                                                              {
                                                              "label": _echo("sidenav","th","profile"),
                                                              "image": "./imgs/nav/nav-02.png",
                                                              "goto": "profile"
                                                              },
                                                              {
                                                              "label": _echo("sidenav","th","success"),
                                                              "image": "./imgs/footer/success-tracker-active.png",
                                                              "goto": "tracker"
                                                              },
                                                              {
                                                              "label": _echo("sidenav","th","news"),
                                                              "image": "./imgs/nav/nav-03.png",
                                                              "goto": "news"
                                                              },
                                                              {
                                                              "label": _echo("sidenav","th","network"),
                                                              "image": "./imgs/nav/nav-04.png",
                                                              "goto": "network"
                                                              },
                                                              {
                                                              "label": _echo("sidenav","th","prospect"),
                                                              "image": "./imgs/nav/nav-05.png",
                                                              "goto": "prospect"
                                                              },
                                                              {
                                                              "label": _echo("sidenav","th","shopping"),
                                                              "image": "./imgs/nav/nav-06.png",
                                                              "goto": "shopping"
                                                              },
                                                              {
                                                              "label": _echo("sidenav","th","enroll"),
                                                              "image": "./imgs/nav/nav-07.png",
                                                              "goto": "enroll"
                                                              },
                                                              {
                    "label": _echo("sidenav","th","report"),
                    "image": "./imgs/nav/nav-report.png",
                    "goto": "report"
                },

                                                              {
                                                              "label": _echo("sidenav","th","signOut"),
                                                              "image": "./imgs/nav/nav-09.png",
                                                              "goto": "logout"
                                                              },
                                                              ];
             };
                                         sideNavCtrl.setupMenu();
                                         $scope.$watch(function(){
                                                       return localStorage.getItem("language");
                                                       },function(v){
                                                       sideNavCtrl.setupMenu();
                                                       });

        }]);
    app.controller("PageController", ['$scope', 'ShareComponents', function($scope, sharedComponents) {
            var pageCtrl = this;
            pageCtrl.prevPage = sharedComponents.prevPage;
            pageCtrl.selectedPage = sharedComponents.currentPage;
            var isAnimating = false;
            var endNextPage = false;
            var endCurrPage = false;

            $scope.$on("BackPage", function() {
                pageCtrl.selectedPage = sharedComponents.currentPage;
                pageCtrl.prevPage = sharedComponents.prevPage;
                //console.log("Prev : " + pageCtrl.prevPage);
                //console.log("Curr : " + pageCtrl.selectedPage);
                pageCtrl.backPage();
            });


            $scope.$on("ChangePage", function() {
	console.log(" ChangePage=====> ");
                var platform = "IOS";
                console.log("ChangePage : "+sharedComponents.currentPage);
                		switch (sharedComponents.currentPage){
                    case "home" :
					 	$('#countMobile').attr('src', 'http://dev.unicity-th.com/count_mobileapp/index_th.php?BAID='+localStorage.getItem("baid")+'&PAGE=Home&OS='+platform);
						//alert('Home');
                        break;
                    case "profile" :
						$('#countMobile').attr('src', 'http://dev.unicity-th.com/count_mobileapp/index_th.php?BAID='+localStorage.getItem("baid")+'&PAGE=Profile Name&OS='+platform);
						//alert('Profile Name');
                        break;
                    case "tracker" :
						$('#countMobile').attr('src', 'http://dev.unicity-th.com/count_mobileapp/index_th.php?BAID='+localStorage.getItem("baid")+'&PAGE=Success Tracker&OS='+platform);
						//alert('Success Tracker');
                        break;
                    case "news" :
						$('#countMobile').attr('src', 'http://dev.unicity-th.com/count_mobileapp/index_th.php?BAID='+localStorage.getItem("baid")+'&PAGE=News&OS='+platform);
						//alert('News');
                        break;
                    case "network" :
						$('#countMobile').attr('src', 'http://dev.unicity-th.com/count_mobileapp/index_th.php?BAID='+localStorage.getItem("baid")+'&PAGE=Genealogy&OS='+platform);
						//alert('Genealogy');
                    break;
                    case "prospect" :
						$('#countMobile').attr('src', 'http://dev.unicity-th.com/count_mobileapp/index_th.php?BAID='+localStorage.getItem("baid")+'&PAGE=Sharing&OS='+platform);
						//alert('Sharing');
                    break;
                    case "setting" :
						$('#countMobile').attr('src', 'http://dev.unicity-th.com/count_mobileapp/index_th.php?BAID='+localStorage.getItem("baid")+'&PAGE=Setting&OS='+platform);
						//alert('Setting');
                    break;
                    case "enroll" :
						$('#countMobile').attr('src', 'http://dev.unicity-th.com/count_mobileapp/index_th.php?BAID='+localStorage.getItem("baid")+'&PAGE=Enroll&OS='+platform);
						//alert('Enroll');
                    break;
                    case "shopping" :
						$('#countMobile').attr('src', 'http://dev.unicity-th.com/count_mobileapp/index_th.php?BAID='+localStorage.getItem("baid")+'&PAGE=Shopping&OS='+platform);
						//alert('Shopping');
                    break;
                    case "cart" :





						$('#countMobile').attr('src', 'http://dev.unicity-th.com/count_mobileapp/index_th.php?BAID='+localStorage.getItem("baid")+'&PAGE=Cart&OS='+platform);
						//alert('Shopping');
                    break;
                }

                pageCtrl.selectedPage = sharedComponents.currentPage;
                pageCtrl.prevPage = sharedComponents.prevPage;
                //console.log("Prev : " + pageCtrl.prevPage);
                //console.log("Curr : " + pageCtrl.selectedPage);
                pageCtrl.nextPage();
                //$scope.$apply();
            });
            pageCtrl.nextPage = function() {

                $("#page-" + pageCtrl.selectedPage).addClass("show");
                $("#page-" + pageCtrl.prevPage).removeClass("show");

            };
            pageCtrl.backPage = function() {

                $("#page-" + pageCtrl.selectedPage).addClass("show");
                $("#page-" + pageCtrl.prevPage).removeClass("show");

            };

            pageCtrl.changePage = function(toPage,back)
            {
                sharedComponents.changePage(toPage,back);
            };
            pageCtrl.checkPage = function(page)
            {
               if(page == "network-depth"){
                 localStorage.setItem("isDepth",0);
               }
              //	localStorage.setItem("isDepth",0);
                if (sharedComponents.currentPage == page)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            };
        }]);
})();
