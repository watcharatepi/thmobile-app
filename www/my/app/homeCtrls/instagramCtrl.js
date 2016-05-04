/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('homeInstagramCtrl', ['pageCtrl']);
    app.controller("HomeInstagramController", ['$http', '$element', '$scope', 'ShareComponents',
        function($http, element, $scope, sharedComponents) {
            var instagramCtrl = this;
            instagramCtrl.enlarge = function(link){
                //console.log("Enlarge");
                $("#instagram-enlarge")[0].src = link;
                sharedComponents.changePage("instagram");
            };
            instagramCtrl.openUserLink = function(){
                console.log("Opening IG Link");
                CDV.instagram.openUserLink("Unicity_Thailand");
            };
            var feed = new Instafeed({
                get: 'tagged',
                tagName: 'themakelifebettercompany027846777',
                clientId: '987340a00ce74d46b103d5e7490e5ef1',
                limit: 8,
                resolution: 'standard_resolution',
                template: '<div class="small-4 medium-3 columns">\n\
                                <a><img class="instagram-thumbnail" data-link="{{image}}" src="{{image}}" /></a>\n\
                            </div>',
                useHttp: true,
                after: function(){
                    $(".instagram-thumbnail").bind("click",function(){
                        var src = $(this).data("link");
                        instagramCtrl.enlarge(src);
                    });
                }
            });
            //console.log('Instafeed');
            //console.log(feed);
            feed.run();
            
        }]);
})();



