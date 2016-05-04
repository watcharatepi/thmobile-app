/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('homePageCtrl', [
    'profileHeaderCtrl', 'successTrackerCtrl', 
    'homeNetworkCtrl', 'homeProductCtrl',
     'homeNewsCtrl', 'homeInstagramCtrl',
     'enrollerCtrl','pageCtrl']);
    app.controller("HomePageController", ['$http', '$element', '$scope','$rootScope','ShareComponents', function($http, element, $scope, $rootScope,sharedComponents) {
            var homePageCtrl = this;
            
                                          
        }]);
})();



