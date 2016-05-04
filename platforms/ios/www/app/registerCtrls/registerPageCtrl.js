/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('registerPageCtrl', ['ngSanitize', 'pageCtrl']);
    app.controller("RegisterPageController", ['$http', '$element', '$scope', '$rootScope', 'ShareComponents', function($http, element, $scope, $rootScope, sharedComponents) {
            var registerCtrl = this;
            registerCtrl.createAccount = function() {

                var data = {
                    'transactionId': window.transaction_id++,
                    'requestType': 'createAccount',
                    'requestVersion': '1',
                    'sessionToken': profileDataBlock.sessionToken,
                    'appDeviceOSVersion': mobile.OSVersion,
                    'appDeviceOSName': mobile.OSName,
                    'requestObj': {
                        'applicationVersion': application.version,
                        'applicationId': application.id,
                        'language': 'en',
                        "deviceId": mobile.DeviceId,
                        "enrollerId": "",
                        "sponsorId": "",
                        "username": "",
                        "password": "",
                        "taxId": "",
                        "applicationType": "A",
                        "order": {
                            "productItems": [
                                {
                                    "productItemId": "20817",
                                    "quantity": 1,
                                    "autoShip": false
                                }
                            ],
                            "shippingMethod": 3,
                            "shipTo": {
                                "name": "",
                                "addr1": "",
                                "addr2": "",
                                "city": "",
                                "email": "",
                                "state": "",
                                "zip": "",
                                "country": "",
                                "phone": ""
                            },
                            "billTo": {
                                "name": "",
                                "englishName": "",
                                "addr1": "",
                                "addr2": "",
                                "city": "",
                                "email": "",
                                "state": "",
                                "zip": "",
                                "country": "",
                                "phone": ""
                            },
                            "orderTotal": ""
                        }
                    }
                };
                data = JSON.stringify(data);

                $.ajax({
                    'type': 'GET',
                    'url': 'https://hydra.unicity.net/index.php/ws/v4/createAccount.jsonp?r=' + data,
                    'dataType': 'jsonp',
                    'success': function(result) {
                        console.log(result);
                        // check if user was authenticated
                        if (result.responses[0].success) {
                            profileDataBlock.data = result.responses[0].data.Response;
                        } else {
                            profileDataBlock.data = {};
                        }
                        console.log("Profiling");
                        console.log(profileDataBlock.data);
                        $rootScope.$broadcast('ProfileComplete');
                        callback();
                        //profileDataBlock.$broadcast("DataBlockChanged");
                    },
                    'error': function() {
                        profileDataBlock.data = {}
                        profileDataBlock.getData(callback, retry + 1);
                    }
                });

            };
        }]);
})();



