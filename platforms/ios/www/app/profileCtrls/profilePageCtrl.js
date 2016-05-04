/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('profilePageCtrl', ['profileHeaderCtrl']);
    app.controller("ProfilePageController", ['$http', '$element', '$scope', '$rootScope','ProfileDataBlock', function($http, element, $scope, $rootScope,profileDataBlock) {
            
             var profilePageCtrl = this;
             profilePageCtrl.data = {};
             $scope.$watch(function() {
                  return profileDataBlock.data;
             }, function(v) {
                  if (v !== undefined)
                  {
                      
                       var data = profileDataBlock.get();
                       var address = data.mainAddress.address1 + " " + data.mainAddress.address2;
					   var phone = data.mobilePhone!=""?data.mobilePhone:data.homePhone;                           
                       address = address + " " + data.mainAddress.city + " " + data.mainAddress.country + " " + data.mainAddress.zip;
                       
                       
                       profilePageCtrl.data = {
                           "name" : data.humanName.fullName,
                           "phone": phone,
                           "email": data.email,
                           "location": address
                       };
                  }
             });
        }]);
})();



