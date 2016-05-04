/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    var app = angular.module('homeProductCtrl', []);
    app.controller("HomeProductController", ['$http', '$element', '$scope', 'ShareComponents', function($http, element, $scope, sharedComponents) {
            var productsCtrl = this;

            productsCtrl.addToCart = function(id) {
                cart.addProduct(id, 1);
            };

            productsCtrl.setup = function() {
                var network = productsCtrl.data.length + 1;
                var width = sharedComponents.width;
                var profile_width = width / 2;
                $(element).find('.shopping-products-slider').css("width", (profile_width * network) + "px");
                setTimeout(function() {
                    $(".shopping-products-slider .product").css("width", profile_width + "px");
                }, 1000);
            };


            $http.get('http://membermy.unicity-easynet.com/cpanel/wp-admin/admin-ajax.php?action=unimobiapp_get_products&args[meta_key]=product_hot&args[meta_value]=yes').success(function(response) {
                //console.log('Hot Products');
                //console.log(response);
                productsCtrl.data = [];
                for (var i in response)
                {
                    var product = {
                        'id': response[i].product_id,
                        'thumbnail': response[i].image,
                        'title': response[i].post_title,
                        'content': response[i].post_content,
                    };
                    productsCtrl.data.push(product);
                }
                productsCtrl.setup();
            });
        }]);
})();
