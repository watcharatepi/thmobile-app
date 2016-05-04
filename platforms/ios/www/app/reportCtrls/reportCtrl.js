/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('reportCtrl', []);
    app.controller("reportController", ['$http','$scope','$element','$sce','ProfileDataBlock',function($http,$scope,$element,$sce,profileDataBlock) {
        var reportCtrl = this;
        $scope.links = {
            genealogy: "https://secure.unicity.net/unicitytha/gen.cfm?Token=",
            commission: "https://secure.unicity.net/unicitytha/bonusmain.cfm?Token=",
            orderTracking: "https://secure.unicity.net/unicitytha/orderlst.cfm?Token=",
        };
        reportCtrl.iframe_src = "";

        $scope.$on('ProfileComplete',function(){
            //$scope.generateToken(true);
                localStorage.setItem("loaddata","0");

              reportCtrl.itemlist = [];

            $.ajax({
              'type':'GET',
                'url':'http://mobile.unicity-th.com/wp-admin/admin-ajax.php?action=unimobiapp_get_products',
                'success':function (response) {

                  for (var i in response) {
                            var items = response[i];
                            var ar = {
                                 'product_id' : items.product_id,
                                 'image' : items.image,
                               };
                            reportCtrl.itemlist.push(ar);
                        }
                    },
                    'error':function (results) {

                    }
                });

        });

        reportCtrl.orderlist = [];
  reportCtrl.detail = [];
    reportCtrl.detailitem = [];
  reportCtrl.lines = [];
  		reportCtrl.order = [];
	reportCtrl.currentlink = "";
  reportCtrl.itemlist = [];
        reportCtrl.print  = function(){
          if(localStorage.getItem("language") == "en"){
            var trust_link =   'http://members.unicity-th.com/orderhistorydetail_en.php?session='+profileDataBlock.sessionToken+'&ssurl='+localStorage.getItem("profileUrl")+'&link='+reportCtrl.currentlink+'&print=1'
      window.open(trust_link,'_blank');
          }else{
            var trust_link =   'http://members.unicity-th.com/orderhistorydetail.php?session='+profileDataBlock.sessionToken+'&ssurl='+localStorage.getItem("profileUrl")+'&link='+reportCtrl.currentlink+'&print=1'
      window.open(trust_link,'_blank');
          }

        };
      reportCtrl.orderhistory = function(month){

            $("#page-loading-container1").removeClass("hide");

        $('#statement-view').removeClass("hide");
    $('#orderselect').removeClass("hide");
    $('#report-iframe').addClass("hide");
    $('#orderselect').removeClass("hide");

      $('#orderhistory1').removeClass("hide");
    $('#orderhistorydetail1').addClass("hide");

    reportCtrl.orderlist = [];
reportCtrl.detail = [];
reportCtrl.detailitem = [];
reportCtrl.lines = [];
  reportCtrl.order = [];


                  if(!month ){
                    month = 1;
                  }

                      //    $('#history4').removeClass("btn add-to-cart-btn btn-primary");
                //
                $('#history1').removeClass();
                $('#history2').removeClass();
                $('#history3').removeClass();

                  if(month == 1){

                      $('#history1').addClass("btn btn-primary");

                       $('#history2').addClass("btn btn-default");
                         $('#history3').addClass("btn btn-default");

                  }else   if(month == 3){

                     $('#history1').addClass("btn  btn-default");
                    $('#history2').addClass("btn  btn-primary");
                     $('#history3').addClass("btn  btn-default");

                  }else   if(month == 6){
                     $('#history1').addClass("btn  btn-default");
                      $('#history2').addClass("btn  btn-default");
                     $('#history3').addClass("btn  btn-primary");

                    }else   if(month == 12){
                    //  $('#history4').addClass("btn add-to-cart-btn btn-primary");

                    }



                    /*$.ajax({
                      'type':'GET',
                        'url':'http://members.unicity-th.com/mobile/queryorder.php?type=1&token='+profileDataBlock.sessionToken,
                        'success':function (results) {

                          var obj =  jQuery.parseJSON(results);



                            for (var i in obj) {
                              var items = obj[i];

                            var ar = {
                                 'orderid' : items.orderid,
                               'href' : items.href,
                               'date' : items.date,
                               'total' : items.total,
                               'pvdate' :   items.pvdate
                             };
                               reportCtrl.data.push(ar);

                            }



                               console.log(ar);
                               $('#orderhistory1').removeClass("hide");
                               $('#orderhistory1').addClass("show");
                              $(".list-group .reportorder").addClass('show');

                        },
                        'error':function (results) {
                            $('#orderhistory1').removeClass("hide");
                        }
                    });*/


                      var url = 'http://members.unicity-th.com/mobile/queryorder.php?type=1&token='+profileDataBlock.sessionToken+"&month="+month;
                      if(localStorage.getItem("loaddata")=="1"){
                          var url = 'http://members.unicity-th.com/mobile/queryorder.php?type=1&token='+profileDataBlock.sessionToken+"&month="+month;

                      }
                        console.log(url);

                    $http.get(url).success(function(response) {


                    //  var obj =  jQuery.parseJSON(response);
                  console.log(response);
                  localStorage.setItem("loaddata","1");
                        if(response.length>0){



                        for (var i in response) {
                          var items = response[i];
                            if(items.pvdate){
                              var year =   items.pvdate.substring(0, 4);
                              var month =   items.pvdate.substring(4, items.pvdate.length);
                            }else{
                              var year ="";
                              var month = "";
                            }


                        var ar = {
                             'orderid' : items.orderid,
                           'href' : items.href,
                           'date' : items.date,
                           'total' : items.total.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g,"$1,"),
                           'pvdate' :  month+"/"+year
                         };
                           reportCtrl.order.push(ar);

                        }
                        reportCtrl.showOrder();

                      }else{
                        //alert("à¹„à¸¡à¹ˆà¸žà¸šà¸‚à¹‰à¸­à¸¡à¸¹à¸¥");
                          $("#page-loading-container1").addClass("hide");
                      }

                    }).error({
                      //shoppingPageCtrl.showProducts();
                    });


      };

        reportCtrl.orderhistorydetail = function(href)
        {
            reportCtrl.currentlink = href;
          reportCtrl.detail = [];
            reportCtrl.detailitem = [];
        //  alert(profileDataBlock.sessionToken);

        /*  $.ajax({
                'type':'GET',
                'headers':{'Authorization':' Bearer ' + profileDataBlock.sessionToken},
                'url':href,
                'success':function (results) {

                  //  var obj1 =  jQuery.parseJSON(results);


                  var ar = {
                      'orderid' : items.id.unicity.substring(3, items.id.unicity.length),
                    'href' : items.href,
                    'date' : items.dateCreated.substring(0,10),
                    'total' : ""+parseFloat(items.terms.total).toFixed(),
                    'pv' :   results.ITEMS[0].PV_DATE
                  };
                    reportCtrl.data.push(ar);


                },
                'error':function () {
                }
            });*/

          /*  var tmp = '{"customer": {"id": {"unicity": "171810666"},"href": "https://hydra.unicity.net/v5/customers/a9c371ec65e55b499d2b0d9059b3f5f74c5c433c4ad62f44725952b9e0fb0416"  },"terms": {"discount": {  "amount": 0  },  "tax": {"amount": 372.9  },"freight": {"amount": 0},"subtotal": 5327.1,"total": 5700,"pv": 100},"lines": {"items": [  {"item": {"id": {"unicity": "24741"}},"terms": {  "priceEach": 5327.1,"pvEach": 100  },"quantity": 1}]},  "dateCreated": "2015-09-22T00:00:00-05:00","id": {"unicity": "66-420739397"},"transactions": {  "items": [{"amount": 5700,"authorization": "","type": "record","method": ""}]},"shipToAddress": {"address1": "9/3 Rangsit Apartment 2 Bldg. Rangsit-Pathumthani 7","address2": "T. Prachathipat A. Thanyaburi","city": "","zip": "","country": "TH"},"shipToName": {"firstName": "Khun","lastName": "Pranee Health Vision Limited PartnerShip","fullName": "Khun Pranee Health Vision Limited PartnerShip","fullName@th": "Khun Pranee Health Vision Limited PartnerShip"},"shipToPhone": "028180969","href": "https://hydra.unicity.net/v5/orders/2d26d782fd01ca1c99feeff834a75ebee954ac24f77e74e4e240607d5bfc0a9f"}';


            var obj =  jQuery.parseJSON(tmp);


            var ar = {
                'customerid' : obj.customer.id.unicity,
                'customerhref' : obj.customer.href,
                  'amount' : obj.terms.tax.amount,
                    'subtotal' : obj.terms.subtotal,
                      'total' : obj.terms.total,
                        'pv' : obj.terms.pv,
                          'address1' : obj.shipToAddress.address1,
                          'address2' : obj.shipToAddress.address2,
                            'city' : obj.shipToAddress.city,
                              'zip' : obj.shipToAddress.zip,
                              'country' : obj.shipToAddress.country,
                                    'shipname' : obj.shipToName.fullName,
                                      'shipphone' : obj.shipToPhone,

            };
            console.log(obj.lines.items);
            for (var i in obj.lines.items) {

            }


              reportCtrl.detail.push(ar);*/
  $("#page-loading-container1").removeClass("hide");
   $('#orderhistory1').addClass("hide");
    $('#orderselect').addClass("hide");
              //console.log("load detail");
              //console.log('http://members.unicity-th.com/mobile/queryorder.php?type=2&token='+profileDataBlock.sessionToken+'&ssurl='+localStorage.getItem("profileUrl")+'&link='+href);

               $http.get('http://members.unicity-th.com/mobile/queryorder.php?type=2&token='+profileDataBlock.sessionToken+'&ssurl='+localStorage.getItem("profileUrl")+'&link='+href).success(function(response) {



  //  console.log("load response"+response);
                                                              for (var i in response[3]) {



                                                                   var items = response[3][i];
                                                                   var image = "http://members.unicity-th.com/mobile/imgs/profile/default.png";
                                                                   for (var i = 0; i < reportCtrl.itemlist.length; i++) {
                                                                             if (reportCtrl.itemlist[i]['product_id'] === items.itemid ) {
                                                                               image = reportCtrl.itemlist[i]['image'];
                                                                             }
                                                                    }
                                                                    console.log("====>"+items.qty);
                                                                    var itemar = {
                                                                      'itemname' : items.itemname,
                                                                      'itemimage' : image,
                                                                        'itemid' : items.itemid,
                                                                        'price' : items.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g,"$1,"),
                                                                        'pv' : items.pv,
                                                                          'qty' : items.qty,
                                                                        'pvall' : items.pvall,
                                                                        'priceall' : items.priceall.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g,"$1,"),
                                                                    }
                                                                    console.log(itemar);
                                                                            reportCtrl.detailitem.push(itemar);
                                                                 }
                                                                 if(response[0].pvdate){
                                                                   var year =   response[0].pvdate.substring(0, 4);
                                                                   var month =   response[0].pvdate.substring(4, response[0].pvdate.length);
                                                                 }else{
                                                                   var year ="";
                                                                   var month = "";
                                                                 }


                                                                 var ar = {
                                                                     'invoicedate' : response[0].invoicedate,
                                                                      'invoiceid' : response[0].invoiceid,
                                                                      'customerid' : response[0].customerid,
                                                                         'pvdate' : month+"/"+year,
                                                                            'initial' : response[0].initial,
                                                                             'leftname' : response[1].name,
                                                                               'leftaddress' : response[1].address,
                                                                                  'leftaddress2' : response[1].address2,
                                                                                    'leftcity' : response[1].city,
                                                                                    'leftzip' : response[1].zip,
                                                                                          'leftcountry' : response[1].country,
                                                                                              'leftmobile' : response[1].mobile,
                                                                               'rightname' : response[2].name,
                                                                                 'rightaddress' : response[2].address,
                                                                                 'rightaddress2' : response[2].address2,
                                                                                   'rightcity' : response[2].city,
                                                                                   'rightzip' : response[2].zip,
                                                                                         'rightcountry' : response[2].country,
                                                                                             'rightmobile' : response[2].mobile,

                                                                                   'count' : response[4].count,
                                                                                         'pv' : response[4].pv,
                                                                                           'total1' : response[4].total.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g,"$1,"),
                                                                                           'tax' : response[5].tax.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g,"$1,"),
                                                                                              'cost1' : response[5].cost.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g,"$1,"),
                                                                                                'total2' : response[5].total.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g,"$1,"),
                                                                                                  'method' : response[6].method,
                                                                                                    'cost2' : response[6].cost.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g,"$1,"),
                                                                                                      'total3' : response[6].total.toFixed(2).replace(/(\d)(?=(\d{3})+\.\d\d$)/g,"$1,"),

                                                                 };

                                                                 $('#leftaddress').html(response[1].address);
                                                                    $('#rightaddress').html(response[2].address);
                                                                 reportCtrl.detail.push(ar);





  $("#page-loading-container1").addClass("hide");
                                                                           $('#orderhistorydetail1').removeClass("hide");



                }).error({
                  //shoppingPageCtrl.showProducts();
                });




        };

        reportCtrl.showOrder = function() {
          //$(".products-listing .product").addClass('show');

          reportCtrl.orderlist = [];
          for (var i = 0; i < reportCtrl.order.length; i++) {
            var o = reportCtrl.order[i];
            reportCtrl.orderlist[i] = o;
          }
          $("#page-loading-container1").addClass("hide");
          $('#orderhistory1').removeClass("hide");
        //  $('#orderhistory1').addClass("show");
        // $(".list-group .reportorder").addClass('show');

        };
        reportCtrl.backhistory = function()
        {
            $('#orderselect').removeClass("hide");
           $('#orderhistory1').removeClass("hide");
            $('#orderhistorydetail1').addClass("hide");
        };

        reportCtrl.loadReport = function(tab)
        {
              $("#framediv").addClass("hide");
            $("#page-loading-container").addClass("hide");
            //  $scope.generateToken(false);
            console.log('Loading Report :'+tab);
            switch(tab)
            {
                case 'genealogy':
                    $("#framediv").removeClass("hide");
  $("#report-iframe").removeClass("hide");

                $scope.generateToken1(tab);

              //  reportCtrl.iframe_src = $sce.trustAsResourceUrl($scope.links.genealogy);

                //localStorage.setItem("loaddata","0");
                  $("#page-loading-container1").removeClass("hide");
                $('#orderhistory1').addClass("hide");
                 $('#orderselect').addClass("hide");
                   $('#orderhistorydetail1').addClass("hide");
                   $('#report-iframe').removeClass("hide");

                    break;
                case 'commission':
                  $("#framediv").removeClass("hide");
  $("#report-iframe").removeClass("hide");
                $scope.generateToken1(tab);

              //  reportCtrl.iframe_src = $sce.trustAsResourceUrl($scope.links.commission);


                //  localStorage.setItem("loaddata","0");
                  $("#page-loading-container1").removeClass("hide");
                  $('#orderhistory1').addClass("hide");
                   $('#orderselect').addClass("hide");
                     $('#orderhistorydetail1').addClass("hide");
                        $('#report-iframe').removeClass("hide");
                    break;
                case 'order':
                    $("#framediv").addClass("hide");
                $("#report-iframe").addClass("hide");
                $('#orderselect').removeClass("hide");
                    $('#orderhistory1').removeClass("hide");
                console.log(localStorage.getItem("loaddata"));
                        if(  localStorage.getItem("username")){



                            if(localStorage.getItem("loaddata") =="0"){
                              reportCtrl.orderhistory(1);
                            }else{

                              $('#statement-view').removeClass("hide");
                          $('#orderselect').removeClass("hide");
                          $('#report-iframe').addClass("hide");
                          $('#orderselect').removeClass("hide");

                            $('#orderhistory1').removeClass("hide");
                          $('#orderhistorydetail1').addClass("hide");
                            }
                                            //  var dataSet = JSON.stringify(tmp, undefined, 4);





                        }else{
                            reportCtrl.iframe_src = $sce.trustAsResourceUrl($scope.links.commission);

                        }


                  //


                    break;
            }

            //reportCtrl.$apply();
        }


            $scope.$on('page_change',function(){
                // alert(sessionStorage.getItem("cpage"));

                //localStorage.setItem("loaddata","0");
                if(localStorage.getItem("cpage") == "report"){
                //  alert(localStorage.getItem("loaddata"));
                    if(localStorage.getItem("loaddata") =="0"){
                      $scope.generateToken();
                    }

                }
                $("#page-loading-container1").addClass("hide");

            });


        $element.find(".report-tab").click(function(){
            $element.find(".report-tab").removeClass("active");
            $(this).addClass("active");
            //$("#page-loading-container").removeClass("hide");
        });
        $element.find("#report-iframe").load(function(){
          $("#page-loading-container").addClass("hide");
            $("#page-loading-container1").addClass("hide");
        });



        $scope.generateToken1 = function(tab){


          $http.get('http://members.unicity-th.com/mobile/gentoken.php?token='+ profileDataBlock.sessionToken).success(function(response) {

            //alert(response);
              if(response.length>0){
                var token = response.token;
                $scope.links.genealogy = "https://secure.unicity.net/unicitytha/gen.cfm?Token="+response;
                $scope.links.commission = "https://secure.unicity.net/unicitytha/bonusmain.cfm?Token="+response;
                $scope.links.orderTracking = "https://secure.unicity.net/unicitytha/orderlst.cfm?Token="+response;
                if(tab == "genealogy"){
                  reportCtrl.iframe_src = $sce.trustAsResourceUrl("https://secure.unicity.net/unicitytha/gen.cfm?Token="+response);
                }

                if(tab == "commission"){
                  reportCtrl.iframe_src = $sce.trustAsResourceUrl("https://secure.unicity.net/unicitytha/bonusmain.cfm?Token="+response);

                }

            }else{
              //alert("à¹„à¸¡à¹ˆà¸žà¸šà¸‚à¹‰à¸­à¸¡à¸¹à¸¥");
                $("#page-loading-container1").addClass("hide");
            }

          }).error({
            //shoppingPageCtrl.showProducts();
          });


          //  alert(profileDataBlock.sessionToken);
          /*  $.ajax({
                'type':'POST',
                'headers':{'Authorization':' Bearer ' + profileDataBlock.sessionToken},
                'url':'https://hydra.unicity.net/v5/customers/me/nettraxtokens',
                'success':function (results) {
                    var token = results.token;
                    alert(token);
                    $scope.links.genealogy = "https://secure.unicity.net/unicitytha/gen.cfm?Token="+token;
                    $scope.links.commission = "https://secure.unicity.net/unicitytha/bonusmain.cfm?Token="+token;
                    $scope.links.orderTracking = "https://secure.unicity.net/unicitytha/orderlst.cfm?Token="+token;
                    if(tab == "genealogy"){
                      reportCtrl.iframe_src = $sce.trustAsResourceUrl($scope.links.genealogy);
                    }

                    if(tab == "commission"){
                      reportCtrl.iframe_src = $sce.trustAsResourceUrl($scope.links.commission);

                    }
                },
                'error':function () {
                    alert("error");
                }
            });*/



        };

        $scope.generateToken = function(first_time){
          /*  $.ajax({
                'type':'POST',
                'headers':{'Authorization':' Bearer ' + profileDataBlock.sessionToken},
                'url':'https://hydra.unicity.net/v5/customers/me/nettraxtokens',
                'success':function (results) {
                    var token = results.token;
                    $scope.links.genealogy = "https://secure.unicity.net/unicitytha/gen.cfm?Token="+token;
                    $scope.links.commission = "https://secure.unicity.net/unicitytha/bonusmain.cfm?Token="+token;
                    $scope.links.orderTracking = "https://secure.unicity.net/unicitytha/orderlst.cfm?Token="+token;
                    reportCtrl.loadReport('order');
                },
                'error':function () {
                }
            });*/
              //$scope.generateToken1();
              reportCtrl.loadReport('order');
        };
    }]);
})();
