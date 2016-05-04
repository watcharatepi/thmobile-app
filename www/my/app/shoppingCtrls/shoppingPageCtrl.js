/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




(function() {
	var app = angular.module('shoppingPageCtrl', ['ngSanitize', 'pageCtrl', 'unicity']);
	app.factory("ShoppingCart", ['$http', '$sce', 'ProfileDataBlock', 'ShareComponents', 'Configuration',
	function($http, $sce, profileDataBlock, sharedComponents, config) {
		var cart = {
			products : {},
			length : 0,
			ordered : [],
			totalPrice : 0,
			totalPV : 0,
			calculated : false,
			orderTotals : {
				discountAmount : "",
				shipping : "",
				subtotal : "",
				tax : "",
				total : "",
				totalPsv : ""
			}
		};

		window.gotoshopping = function() {
					sharedComponents.changePage("shopping");
		}

		window.gotoenroll = function() {
					sharedComponents.changePage("enroll");
		}

		window.gotosuccess = function() {
					sharedComponents.changePage("tracker");
		}

		window.gotonews = function() {
					sharedComponents.changePage("news");
		}


		cart.calculatePrice = function() {
			var totalPrice = 0;
			var totalPV = 0;
                        var totalqty = 0;
			for (var id in cart.products) {
				//console.log("Calculate Price : " + cart.products[id].qty + " * " + parseFloat(cart.products[id].price.replace(',', '')));
				//console.log("Calculate PV : " + cart.products[id].qty + " * " + eval(cart.products[id].pv));
				totalPrice += eval(cart.products[id].qty * parseFloat(cart.products[id].price.replace(',', '')));
				totalPV += eval(cart.products[id].qty * eval(cart.products[id].pv));
                                totalqty += cart.products[id].qty;
			}
			cart.totalPrice = totalPrice;
			cart.totalPV = totalPV;
			//$("#cart-alert").text(cart.length);
                        // voy-edit
                        $("#cart-alert").text(totalqty);
                        if (cart.length > 0) {
														$("#cart-alert").show();
													} else {
														$("#cart-alert").hide();
													}
												};
		cart.addProduct = function(id, qty, product) {
			cart.calculated = false;
			$("#cart-primary-button").text("Checkout").removeClass("success");
			if (id == "") {
				return;
			}
			//console.log(product);
			var product_id = "id_" + id;
			if (cart.products[product_id] == null || cart.products[product_id].qty == 0) {
				cart.length++;
				cart.products[product_id] = {
					'thumbnail' : product.thumbnail,
					'name' : product.name,
					'desc' : product.desc,
					'pv' : product.pv,
					'price' : product.price,
					'qty' : eval(qty)
				};
			} else {
				cart.products[product_id].qty += eval(qty);
			}
			//console.log(cart);
			cart.calculatePrice();
		};
		cart.removeProduct = function(id) {
			cart.calculated = false;
			cart.length--;
			$("#cart-primary-button").text("Checkout").removeClass("success");
			var product_id = id;
			//console.log("Delete");
			//console.log(product_id);
			cart.products[product_id] = null;
			delete cart.products[product_id];
			//console.log(cart.products);
			cart.calculatePrice();
		};

		cart.calculateOrder = function(shipping_method, shipping, billing,callback) {
			$("#page-cart").addClass("loading");
			var profile = profileDataBlock.get();

			var ordered_products = [];
			for (var id in cart.products) {
				/*var product_id = id.substr(3);
				var product = {
					"productItemId" : product_id,
					"quantity" : cart.products[id].qty,
					"autoShip" : false
				};
				ordered_products.push(product);*/
var product_id = id.substr(3);
								var product = {
								"item" : {
										"href":"https://hydra.unicity.net/v5/items?id.unicity="+product_id
								} ,
									"quantity":cart.products[id].qty
							};

            ordered_products.push(product);

			}

			if(ordered_products.length == 0)
			{
					callback(false);
					return;
			}


			var str = "NextDay";
				var addr1 = "";
				var addr2 = "";
				var zip = "";
				var city = "";
		    var firstName = $("#shipping_name").val();
				var lastName = "";


			if($("#cart-shipping-method").val() == 3){

				 str = "WillCall&location=Petaling Jaya, Main Office";
				 var billing = {
					"name" : "Petaling Jaya, Main Office",
					 "addr1" : "Unit 801, Level 8, Menara Amcorp",
					 "addr2" : "18, Persiaran Barat",
					 "city" : "Petaling Jaya",
					 "email" : "malaysia.customerservice@unicity.com",
					 "state" : "Selangor Darul Ehsan",
					 "zip" : "46050",
					 "country" : "MY",
					 "phone" : "+60379689911"
				};

				addr1 = billing.addr1;
				addr2 = billing.addr2;
				email = billing.email;
				city   = billing.city;
				zip =  billing.zip;


			}else if(shipping_method == 2){

			/*	cartPageCtrl.shipping = {
					"name" : "JOHN DOE",
					"addr1" : "555/55 MUANG DEANG RD.5",
					"addr2" : "",
					"city" : "20230",
					"email" : "test@unicity.com",
					"state" : "CHIANG RAI",
					"zip" : "20230",
					"country" : "PH",
					"phone" : "0811755555"
				};*/
						 str = "NextDay";
						 addr1 = shipping.addr1;
						 addr2 = shipping.addr2;
						 city   = shipping.city;
						zip =  shipping.zip;
						phone = shipping.phone;
						email =  shipping.email;
				//
			}

			var phone = profile.mobilePhone != "" ? profile.mobilePhone : profile.homePhone;
			var data = {
							"order": {
							"customer" : {
								"href":"https://hydra.unicity.net/v5/customers?unicity="+ profile.unicity
							},
							"lines": {
								"items": ordered_products
							},
							"shipToName":{
								"firstName": firstName,
								"lastName":lastName,
							},
							"shippingMethod": {
								"href": "https://hydra.unicity.net/v5/shippingmethods?type="+str
							},
							"shipToPhone": phone,
							"shipToEmail": email,
							"shipToAddress": {
							"city": city,
							"country": "MY",
							"state": "",
							"address1": addr1,
							"address2": addr2,
							"zip": zip
						}
					}
				};

				data = JSON.stringify(data);
				var olddata = data;

				console.log(data);



				$.ajax({
				 // 'type' : 'GET',
		 'type':'POST',
		 'headers':{'Content-Type':'application/json'},
				 // 'url' : 'https://hydra.unicity.net/index.php/ws/v4/calculateOrder.jsonp?r=' + data,
		 'url':'http://APIQA-619897199.us-east-1.elb.amazonaws.com/v5/orderTerms?expand=item',
					//'dataType' : 'jsonp',
		'data':data,
					'success' : function(result) {

			var data = JSON.parse(JSON.stringify(result,undefined,4));
			//alert(JSON.stringify(result,undefined,4));
			// alert(JSON.stringify(data));
var total = "";
			for (var key in data)
						{
								//console.log(key + ' : ' + data[key]);

								 var ar =  data[key];
								 //alert(key + ' --> ' + ar[0].terms.total);
									total = ar[0].terms.total;
								/*	cart.totalShip = ar[0].terms.freight.amount;
									cart.calculated = true;*/
						}

						/*  if ( typeof result.responses[0].errorCode !== "undefined") {
									alert(result.responses[0].displayErrorMessage);
									cart.calculated = false;*/
					//    } else {
									/*cart.orderTotals = result.responses[0].orderTotals;
									var totalPrice = cart.orderTotals.total.substring(1).replace(",","");
									cart.totalPrice = parseFloat(totalPrice);*/
								 // cart.calculated = true;
									$.ajax({
											'type' : 'POST',
											'url' : "http://membermy.unicity-easynet.com/cpanel/wp-admin/admin-ajax.php",
											'dataType' : 'json',
											'data':{
													'action' : 'create_order',
													'data' : olddata,
													'amount': total,
													'session': profileDataBlock.sessionToken,
													'web' : 'true'
											},
											success: function(result)
											{
													 result.order_id;
													 var link = "http://membermy.unicity-easynet.com/cpanel/payment-my/?temp_order_id=" + result.order_id;


													console.log(link);
												//	console.log(link);
												cart.calculated = false;
												cart.products = {};
												cart.length = 0;
												$("#cart-primary-button").text("Checkout").removeClass("success");
												$("#page-cart").removeClass("loading");
												cart.calculatePrice();
												sharedComponents.changePage("home");
												callback(link);
											}
									});
						 // }
					},
					'error' : function() {
					}
			});


			/*var data = {
				"requestType" : "calculateOrder",
				"requestVersion" : "1",
				"transactionId" : window.transaction_id++,
				'appDeviceOSVersion' : mobile.OSVersion,
				'appDeviceOSName' : mobile.OSName,
				"requestObj" : {
					'applicationVersion' : application.version,
					'applicationId' : application.id,
					"deviceId" : mobile.DeviceId,
					"distMarket" : "PH",
					"order" : {
						"productItems" : ordered_products,
						"shippingMethod" : shipping_method,
						"shipTo" : shipping,
						"billTo" : billing
					},
					"distributorType" : "A",
					"market" : "PH"
				},
				'sessionToken' : profileDataBlock.sessionToken,
			};
			//console.log("Calculating Order Data : ");

			data = JSON.stringify(data);
			//console.log(data);
			var order_data = {
				"requestType" : "createOrder",
				"requestVersion" : "1",
				"transactionId" : window.transaction_id++,
				'appDeviceOSVersion' : mobile.OSVersion,
				'appDeviceOSName' : mobile.OSName,
				"requestObj" : {
					'applicationVersion' : application.version,
					'applicationId' : application.id,
					"deviceId" : mobile.DeviceId,
					"distMarket" : "PH",
					"order" : {
						"productItems" : ordered_products,
						"shippingMethod" : shipping_method,
						"shipTo" : shipping,
						"billTo" : billing,
						"orderTotal" : "",
					},
					"distributorType" : "A",
					"distributorId" : profile.unicity,
					"market" : "MY"
				},
				'sessionToken' : profileDataBlock.sessionToken,
			};*/

			/*$.ajax({
				'type' : 'GET',
				'url' : 'https://hydra.unicity.net/index.php/ws/v4/calculateOrder.jsonp?r=' + data,
				'dataType' : 'jsonp',
				'success' : function(result) {
					console.log(result);
					//console.log(result.responses[0]);
					if ( typeof result.responses[0].errorCode !== "undefined") {
							$("#page-cart").removeClass("loading");
						$("#cart-primary-button").text("Checkout");
						cart.calculated = false;
						navigator.notification.alert(result.responses[0].displayErrorMessage);

					} else {
						cart.orderTotals = result.responses[0].orderTotals;
						cart.totalPrice = cart.orderTotals.total.substring(1);
						cart.calculated = true;
						order_data = JSON.stringify(order_data);

						$("#cart-primary-button").text("Ordering...").addClass("success");
						var txt =  "";
						if(localStorage.getItem("perid_on") == "true"){
							txt =  $('#periodmm').find(":selected").val();
						}else{
							txt  = "";
						}
					//	console.log(order_data);
						var link = "http://membermy.unicity-easynet.com/cpanel/payment-bkk/?data=" + encodeURIComponent(order_data)
					//	var link = "http://58.97.59.204/unicity/test/payment_bbl.php?data=" + encodeURIComponent(order_data)
						+ "&amount=" + encodeURIComponent(cart.totalPrice)
						+ "&session=" + encodeURIComponent(profileDataBlock.sessionToken)
						+ "&lang=" + encodeURIComponent(language)
						+ "&period=" + txt;
						console.log(localStorage.getItem("perid_on"));
console.log(link);
					//	console.log(link);
						cart.calculated = false;
						cart.products = {};
						cart.length = 0;
						$("#cart-primary-button").text("Checkout").removeClass("success");
						$("#page-cart").removeClass("loading");
						cart.calculatePrice();
						sharedComponents.changePage("home");
						callback(link);

					}

				},
				'error' : function() {

				}
			});*/
		};

		return cart;
	}]);
	app.controller("CartPageController", ['$http', '$sce', '$element', '$scope', '$rootScope', 'ShoppingCart', 'ProfileDataBlock',
	function($http, $sce, element, $scope, $rootScope, cart, profileDataBlock) {
		var cartPageCtrl = this;
		cartPageCtrl.cart = cart;
		cartPageCtrl.shippingMethod = 3;
		//cartPageCtrl.calculated = false;
		cartPageCtrl.shipping = {
			"name" : "JOHN DOE",
			"addr1" : "555/55 MUANG DEANG RD.5",
			"addr2" : "",
			"city" : "20230",
			"email" : "test@unicity.com",
			"state" : "CHIANG RAI",
			"zip" : "20230",
			"country" : "PH",
			"phone" : "0811755555"
		};
		cartPageCtrl.billing = {
			"name" : "JOHN DOE",
			"addr1" : "555/55 MUANG DEANG RD.5",
			"addr2" : "",
			"city" : "20230",
			"email" : "test@unicity.com",
			"state" : "CHIANG RAI",
			"zip" : "20230",
			"country" : "PH",
			"phone" : "0811755555"
		};
		cartPageCtrl.pickupAddress = {
			//"name" : "บริษัท ยูนิซิตี้ มาร์เก็ตติ้ง (ไทยแลนด์) จำกัด",
			"addr1" : "44/1 ชั้น1 และ ชั้น15 อาคารรุ่งโรจน์ธนกุล",
			"addr2" : "ถนนรัชดาภิเษก เขตห้วยขวาง กทม ",
			"city" : "Bangkok",
			"email" : "cs_thailand@unicity.com",
			"state" : "Bangkok",
			"zip" : "10310",
			"country" : "PH",
			"phone" : "027846777"
		};

cartPageCtrl.period_on = false;
		var currentdata = null;
		$scope.$watch(function() {
			return profileDataBlock.data;
		}, function(v) {
			if (v !== undefined) {
				var data = profileDataBlock.get();
				currentdata = data;
				var phone = data.mobilePhone != "" ? data.mobilePhone : data.homePhone;

				if(data.mainAddress.address1.length>45)
				{
					var sub_address1 = data.mainAddress.address1.substring(45);
					data.mainAddress.address1 = data.mainAddress.address1.substring(0,45);
					data.mainAddress.address2 = data.mainAddress.address2 + sub_address1;
				}

				if(data.mainAddress.address2.length>45)
				{
					data.mainAddress.address2 = data.mainAddress.address2.substring(0,45);
				}

				cartPageCtrl.shipping = {
					"name" : data.humanName.fullName,
					"addr1" : data.mainAddress.address1,
					"addr2" : data.mainAddress.address2,
					"city" : data.mainAddress.city,
					"email" : data.email,
					"state" : data.mainAddress.city,
					"zip" : data.mainAddress.zip,
					"country" : "PH",
					"phone" : phone
				};
				cartPageCtrl.billing = {
					"name" : data.humanName.fullName,
					"addr1" : data.mainAddress.address1,
					"addr2" : data.mainAddress.address2,
					"city" : data.mainAddress.city,
					"email" : data.email,
					"state" : data.mainAddress.city,
					"zip" : data.mainAddress.zip,
					"country" : "PH",
					"phone" : phone
				};
				cartPageCtrl.pickupAddress.name = data.humanName.fullName;
			}
		});
		$(".cart-shipping-billing").hide();
		cartPageCtrl.shippingMethodChanged = function(){
			if(cartPageCtrl.shippingMethod==3)
			{
				$(".cart-shipping-billing").hide();
			}
			else
			{
				$(".cart-shipping-billing").show();
			}
		};
		cartPageCtrl.toggleShippingForm = function() {
			$("#shipping-form").slideToggle();
			$("#ship-to-icon-label").toggleClass("rotate");
		};
		cartPageCtrl.toggleBillingForm = function() {
			$("#billing-form").slideToggle();
		};
		cartPageCtrl.order = function() {
			var total = 0;
			for (var id in cart.products) {
				total++;
			}
			var data = currentdata;
			var phone = data.mobilePhone != "" ? data.mobilePhone : data.homePhone;

			if(data.mainAddress.address1.length>45)
			{
				var sub_address1 = data.mainAddress.address1.substring(45);
				data.mainAddress.address1 = data.mainAddress.address1.substring(0,45);
				data.mainAddress.address2 = data.mainAddress.address2 + sub_address1;
			}

			if(data.mainAddress.address2.length>45)
			{
				data.mainAddress.address2 = data.mainAddress.address2.substring(0,45);
			}

			cartPageCtrl.shipping = {
				"name" : data.humanName.fullName,
				"addr1" : data.mainAddress.address1,
				"addr2" : data.mainAddress.address2,
				"city" : data.mainAddress.city,
				"email" : data.email,
				"state" : data.mainAddress.city,
				"zip" : data.mainAddress.zip,
				"country" : "PH",
				"phone" : phone
			};
			cartPageCtrl.billing = {
				"name" : data.humanName.fullName,
				"addr1" : data.mainAddress.address1,
				"addr2" : data.mainAddress.address2,
				"city" : data.mainAddress.city,
				"email" : data.email,
				"state" : data.mainAddress.city,
				"zip" : data.mainAddress.zip,
				"country" : "PH",
				"phone" : phone
			};
			cartPageCtrl.pickupAddress.name = data.humanName.fullName;


			if(localStorage.getItem("perid_on") == "true"){
				$("#commission").html( $('#periodmm').find(":selected").text());
			}
			if(total > 0){
				var ss;
				var bb;
				if (!cart.calculated) {
					if(cartPageCtrl.shippingMethod == 3)
					{
						ss = cartPageCtrl.pickupAddress;
						bb = cartPageCtrl.pickupAddress;
					}else{

						cartPageCtrl.shipping = {
							"name" : $('#shipping_name').val(),
							"addr1" : $('#shipping_address1').val(),
							"addr2" : $('#shipping_address2').val(),
							"city" : $('#shipping_city').val(),
							"email" : $('#shipping_email').val(),
							"state" : $('#shipping_city').val(),
							"zip" : $('#shipping_zip').val(),
							"country" : "PH",
							"phone" : $('#shipping_phone').val()
						};
						cartPageCtrl.billing = {
							"name" : $('#shipping_name').val(),
							"addr1" : $('#shipping_address1').val(),
							"addr2" : $('#shipping_address2').val(),
							"city" : $('#shipping_city').val(),
							"email" : $('#shipping_email').val(),
							"state" : $('#shipping_city').val(),
							"zip" : $('#shipping_zip').val(),
							"country" : "PH",
							"phone" : $('#shipping_phone').val()
						};

						ss = cartPageCtrl.shipping;
						bb = cartPageCtrl.billing;

					}

					if(cartPageCtrl.shipping.addr1.length>45)
					{
						var sub_address1 = cartPageCtrl.shipping.addr1.substring(45);
						cartPageCtrl.shipping.addr1 = cartPageCtrl.shipping.addr1.substring(0,45);
						cartPageCtrl.shipping.addr2 = cartPageCtrl.shipping.addr2 + sub_address1;
					}
					if(cartPageCtrl.shipping.addr2.length>45)
					{
						cartPageCtrl.shipping.addr2 = cartPageCtrl.shipping.addr2.substring(0,45);
					}

					$(element).find("#cart-primary-button").text("Calculating...");
					cart.calculateOrder(cartPageCtrl.shippingMethod, ss, bb , cartPageCtrl.linkPayment);
				} else {

				}

			}

		};
		cartPageCtrl.linkPayment = function(link)
		{
			var trust_link = $sce.trustAsResourceUrl(link);
			//console.log("Opening Link :"+trust_link);
			window.open(trust_link,'_system');
		};
		cartPageCtrl.removeProduct = function(id) {
			cart.removeProduct(id);
		};
	}]);

	app.controller("ShoppingPageController", ['$http', '$element', '$scope', '$rootScope', '$filter', 'ShoppingCart', 'ShareComponents',
	function($http, element, $scope, $rootScope, $filter, cart, sharedComponents) {
		var shoppingPageCtrl = this;
		shoppingPageCtrl.selectedTab = "product-all";
		shoppingPageCtrl.categories = [];
		shoppingPageCtrl.products = [];
		shoppingPageCtrl.shownProducts = [];
		shoppingPageCtrl.productsPage = 1;
		shoppingPageCtrl.easyships = [];
		shoppingPageCtrl.filter = "";
		shoppingPageCtrl.addToCart = function(id, fromHome) {
			var qty;
			if (fromHome) {
				qty = 1;
			} else {
				qty = $(element).find("#qty-" + id + " option:selected").val();
			}
			var product = $filter('filter')(shoppingPageCtrl.products, {id: id})[0];
			if (product == null) {
				product = $filter('filter')(shoppingPageCtrl.easyships, {id: id})[0];
			}
			cart.addProduct(id, qty, product);

			$('#periodmm_cs').addClass('hide');
				$("#periodmm").html();
						$http.get('http://dsc.unicity-th.com/getdata1.php?type=209' ).success(function(response) {
			console.log(response);

			var months = [ "January", "February", "March", "April", "May", "June",
			 "July", "August", "September", "October", "November", "December" ];


			var monthsth =  ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];


					var dataSet = JSON.stringify(response, undefined, 4);
			var obj  = jQuery.parseJSON(dataSet);
				console.log(obj.perid);
				localStorage.setItem("perid_on",obj.perid);
					if (obj.perid) {
											$('#periodmm_cs').removeClass('hide');


													$('#periodmm_cs').removeClass('hide');
													var p1 = "";
													if(localStorage.getItem("language") == "en"){
														var res = obj.p1.split("-");
															p1 = months[parseInt(res[1])-1]+" "+res[0];
													}else{
															var res = obj.p1.split("-");
															console.log(res[1]);
															p1 = monthsth[parseInt(res[1])-1]+" "+res[0];
													}


													var p2 = "";
													if(localStorage.getItem("language") == "en"){
														var res = obj.p2.split("-");
															p2 = months[parseInt(res[1])-1]+" "+res[0];
													}else{
																var res = obj.p2.split("-");
															p2 = monthsth[parseInt(res[1])-1]+" "+res[0];
													}



													$("#periodmm").html('<option value="'+obj.p1+'">'+p1+'</option><option value="'+obj.p2+'">'+p2+'</option>');


										}else{
											$('#periodmm_cs').addClass('hide');
											$("#periodmm").html();

											var d = new Date();
											var n = d.getMonth();
											var y = d.getFullYear();


							if(localStorage.getItem("language") == "en"){
									$("#commission").html(months[n]+" "+y);
							}else{
									$("#commission").html(monthsth[n]+" "+y);
							}
						}

						});


			if (fromHome) {
				sharedComponents.changePage("cart");
			} else {
				$(element).find("form")[0].reset();


			/*	$.ajax({
					'type' : 'GET',
					'url' : 'http://dsc.unicity-th.com/getdata.php?type=209',
					'dataType' : 'jsonp',
					'success' : function(result) {
						console.log(" result=====> "+result);


					},
					'error' : function() {

					}
				});*/





                                // voy edit
				// add text
                                /*
                                $(element).find("#product-" + id + " .feedback").text("Added").fadeIn();
				setTimeout(function() {
					$(element).find("#product-" + id + " .feedback").fadeOut(2000);
				}, 2000);*/
			}
		};

		shoppingPageCtrl.changeTab = function(tab) {


			shoppingPageCtrl.selectedTab = tab;
			shoppingPageCtrl.filter = "";
			$(element).find(".tabs .tab-title").removeClass("active");
			$(element).find(".tabs-content .content").removeClass("active");
			$(element).find(".tabs .tab-title." + tab).addClass("active");
			$(element).find(".tabs-content .content#" + tab).addClass("active");

			$(element).find(".products-listing .product").show().addClass("show");


			shoppingPageCtrl.wrap2Columns();



		};
		shoppingPageCtrl.filterProducts = function(filter) {
			$(element).find(".tabs-content .content").removeClass("active");
			$(element).find(".tabs-content .content#product-all").addClass("active");
			$(element).find(".clear").remove();
			$(element).find(".products-listing .product").hide().removeClass("show");
			$(element).find(".products-listing .product." + filter).show().addClass('show');

			shoppingPageCtrl.wrap2Columns();
		};
		shoppingPageCtrl.wrap2Columns = function(){
			$(".products-listing").each(function(i,parent){
				$(parent).find(".clear").remove();
				$(parent).find(".product.show").each(function(j,child){
					if(j%2==0&&j>0)
					{
						var div = $("<div></div>").addClass("clear");
						$(child).before(div);
					}
				});



				//$("#page-shopping").fadeIn().delay(100);


			});
		};
		shoppingPageCtrl.getCategories = function() {


							//	$('#page-shopping').addClass("loading");

			shoppingPageCtrl.categories = [];
			$http.get('http://membermy.unicity-easynet.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_product_categories').success(function(response) {
				shoppingPageCtrl.categories = [];
				for (var i in response) {
					if (response[i].slug == "easyship") {
						continue;
					}
					var category = {
						'name' : response[i].name,
						'slug' : response[i].slug
					};
					shoppingPageCtrl.categories.push(category);

									//	$('#page-shopping').removeClass("loading");
				}
			});
		};
		$scope.$watch(function() {
			return localStorage.getItem("language");
		}, function(v) {
				console.log(" getData=====> ");
			shoppingPageCtrl.getData();
			shoppingPageCtrl.getCategories();
		});
		$scope.$watch(function() {
			return sharedComponents.currentPage;
		}, function(v) {
			if (v != "shopping") {
				if (v != "payment") {
					$("#payment-gateway")[0].src = "about:blank";
				}
				shoppingPageCtrl.changeTab("product-all");

				//$("#product-easyship").scrollTop()

				//shoppingPageCtrl.removeShownProduct();
			} else {
				setTimeout(function() {
					shoppingPageCtrl.showMoreProducts();
				}, 5000);
			}

			if(v == "cart"){

				$('#periodmm_cs').addClass('hide');
				$("#periodmm").html();


$('#periodmm_cs').addClass('hide');
	$("#periodmm").html();
			$http.get('http://dsc.unicity-th.com/getdata1.php?type=209' ).success(function(response) {
console.log(response);

var months = [ "January", "February", "March", "April", "May", "June",
 "July", "August", "September", "October", "November", "December" ];


var monthsth =  ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];


		var dataSet = JSON.stringify(response, undefined, 4);
var obj  = jQuery.parseJSON(dataSet);
	console.log(obj.perid);
	localStorage.setItem("perid_on",obj.perid);
		if (obj.perid) {
								$('#periodmm_cs').removeClass('hide');


										$('#periodmm_cs').removeClass('hide');
										var p1 = "";
										if(localStorage.getItem("language") == "en"){
											var res = obj.p1.split("-");
												p1 = months[parseInt(res[1])-1]+" "+res[0];
										}else{
												var res = obj.p1.split("-");
												console.log(res[1]);
												p1 = monthsth[parseInt(res[1])-1]+" "+res[0];
										}


										var p2 = "";
										if(localStorage.getItem("language") == "en"){
											var res = obj.p2.split("-");
												p2 = months[parseInt(res[1])-1]+" "+res[0];
										}else{
													var res = obj.p2.split("-");
												p2 = monthsth[parseInt(res[1])-1]+" "+res[0];
										}



										$("#periodmm").html('<option value="'+obj.p1+'">'+p1+'</option><option value="'+obj.p2+'">'+p2+'</option>');


							}else{
								$('#periodmm_cs').addClass('hide');
								$("#periodmm").html();

								var d = new Date();
								var n = d.getMonth();
								var y = d.getFullYear();


				if(localStorage.getItem("language") == "en"){
						$("#commission").html(months[n]+" "+y);
				}else{
						$("#commission").html(monthsth[n]+" "+y);
				}
			}

			});

			}

		});
		shoppingPageCtrl.loadData = function(page) {
			console.log("Loading products page : " + page);


			$.ajax({
				'type' : 'GET',
				'url' : 'http://membermy.unicity-easynet.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_products&args[order]=asc&args[posts_per_page]=10&args[paged]=100',
				'dataType' : 'jsonp',
				'success' : function(result) {
					console.log(" result=====> "+result);


				},
				'error' : function() {

				}
			});




			//	$('#page-shopping').addClass("loading");
			$http.get('http://membermy.unicity-easynet.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_products&args[order]=asc&args[posts_per_page]=10&args[paged]=' + page).success(function(response) {
				var language = localStorage.getItem("language");

				if (response.length > 0) {
//	$('#page-shopping').removeClass("loading");
					for (var i in response) {
						var name = "";
						var desc = "";
						if (language == "PH") {
							name = response[i].post_title_th;
							desc = response[i].post_content_th;
						} else {
							name = response[i].post_title;
							desc = response[i].post_content;
						}
						var product = {
							'thumbnail' : response[i].image,
							'name' : name,
							'desc' : response[i].product_id+" : "+desc,
							'id' : response[i].product_id,
							'pv' : response[i].pv,
							'price' : response[i].member_price,
							'product_cat' : response[i].product_cat.trim()
						};
						if (response[i].product_cat.trim() != "easyship") {
							shoppingPageCtrl.products.push(product);
						} else {
							shoppingPageCtrl.easyships.push(product);
						}
					}
					shoppingPageCtrl.loadData(page + 1);
				} else {
					shoppingPageCtrl.showProducts();
					setTimeout(function() {
						shoppingPageCtrl.showMoreProducts();
						//	$('#page-shopping').removeClass("loading");
					}, 5000);
				}
			});
		};
		shoppingPageCtrl.getData = function() {
			var page;
			if (page == null) {
				page = 1;
				shoppingPageCtrl.products = [];
				shoppingPageCtrl.easyships = [];
				var height = $(window).height() - 163;
				$(".products-page .tabs-content").css("height", height);
			}
			shoppingPageCtrl.loadData(page);
		};
		shoppingPageCtrl.showProducts = function() {
			shoppingPageCtrl.shownProducts = [];
			for (var i = 0; i < shoppingPageCtrl.products.length; i++) {
				var product = shoppingPageCtrl.products[i];
				shoppingPageCtrl.shownProducts[i] = product;
			}
		};
		shoppingPageCtrl.showMoreProducts = function() {
			var length = shoppingPageCtrl.products.length;

			for (var i = 10; i < length; i++) {
				var product = shoppingPageCtrl.products[i];
				shoppingPageCtrl.shownProducts[i] = product;
			}
			$(".products-listing .product").addClass('show');
			shoppingPageCtrl.wrap2Columns();
		};
		shoppingPageCtrl.removeShownProduct = function() {
			var length = shoppingPageCtrl.products.length;
			shoppingPageCtrl.shownProducts.splice(10, length - 11);
		};
		shoppingPageCtrl.getCategories();
	}]);
})();
