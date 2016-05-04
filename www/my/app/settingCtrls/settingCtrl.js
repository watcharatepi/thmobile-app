/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('settingCtrl', []);
    app.controller("settingController", ['$scope',function($scope) {
          var settingCtrl = this;
          settingCtrl.selectedLanguage;
          settingCtrl.languages = {
          	"en" : "English",
          	"th" : "Thai"
          };
          settingCtrl.selectLanguageLabel = _echo("content","th","select_language");
          if(localStorage.getItem("language") != null)
          {
          	settingCtrl.selectedLanguage = localStorage.getItem("language");
          	//console.log("Language : "+settingCtrl.selectedLanguage);
          	$scope.$apply();
          }
          else
          {
          	settingCtrl.selectedLanguage = "en";
          	localStorage.setItem("language","en");
          }
          $scope.$watch(function(){
              return localStorage.getItem("language");
          },function(v){
          	settingCtrl.onLanguageChange();    
          });
          settingCtrl.onLanguageChange = function(){
          	   settingCtrl.selectLanguageLabel = _echo("content","th","select_language");
          	   settingCtrl.languages.en = _echo("content","th","language_en");
          	   settingCtrl.languages.th = _echo("content","th","language_th");
          };
          settingCtrl.changeLanguage = function(){
               //console.log("Current Language : "+settingCtrl.selectedLanguage);
               localStorage.setItem("language",settingCtrl.selectedLanguage);
          };
    }]);
})();



