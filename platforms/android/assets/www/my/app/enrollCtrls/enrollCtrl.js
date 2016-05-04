
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
	var app = angular.module('enrollerCtrl', ['profileHeaderCtrl']);
	app.controller("EnrollerController", ['$http', '$element', '$scope', '$rootScope', '$sce', 'ShareComponents', 'ProfileDataBlock',
	function($http, element, $scope, $rootScope, $sce, sharedComponents, profileDataBlock) {
		var enrollerCtrl = this;
		enrollerCtrl.province;
		enrollerCtrl.provinceTH = ["Johor","Kedah","Kelantan","Kuala Lumpur","Malacca","Negeri Sembilan","Pahang","Penang","Perak","Perlis","Putrajaya","Sabah","Sarawak","Selangor","Terengganu"];
		enrollerCtrl.provinceEN = ["Johor","Kedah","Kelantan","Kuala Lumpur","Malacca","Negeri Sembilan","Pahang","Penang","Perak","Perlis","Putrajaya","Sabah","Sarawak","Selangor","Terengganu"];
		$scope.$watch(function() {
			return localStorage.getItem("language");
        }, function(v) {
           	if(v=="th")
           	{
        		enrollerCtrl.province = enrollerCtrl.provinceTH;
        	}
        	else{
        		enrollerCtrl.province = enrollerCtrl.provinceEN;
        	}
        	enrollerCtrl.date.month = [
				{ label: _echo("month","th",0), value: 1},
				{ label: _echo("month","th",1), value: 2},
				{ label: _echo("month","th",2), value: 3},
				{ label: _echo("month","th",3), value: 4},
				{ label: _echo("month","th",4), value: 5},
				{ label: _echo("month","th",5), value: 6},
				{ label: _echo("month","th",6), value: 7},
				{ label: _echo("month","th",7), value: 8},
				{ label: _echo("month","th",8), value: 9},
				{ label: _echo("month","th",9), value: 10},
				{ label: _echo("month","th",10), value: 11},
				{ label: _echo("month","th",11), value: 12}
			];
            $scope.$apply();
        });
		enrollerCtrl.validation = {
			sponsor: false,
			enroller: false
		};
		enrollerCtrl.date = {
			day: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
			month: [
			{ label: _echo("month","th",0), value: 1},
			{ label: _echo("month","th",1), value: 2},
			{ label: _echo("month","th",2), value: 3},
			{ label: _echo("month","th",3), value: 4},
			{ label: _echo("month","th",4), value: 5},
			{ label: _echo("month","th",5), value: 6},
			{ label: _echo("month","th",6), value: 7},
			{ label: _echo("month","th",7), value: 8},
			{ label: _echo("month","th",8), value: 9},
			{ label: _echo("month","th",9), value: 10},
			{ label: _echo("month","th",10), value: 11},
			{ label: _echo("month","th",11), value: 12}
			],
			year: []
		};
		enrollerCtrl.labelSubArea = _echo("content","th","sub_area");
		enrollerCtrl.labelArea = _echo("content","th","area");
		enrollerCtrl.changeProvince = function(){
			console.log("Province changed : "+enrollerCtrl.formData.province);
			if(enrollerCtrl.formData.province.match(/กรุงเทพมหานคร/)!=null || enrollerCtrl.formData.province.match(/Bangkok/)!=null)
			{
				console.log("BKK");
				enrollerCtrl.labelSubArea = _echo("content","th","sub_area_bkk");
				enrollerCtrl.labelArea = _echo("content","th","area_bkk");
			}
			else
			{
				enrollerCtrl.labelSubArea = _echo("content","th","sub_area");
				enrollerCtrl.labelArea = _echo("content","th","area");
			}

		};

		var today = new Date();
		var minTime = new Date();
		minTime.setTime(today.getTime() - 20*365*24*60*60*1000);
		var maxTime = new Date();
		maxTime.setTime(minTime.getTime() - 80*365*24*60*60*1000);
		console.log("Min Year : "+minTime.getFullYear());
		for(var i = maxTime.getFullYear(); i <= minTime.getFullYear(); i++)
		{
			enrollerCtrl.date.year.push(i);
		}
		console.log(enrollerCtrl.date.year);
		enrollerCtrl.formData = {
			enroller : "",
			sponsor : "",
			taxId : "",
			passport : "",
			firstNameTH : "",
			lastNameTH : "",
			firstNameEN : "",
			lastNameEN : "",
			dob : {
				day : "",
				month : "",
				year : "",
			},
			province : "Kuala Lumpur",
			address : "",
			road : "",
			subArea : "",
			area : "",
			country : "Malaysia",
			zip : "",
			phone : "",
			email : "",
			shipment : 3
		};
		$scope.$watch(function() {
			return profileDataBlock.data;
		}, function(v) {
			if (v !== undefined) {
				var data = profileDataBlock.get();
				enrollerCtrl.formData.enroller = data.unicity;
				enrollerCtrl.formData.sponsor = data.unicity;
			}
		});
		$scope.$watch(function() {
			return sharedComponents.currentPage;
		}, function(v) {
			if (v != "enroll") {
				enrollerCtrl.resetForm();
			}
			if(v != "enroll-payment")
			{
				$("#enroll-payment-gateway")[0].src = "about:blank";
			}
		});
		enrollerCtrl.resetForm = function(){
			$(".verified-enroll").removeClass("valid");
			$(".tax-verified-enroll").removeClass("valid");
			$(".verify-enroll-enroller-name").text(" ");
			$(".verify-enroll-sponsor-name").text(" ");
			$(".verify-enroll-button").removeAttr("disabled","disabled").val(_echo("content","th","verify_enroller")).removeClass("success");
			$(".tax-enroll-button").removeAttr("disabled","disabled").val(_echo("content","th","verify_id")).removeClass("success");

			enrollerCtrl.validation = {
				sponsor: false,
				enroller: false
			};
			enrollerCtrl.formData = {
				enroller : "",
				sponsor : "",
				taxId : "",
				passport : "",
				firstNameTH : "",
				lastNameTH : "",
				firstNameEN : "",
				lastNameEN : "",
				dob : {
					day : "",
					month : "",
					year : "",
				},
				province : "",
				address : "",
				road : "",
				subArea : "",
				gender : "male",
				area : "",
				country : "Malaysia",
				zip : "",
				phone : "",
				email : "",
				shipment : ""
			};
			var data = profileDataBlock.get();
			enrollerCtrl.formData.enroller = data.unicity;
			enrollerCtrl.formData.sponsor = data.unicity;
			$("#enroller-id").removeAttr("disabled","disabled");
			$("#sponsor-id").removeAttr("disabled","disabled");
			$("#id-card").removeAttr("disabled","disabled");
			//$scope.$apply();
		};
		enrollerCtrl.verifyBANumber = function(event){
			//event.preventDefault();
			$(".verify-enroll-button").val(_echo("content","th","verifying")).removeClass("success");
			enrollerCtrl.verifySponsor();
			enrollerCtrl.verifyEnroller();
		};
		enrollerCtrl.validBANumber = function(enroller,sponsor)
		{
			if(enroller && sponsor)
			{
				$("#verify-enroller-submit").attr("disabled","disabled").val(_echo("content","th","verified")).addClass("success");
				$(".verified-enroll").addClass("valid");
			}
		};
		enrollerCtrl.verifySponsor = function()
		{
			var ba_number = enrollerCtrl.formData.sponsor;
			$.ajax({
				'type' : 'GET',
				'headers' : {
					'Accept' : 'application/json'
				},
				'url' : 'https://hydra.unicity.net/v5/customers?unicity=' + ba_number + '&expand=customer',
				'dataType' : 'json',
				'success' : function(result) {
					console.log(result);
					if(result.items[0].status.toLowerCase()=="active")
					{
						var name = "";
						var language = localStorage.getItem("language");
						if(language=="th")
						{
							name = result.items[0].humanName['fullName@th'];
						}
						else
						{
							name = result.items[0].humanName.fullName;
						}
						$(".verify-enroll-sponsor-name").text(name).addClass("success");
						$("#sponsor-id").attr("disabled","disabled");
						enrollerCtrl.validation.sponsor=true;
						enrollerCtrl.validBANumber(enrollerCtrl.validation.enroller,enrollerCtrl.validation.sponsor);
					}
					else{
						$(".verified-enroll").removeClass("valid");
						$(".verify-enroll-button").val(_echo("content","th","verify_enroller"));
						navigator.notification.alert("Invalid Enroller/Sponsor");
					}
				},
				'error' : function() {

					$(".verify-enroll-button").val(_echo("content","th","verify_enroller"));
					navigator.notification.alert("Cannot verify now, please try again");
				}
			});
		};
		enrollerCtrl.verifyEnroller = function() {
			var ba_number = enrollerCtrl.formData.enroller;
			$.ajax({
				'type' : 'GET',
				'headers' : {
					'Accept' : 'application/json'
				},
				'url' : 'https://hydra.unicity.net/v5/customers?unicity=' + ba_number + '&expand=customer',
				'dataType' : 'json',
				'success' : function(result) {
					console.log(result);
					if(result.items[0].status.toLowerCase()=="active")
					{
						var name = "";
						var language = localStorage.getItem("language");
						if(language=="th")
						{
							name = result.items[0].humanName['fullName@th'];
						}
						else
						{
							name = result.items[0].humanName.fullName;
						}
						$(".verify-enroll-enroller-name").text(name).addClass("success");
						$("#enroller-id").attr("disabled","disabled");
						enrollerCtrl.validation.enroller=true;
						enrollerCtrl.validBANumber(enrollerCtrl.validation.enroller,enrollerCtrl.validation.sponsor);

					}
					else{
						$(".verified-enroll").removeClass("valid");
						$(".verify-enroll-button").val(_echo("content","th","verify_enroller"));

						navigator.notification.alert("Invalid Enroller/Sponsor");

					}
				},
				'error' : function() {

					$(".verify-enroll-button").val(_echo("content","th","verify_enroller"));
					navigator.notification.alert("Cannot verify now, please try again");
				}
			});
		};
		enrollerCtrl.checkingTaxID = function(taxID) {
			var i = 0;
			var sum = 0;
			if (taxID.length != 13) {
				return false;
			}
			for ( i = 0, sum = 0; i < 12; i++) {
				sum += parseFloat(taxID.charAt(i)) * (13 - i);
			}
			if ((11 - sum % 11) % 10 != parseFloat(taxID.charAt(12))) {
				return false;
			}
			return true;
		};
		enrollerCtrl.verifyTaxID = function(event) {
			$(".tax-enroll-button").val("Verifying...").removeClass("success");
			var taxID = enrollerCtrl.formData.taxId;
			var passport = enrollerCtrl.formData.passport;
			if (taxID != "") {
				/*var valid = enrollerCtrl.checkingTaxID(taxID);
				if (!valid) {
					navigator.notification.alert("Invalid ID Card");
					$(".tax-enroll-button").val(_echo("content","th","verify_id"));
					return false;
				}*/
			}
			else{
				$(".tax-enroll-button").val(_echo("content","th","verify_id"));
				return false;
			}
			$.ajax({
				'type' : 'GET',
				'url' : 'https://hydra.unicity.net/v5/customers.js?_httpMethod=HEAD&mainAddress_country=TH&taxTerms_taxId=' + taxID,
				'dataType' : 'jsonp',
				'success' : function(result) {
					var dataSet = JSON.stringify(result.meta, undefined, 4);
					var dataSet = dataSet.replace(/-/g, "");
					var obj = JSON.parse(dataSet);
					if (obj.XStatusCode == 200) {
						$(".tax-enroll-button").val("Aleady exist");
					} else if (obj.XStatusCode == 404) {
						$("#id-card").attr("disabled","disabled");
						$(".tax-enroll-button").attr("disabled","disabled").val(_echo("content","th","verified")).addClass("success");
						$(".tax-verified-enroll").addClass("valid");
						$(".verified-enroll").addClass("lock");
					}
				},
				'error' : function() {
					$(".tax-enroll-button").val("Verify");
				}
			});
		};

		enrollerCtrl.prepareData = function(){
			var address1 = enrollerCtrl.formData.address + " " + enrollerCtrl.formData.road;
			var address2;

			address2 = enrollerCtrl.formData.subArea + " " + enrollerCtrl.formData.area;


			var taxID = enrollerCtrl.formData.taxId;

			var dob = enrollerCtrl.formData.dob.day+"/"+enrollerCtrl.formData.dob.month+"/"+enrollerCtrl.formData.dob.year;

			/*var data = {
				"requestType" : "createAccount",
				"requestVersion" : "1",
				"transactionId" : transaction_id++,
				"appDeviceOSName" : mobile.OSName,
				"appDeviceOSVersion" : mobile.OSVersion,
				"requestObj" : {
					"applicationId" : application.id,
					"applicationVersion" : application.version,
					"deviceId" : mobile.DeviceId,
					"distMarket" : "TH",
					"market" : "TH",
					"enrollerId" : enrollerCtrl.formData.enroller,
					"sponsorId" : enrollerCtrl.formData.sponsor,
					"username" : "",
					"password" : "11111111",
					"taxId" : taxID,
					"gender" : $('#ggender').val(),
					"applicationType" : "A",
					"order" : {
						"productItems" : [{
							"productItemId" : "20817",
							"quantity" : 1,
							"autoShip" : false
						}],
						"shippingMethod" : enrollerCtrl.formData.shipment,
						"shipTo" : {
							"name" : enrollerCtrl.formData.firstNameTH + " " + enrollerCtrl.formData.lastNameTH,
							"addr1" : address1,
							"addr2" : address2,
							"city" : enrollerCtrl.formData.province,
							"email" : enrollerCtrl.formData.email,
							"state" : " ",
							"zip" : enrollerCtrl.formData.zip,
							"country" : "TH",
							"phone" : enrollerCtrl.formData.phone
						},
						"billTo" : {
							"name" : enrollerCtrl.formData.firstNameTH + " " + enrollerCtrl.formData.lastNameTH,
							"englishName" : enrollerCtrl.formData.firstNameEN + " " + enrollerCtrl.formData.lastNameEN,
							"addr1" : address1,
							"addr2" : address2,
							"city" : enrollerCtrl.formData.province,
							"email" : enrollerCtrl.formData.email,
							"state" : " ",
							"zip" : enrollerCtrl.formData.zip,
							"country" : "TH",
							"phone" : enrollerCtrl.formData.phone
						},
						"orderTotal" : ""
					}
				},
				"sessionToken" : ""
			};
			//alert("Zip : " + enrollerCtrl.formData.zip);
			data = JSON.stringify(data);*/
			//var dob = enrollerCtrl.formData.dob.day+"/"+enrollerCtrl.formData.dob.month+"/"+enrollerCtrl.formData.dob.year;

	/*	var data = {
			"requestType" : "createAccount",
			"requestVersion" : "1",
			"transactionId" : transaction_id++,
			"appDeviceOSName" : mobile.OSName,
			"appDeviceOSVersion" : mobile.OSVersion,
			"requestObj" : {
				"applicationId" : application.id,
				"applicationVersion" : application.version,
				"deviceId" : mobile.DeviceId,
				"distMarket" : "vn",
				"market" : "vn",
				"enrollerId" : enrollerCtrl.formData.enroller,
				"sponsorId" : enrollerCtrl.formData.sponsor,
				"username" : "",
				"password" : "11111111",
				"taxId" : taxID,
				"applicationType" : "A",
				"order" : {
					"productItems" : [{
						"productItemId" : "20817",
						"quantity" : 1,
						"autoShip" : false
					}],
					"shippingMethod" : enrollerCtrl.formData.shipment,
					"shipTo" : {
						"name" : enrollerCtrl.formData.firstNameVN + " " + enrollerCtrl.formData.lastNameVN,
						"addr1" : address1,
						"addr2" : address2,
						"city" : enrollerCtrl.formData.province,
						"email" : enrollerCtrl.formData.email,
						"state" : " ",
						"zip" : enrollerCtrl.formData.zip,
						"country" : "vn",
						"phone" : enrollerCtrl.formData.phone
					},
					"billTo" : {
						"name" : enrollerCtrl.formData.firstNameVN + " " + enrollerCtrl.formData.lastNameVN,
						"englishName" : enrollerCtrl.formData.firstNameEN + " " + enrollerCtrl.formData.lastNameEN,
						"addr1" : address1,
						"addr2" : address2,
						"city" : enrollerCtrl.formData.province,
						"email" : enrollerCtrl.formData.email,
						"state" : " ",
						"zip" : enrollerCtrl.formData.zip,
						"country" : "vn",
						"phone" : enrollerCtrl.formData.phone
					},
					"orderTotal" : ""
				}
			},
			"sessionToken" : ""
		};*/


	 if(	enrollerCtrl.formData.shipment == 2){

			enrollerCtrl.formData.shipment  = "NextDay";
	 }

	 if(	enrollerCtrl.formData.shipment == 3){

		 enrollerCtrl.formData.shipment  = "WillCall";
	}

		var data = {
					"customer":{
						"mainAddress":{
							"city":enrollerCtrl.formData.province,
							"country":"MY",
							"state":" ",
							"zip":enrollerCtrl.formData.zip,
							"address1":address1,
							"address2":address2
						},
						"humanName":{
							"firstName":enrollerCtrl.formData.firstNameEN,
							"lastName":enrollerCtrl.formData.lastNameEN
						},
						"enroller": {
							"href": "https://hydra.unicity.net/v5/customers?id.unicity="+enrollerCtrl.formData.enroller
						},
						"sponsor": {
							"href": "https://hydra.unicity.net/v5/customers?id.unicity="+enrollerCtrl.formData.sponsor
						},
						"email":enrollerCtrl.formData.email,
						"taxTerms": {
							"taxId": taxID
						},
						"gender": enrollerCtrl.formData.gender,
						"type":"Associate"
					},
					"lines":{
						"items":[
						{
							"item":{
								"href":"https://hydra.unicity.net/v5/items?id.unicity=27027"
							},
							 "quantity":1
						}
						]
					},
					"shipToName":{
						"firstName":enrollerCtrl.formData.firstNameEN,
						"lastName":enrollerCtrl.formData.lastNameEN
					},
					"shipToPhone":enrollerCtrl.formData.phone,
					"shipToEmail":enrollerCtrl.formData.email,
					"shipToAddress":{
						"city":enrollerCtrl.formData.province,
						"country":"MY",
						"state":" ",
						"address1":address1,
						"address2":address2,
						"zip":enrollerCtrl.formData.zip
					},
					"shippingMethod":{
						"href":"https://hydra.unicity.net/v5/shippingmethods?type="+enrollerCtrl.formData.shipment
					},
					"notes":"mobile",
					"transactions":{
						"items":[
						{
								"amount":"63.6",
							"type":"record",
							"method":"CreditCard",
							"authorization":"12345",
							/*
							"methodDetails":{
								"payer": "First Last",
								"creditCardNumber": "1234",
								"creditCardExpires": "2020-10"
							}
							*/
						}
						]
					}
				};

				//alert(enrollerCtrl.formData.shipment);

				if (enrollerCtrl.formData.shipment == 'NextDay')
				{

					data.shippingMethod.href = "https://hydra.unicity.net/v5/shippingmethods?type="+enrollerCtrl.formData.shipment+"&location=";
						data.transactions.items[0].amount = 76.32;
					//alert(data.order.shippingMethod.href);
				}
		data = JSON.stringify(data);
		return data;

	};

		enrollerCtrl.enrollSubmit = function() {
					console.log($scope.enroller_form);
					if(!$scope.enroller_form.$valid)
					{
						alert("Please fill required information");
						return false;
					}
					/*var data = enrollerCtrl.prepareData();
					console.log("Enrolling");
					console.log(data);*/
					enrollerCtrl.submitData();
					return false;
	};
	enrollerCtrl.linkPayment = function(){

		var trust_link = $sce.trustAsResourceUrl(enrollerCtrl.submitUrl);
		enrollerCtrl.resetForm();
		sharedComponents.changePage("home");
		window.open(trust_link, '_blank');

	};
		enrollerCtrl.submitData = function(){
			/*var data = enrollerCtrl.prepareData();
			console.log(data);
			if($scope.enroller_form.$invalid)
			{
				return false;
			}


			var language = localStorage.getItem("language");
			var amount ="";
			if(enrollerCtrl.formData.shipment==3)
			{
				amount = "500.00";
			}
			else
			{
				amount = "850.00";
			}
			var link = "http://membermy.unicity-easynet.com/cpanel/payment-enroll-bkk-mobile/?data=" + encodeURIComponent(data)
			+ "&amount="+encodeURIComponent(amount)
			+ "&session=" + encodeURIComponent(profileDataBlock.sessionToken)
			+ "&lang=" + encodeURIComponent(language);
			enrollerCtrl.resetForm();
			var trust_link = $sce.trustAsResourceUrl(link);
			console.log("Opening Link :"+trust_link);
			window.open(trust_link, '_system');*/

  var data = enrollerCtrl.prepareData();

			var amount = "";


					var data2 = {
							"order": {
								"customer": {
									"href": "https://hydra.unicity.net/v5/customers?type=Associate"
								},
								"lines": {
									"items": [
									{
										"item": {
											"href": "https://hydra.unicity.net/v5/items?id.unicity=27027"
										},
										"quantity": "1"
									}]
								},
								"shipToAddress": {
								"city": enrollerCtrl.formData.province,
								"country": "MY",
								"state": "",
								"address1": enrollerCtrl.formData.address1,
								"zip": enrollerCtrl.formData.zip
							},
							"shippingMethod": {
								"href": "https://hydra.unicity.net/v5/shippingmethods?type=WillCall&location=Petaling Jaya, Main Office"
							}
						}
					};

					if (enrollerCtrl.formData.shipment == 'NextDay'){
						data2.order.shippingMethod.href = "https://hydra.unicity.net/v5/shippingmethods?type=NextDay";
					}

					data2 = JSON.stringify(data2);
	console.log(data2);

		$.ajax({
			'type':'POST',
			//'headers':{'Content-Type':'application/json','Authorization':'Bearer ' + token},
			'headers':{'Content-Type':'application/json'},
			'url':'https://hydra.unicity.net/v5/orderTerms?expand=item',
			'data':data2,
			'success':function (result) {
				//alert(JSON.stringify(result,undefined,4));
				//$('#calOrders_result').val(JSON.stringify(result,undefined,4));
				//$('#freight').val(result.items[0].terms.total);
				//$('#token').val(result.token);
				//$('#customer_href').val(result.customer.href);

				//alert(amount);

				console.log("======> post to membermy"+result.items[0].terms.total);
				console.log("======> post to membermy"+profileDataBlock.sessionToken);
				$.ajax({
					'type' : 'POST',
					'url' : "http://membermy.unicity-easynet.com/cpanel/wp-admin/admin-ajax.php",
					'dataType' : 'json',
					'data':{
						'action' : 'create_order',
						'data' : data,
						'amount': result.items[0].terms.total,
						'session': profileDataBlock.sessionToken,
						'web' : 'true',
						'enroll': 'true'
					},
					success: function(result)
					{
						enrollerCtrl.paymentOrderId = result.order_id;
						var link = "http://membermy.unicity-easynet.com/cpanel/payment-enroll-my/?temp_order_id=" + enrollerCtrl.paymentOrderId;
						//link += "&amount="+encodeURIComponent(amount);
						//enrollerCtrl.paymentUrl = link;
					/*	$element.find("#verify-all").val(enrollerCtrl.contentLabels.verified);
						$element.find("input").attr("disabled","disable");
						console.log(link);
						$scope.$apply();*/


						var trust_link = $sce.trustAsResourceUrl(link);
						enrollerCtrl.resetForm();
						sharedComponents.changePage("home");
						window.open(trust_link, '_blank');
					}
				});

				$("#rsGender").prop( "disabled", true );
				$("#rsProvince").prop( "disabled", true );
				$("#rsCountry").prop( "disabled", true );
				$("#rsShipping").prop( "disabled", true );
				$("#rsShipping").prop( "disabled", true );

			},
			'error':function (result) {
				//$('#calOrders_result').val(JSON.stringify(result,undefined,4));
			}
		});


		};
		enrollerCtrl.enrollSubmit = function() {


      var data = enrollerCtrl.prepareData();
			//console.log($scope.enroller_form);
			if(!$scope.enroller_form.$valid)
			{
					navigator.notification.alert("Please fill required information");
					init();
				//document.addEventListener("deviceready", init, false);

			/*	navigator.notification.alert(
					'Please fill required information',  // message
					alertDismissed,         // callback
					'Alert',            // title
					'Ok'                  // buttonName
			);*/

			//	navigator.notification.alert("Please fill required information");
				return false;
			}
			var data = enrollerCtrl.prepareData();
			console.log("Enrolling");
			console.log(data);
			enrollerCtrl.submitData();
			return false;
		};


		function alertDismissed() {
		//	document.addEventListener("deviceready", init, false);

    }

                function init() {

                   if(document.querySelector("#first_name_th").value == ""){
                       document.querySelector("#first_name_th").focus();
                   }else if(document.querySelector("#last_name_th").value == ""){
                       document.querySelector("#last_name_th").focus();
                   }else if(document.querySelector("#first_name_en").value == ""){
                       document.querySelector("#first_name_en").focus();
                   }else if(document.querySelector("#last_name_en").value == ""){
                       document.querySelector("#last_name_en").focus();
                   }else if(document.querySelector("#address").value == ""){
                       document.querySelector("#address").focus();
                   }else if(document.querySelector("#zip").value == ""){
                       document.querySelector("#zip").focus();
                   }else if(document.querySelector("#road").value == ""){
                       document.querySelector("#road").focus();
                   }else if(document.querySelector("#subarea").value == ""){
                       document.querySelector("#subarea").focus();
                   }else if(document.querySelector("#area").value == ""){
                       document.querySelector("#area").focus();
                   }else if(document.querySelector("#country").value == ""){
                       document.querySelector("#country").focus();
                   }else if(document.querySelector("#phone").value == ""){
                       document.querySelector("#phone").focus();
                   }else if(document.querySelector("#email").value == ""){
                       document.querySelector("#email").focus();
                   }

								/*	var select = document.getElementById('dob-month');

									if(select.getElementsByTagName( 'option' )[ select.selectedIndex ].text == ""){
										 document.querySelector("#dob-month").focus();
									}*/

                }
	}]);
})();
