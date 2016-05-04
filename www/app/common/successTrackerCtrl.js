/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
	var app = angular.module('successTrackerCtrl', ['pageCtrl', 'profileHeaderCtrl']);
	app.factory("MonthSelector", ['$rootScope',
	function($rootScope) {
		var monthSelect = {
			monthHistory : [],
			selected : 0
		};
		return monthSelect;
	}]);

	var first = 0 ;
	var f_pv = 0;
	var f_tv = 0;
	var f_leg1 = 0;
		var f_leg2 = 0;
			var f_leg3 = 0;

	app.controller("GoalSettingController", ['$http', '$element', '$scope', 'ShareComponents', 'ProfileDataBlock', 'MonthSelector',
	function($http, $element, $scope, sharedComponents, profileDataBlock, monthSelect) {
		var goalSettingCtrl = this;
		goalSettingCtrl.iconBase = './imgs/pin/';
		goalSettingCtrl.icon = '';
		goalSettingCtrl.goal = 1;
		goalSettingCtrl.successTracker;
		goalSettingCtrl.selectedMonth = 0;
		goalSettingCtrl.blockClass = "block-show-2";

		goalSettingCtrl.progress = {
			max : {
				pv : 100,
				ov : 100,
        tv : 100,
				leg1 : 5000,
				leg2 : 3000,
				leg3 : 1000,
			},
			earn : {
				pv : 0,
				ov : 0,
        tv : 0,
				leg1 : 0,
				leg2 : 0,
				leg3 : 0,
			}
		};
		goalSettingCtrl.nextGoal = function() {
			goalSettingCtrl.goal++;
			if (goalSettingCtrl.goal >= 11) {
				goalSettingCtrl.goal = 10;
			}
			goalSettingCtrl.refresh();
		};
		goalSettingCtrl.prevGoal = function() {
			goalSettingCtrl.goal--;
			if (goalSettingCtrl.goal < 1) {
				goalSettingCtrl.goal = 1;
			}
			goalSettingCtrl.refresh();
		};


		var circlepv = $('#circle_pv').circleProgress({
				startAngle: -Math.PI / 4 * 2,
				animation: false,
				size: 80,
				thickness: 7,
				fill: { color: '#008ae6' }
		});


		var circletv = $('#circle_tv').circleProgress({
				startAngle: -Math.PI / 4 * 2,
				animation: false,
				size: 80,
				thickness: 7,
				fill: { color: '#008ae6' }
		});






								var circle = $('#circle_leg1').circleProgress({
										startAngle: -Math.PI / 4 * 2,
										animation: false,
										size: 80,
										thickness: 7,
										animationStartValue: 0.0,
										fill: { color: '#008ae6' }
								});



		goalSettingCtrl.refresh = function() {

	$('#page-tracker').addClass("loading");
			var pv_index, ov_index, leg1_index, leg2_index, leg3_index;
			console.log("Refreshing Tracker");
			if (goalSettingCtrl.goal <= 1) {
				goalSettingCtrl.blockClass = "block-show-2";
				pv_index = 0;
				ov_index = 1;
				leg1_index = leg2_index = leg3_index = 2;
				$('#leg1-row_progress').hide();
					$('#leg2-row_progress').hide();
						$('#leg3-row_progress').hide();

			} else if (goalSettingCtrl.goal <= 2) {
				goalSettingCtrl.blockClass = "block-show-3";
				pv_index = 0;
				ov_index = 1;
				leg1_index = 2;
				leg2_index = leg3_index = 3;

				$('#leg1-row_progress').show();
					$('#leg2-row_progress').hide();
						$('#leg3-row_progress').hide();

			} else if (goalSettingCtrl.goal <= 3) {
				goalSettingCtrl.blockClass = "block-show-4";
				pv_index = 0;
				ov_index = 1;
				leg1_index = 2;
				leg2_index = 3;
				leg3_index = 4;

				$('#leg1-row_progress').show();
					$('#leg2-row_progress').show();
						$('#leg3-row_progress').hide();
			} else if(goalSettingCtrl.goal >= 10)
			{
				goalSettingCtrl.blockClass = "block-show-5";
				pv_index = 0;
				ov_index = 1;
				leg1_index = 2;
				leg2_index = 3;
				leg3_index = 4;
				$('#leg1-row_progress').show();
					$('#leg2-row_progress').show();
						$('#leg3-row_progress').show();
			}
			else {
				goalSettingCtrl.blockClass = "block-show-5";
				pv_index = 0;
				ov_index = 1;
				leg1_index = 2;
				leg2_index = 3;
				leg3_index = 4;
				$('#leg1-row_progress').show();
					$('#leg2-row_progress').show();
						$('#leg3-row_progress').show();
			}

			var goal = goalSettingCtrl.goal.toString();
			console.log(goalSettingCtrl.successTracker);
			console.log(goalSettingCtrl.successTracker);

			var data = goalSettingCtrl.successTracker.value[goal];
			console.log("Goal");
			console.log(data);



			//$('.progress .progress-bar').progressbar({display_text: 'center'});

			goalSettingCtrl.progress = {
				max : {
					pv : data.metrics[pv_index].requiredValue,
					ov : data.metrics[ov_index].requiredValue,
					leg1 : data.metrics[leg1_index].requiredValue,
					leg2 : data.metrics[leg2_index].requiredValue,
					leg3 : data.metrics[leg3_index].requiredValue,
				},
				earn : {
					pv : data.metrics[pv_index].value,
					ov : data.metrics[ov_index].value,
					leg1 : data.metrics[leg1_index].value,
					leg2 : data.metrics[leg2_index].value,
					leg3 : data.metrics[leg3_index].value,
				}
			};

			/*var $pb = $('.progress .progress-bar');
			$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
			$pb.progressbar({display_text: 'center'});
			$pb.attr('data-transitiongoal',leg1_index).progressbar();*/



			var speed = 500;
						var $pb = $('#pv-progress');

						$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
						$pb.progressbar({display_text: 'none'});
						$pb.progressbar({transition_delay: 50});

						var percentage = data.metrics[pv_index].value / data.metrics[pv_index].requiredValue;
						var total = Math.min(Math.floor(percentage * 100), 100);

						$pb.attr('data-transitiongoal', total).progressbar();

	f_pv  = total;


	$txtpv = $('#txtpv');

	$txtpv.countTo({
			from: 0,
			to: total,
			speed: speed,
			refreshInterval: 50,
			onUpdate: function (value) {
					$(this).css("color", "#000000");
					(this).append( "%" );
					$(this).css({ 'font-weight': 'none' });
					if(value == 100){

						$(this).css("color", "#008ae6");

					}
			},
			onComplete: function (value) {
				if(value == 100){
					$(this).css("color", "#008ae6");
						$(this).css({ 'font-size': '25px' });
							$(this).css({ 'font-weight': 'bold' });

				}

			}
		});





	circlepv.circleProgress('value',  total/100);




						$pb = $('#tv-progress');

						$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
						$pb.progressbar({display_text: 'none'});
						$pb.progressbar({transition_delay: 50});

						percentage = data.metrics[ov_index].value / data.metrics[ov_index].requiredValue;
						total = Math.min(Math.floor(percentage * 100), 100);

						$pb.attr('data-transitiongoal', total).progressbar();

f_tv  = total;




	$txtov = $('#txtov');

	$txtov.countTo({
			from: 0,
			to: total,
			speed: speed,
			refreshInterval: 50,
			onUpdate: function (value) {
					$(this).css("color", "#000000");
					(this).append( "%" );
					$(this).css({ 'font-weight': 'none' });
			},
			onComplete: function (value) {
				if(value == 100){
					$(this).css("color", "#008ae6");
						$(this).css({ 'font-weight': 'bold' });
				}
			}
		});


circletv.circleProgress('value',  total/100);


						$pb = $('#leg1-progress');

						$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
						$pb.progressbar({display_text: 'none'});
						$pb.progressbar({transition_delay: 50});

						percentage = data.metrics[leg1_index].value / data.metrics[leg1_index].requiredValue;
						total = Math.min(Math.floor(percentage * 100), 100);

						$pb.attr('data-transitiongoal', total).progressbar();

f_leg1  = total;

						//$('#lines').animateNumber({ number: total });

						circle.circleProgress('value',  total/100);

						$txtpb = $('#txtleg1');

						$txtpb.countTo({
								from: 0,
								to: total,
								speed: speed,
								refreshInterval: 50,
								onUpdate: function (value) {
										$(this).css("color", "#000000");
									  (this).append( "%" );
										$(this).css({ 'font-weight': 'none' });
								},
								onComplete: function (value) {
									if(value == 100){
										$(this).css("color", "#008ae6");
											$(this).css({ 'font-weight': 'bold' });
									}else{
											$(this).css("color", "#000000");
									}
								}
							});



						$pb = $('#leg2-progress');

						$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
						$pb.progressbar({display_text: 'none'});
						$pb.progressbar({transition_delay: 50});

						percentage = data.metrics[leg2_index].value / data.metrics[leg2_index].requiredValue;
						total = Math.min(Math.floor(percentage * 100), 100);

						$pb.attr('data-transitiongoal', total).progressbar();

f_leg2  = total;
						$txtleg2 = $('#txtleg2');

						$txtleg2.countTo({
								from: 0,
								to: total,
								speed: speed,
								refreshInterval: 50,
								onUpdate: function (value) {
										$(this).css("color", "#000000");
										(this).append( "%" );
										$(this).css({ 'font-weight': 'none' });
								},
								onComplete: function (value) {
									if(value == 100){
										$(this).css("color", "#008ae6");
											$(this).css({ 'font-weight': 'bold' });
									}else{
											$(this).css("color", "#000000");
									}
								}
							});


						var circle2 = $('#circle_leg2').circleProgress({
								startAngle: -Math.PI / 4 * 2,
								animation: false,
								size: 80,
								thickness: 7,
								fill: { color: '#008ae6' }
						});


						circle2.circleProgress('value',  total/100);




						$pb = $('#leg3-progress');

						$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
						$pb.progressbar({display_text: 'none'});
						$pb.progressbar({transition_delay: 50});

						percentage = data.metrics[leg3_index].value / data.metrics[leg3_index].requiredValue;
						total = Math.min(Math.floor(percentage * 100), 100);

						$pb.attr('data-transitiongoal', total).progressbar();
f_leg3  = total;

						$txtleg3 = $('#txtleg3');

						$txtleg3.countTo({
								from: 0,
								to: total,
								speed: speed,
								refreshInterval: 50,
								onUpdate: function (value) {
										$(this).css("color", "#000000");
										(this).append( "%" );
										$(this).css({ 'font-weight': 'none' });
								},
								onComplete: function (value) {
									if(value == 100){
										$(this).css("color", "#008ae6");
											$(this).css({ 'font-weight': 'bold' });
									}else{
											$(this).css("color", "#000000");
									}
								}
							});

						var circle3 = $('#circle_leg3').circleProgress({
								startAngle: -Math.PI / 4 * 2,
								animation: false,
								size: 80,
								thickness: 7,
								fill: { color: '#008ae6' }
						});


						circle3.circleProgress('value',  total/100);







							$('#page-tracker').removeClass("loading");

		};
		goalSettingCtrl.pinImage = {
			"0" : "01-distributor.png",
			"1" : "02-phase-1.png",
			"2" : "03-manager.png",
			"3" : "04-senior-manager.png",
			"4" : "05-executive-manager.png",
			"5" : "06-drector.png",
			"6" : "07-senior-director.png",
			"7" : "08-executive-director.png",
			"8" : "09-presidential-director.png",
			"9" : "10-presidential-sapphire.png",
			"10" : "11-presidential-ruby.png",
			"11" : "12-presidential-diamond.png",
		};
		goalSettingCtrl.pinName = {
			"0" : _echo("pin", "th", "distributor"),
			"1" : _echo("pin", "th", "phase_1"),
			"2" : _echo("pin", "th", "manager"),
			"3" : _echo("pin", "th", "senior_manager"),
			"4" : _echo("pin", "th", "executive_manager"),
			"5" : _echo("pin", "th", "director"),
			"6" : _echo("pin", "th", "senior_director"),
			"7" : _echo("pin", "th", "executive_director"),
			"8" : _echo("pin", "th", "presidential_director"),
			"9" : _echo("pin", "th", "presidential_sapphire"),
			"10" : _echo("pin", "th", "presidential_ruby"),
			"11" : _echo("pin", "th", "presidential_diamond"),
		};
		var month_array = _getLabels("months");
		$scope.$watch(function() {
			return localStorage.getItem("language");
		}, function(v) {
			goalSettingCtrl.pinName = {
				"0" : _echo("pin", "th", "distributor"),
				"1" : _echo("pin", "th", "phase_1"),
				"2" : _echo("pin", "th", "manager"),
				"3" : _echo("pin", "th", "senior_manager"),
				"4" : _echo("pin", "th", "executive_manager"),
				"5" : _echo("pin", "th", "director"),
				"6" : _echo("pin", "th", "senior_director"),
				"7" : _echo("pin", "th", "executive_director"),
				"8" : _echo("pin", "th", "presidential_director"),
				"9" : _echo("pin", "th", "presidential_sapphire"),
				"10" : _echo("pin", "th", "presidential_ruby"),
				"11" : _echo("pin", "th", "presidential_diamond"),
			};
			month_array = _getLabels("months");
			goalSettingCtrl.setup();


		});
		$scope.$watch(function() {
			return profileDataBlock.data;
		}, function(v) {
			if (v !== undefined || v != "") {
				var data = profileDataBlock.get();
				if (data !== undefined) {
					var pin = data.cumulativeMetricsProfile.highestRankShort;
					var goal;

					switch(pin)
					{
						case "Mgr" : goal = 1;
						break;
						case "SrM" : goal = 2;
						break;
						case "ExM" : goal = 3;
						break;
						case "Dir" : goal = 4;
						break;
						case "SrD" : goal = 5;
						break;
						case "ExD" : goal = 6;
						break;
						case "PrD" : goal = 7;
						break;
						case "PrS" : goal = 8;
						break;
						case "PrR" : goal = 9;
						break;
						case "DIA" : goal = 10;
						break;
						default : goal = 1;
						break;
					}
					goalSettingCtrl.goal = goal;
					goalSettingCtrl.setup();
				}
			}
		});

		goalSettingCtrl.setup = function() {


			var data = profileDataBlock.get();
			if (data !== undefined) {
				var today = new Date();

				var successTracker = data.achievementsHistory.items;
				goalSettingCtrl.successTracker = successTracker[0];
				goalSettingCtrl.refresh();

				goalSettingCtrl.monthOptions = [];
				var historyGoal = data.achievementsHistory.items;
				console.log(historyGoal);
				for (i in historyGoal) {
					var month = goalSettingCtrl.convertMonth(historyGoal[i].period);
					goalSettingCtrl.monthOptions.push({
						value : i,
						label : month
					});
				}
				console.log("Monthly goal");
				console.log(goalSettingCtrl.monthOptions);
				setTimeout(function(){
					var this_date = today.getDate();
					if (this_date < 6) {
						console.log("Get previos month success");
						goalSettingCtrl.selectedMonth = 1;

									goalSettingCtrl.successTracker = successTracker[goalSettingCtrl.selectedMonth];
							goalSettingCtrl.refresh();
					}
				},1000);

			}
		};

		goalSettingCtrl.convertMonth = function(period) {
			var year_str = period.substring(0, 4);
			var month_str = period.substring(5, 7);
			var month_int = eval(month_str) - 1;
			var today = new Date();
			var this_date = today.getDate();

			return month_array[month_int] + " " + year_str;
		};
		goalSettingCtrl.percentage = function(value) {
			var percentage = goalSettingCtrl.progress.earn[value] / goalSettingCtrl.progress.max[value];
			var p = Math.min(Math.floor(percentage * 100), 100);
			if(value == "pv" ){
				if(p == 100){
					$('#chart_pv').css("color", "#008ae6");
					$('#chart_pv').css({ 'font-size': '20px' });
					$('#chart_pv').css({ 'font-weight': 'bold' });
				}else{
						$('#chart_ov').css({ 'font-size': '15px' });
					$('#chart_pv').css("color", "#000000");
					$('#chart_pv').css({ 'font-weight': 'none' });
				}

			}else if(value == "ov" ){
					if(p == 100 ){
							$('#chart_ov').css({ 'font-size': '20px' });
						$('#chart_ov').css("color", "#008ae6");
						$('#chart_ov').css({ 'font-weight': 'bold' });
					}else{
								$('#chart_ov').css({ 'font-size': '15px' });
						$('#chart_ov').css("color", "#000000");
						$('#chart_ov').css({ 'font-weight': 'none' });
					}

				}else if(value == "leg1" ){
						if(p == 100 ){
								$('#chart_leg1').css({ 'font-size': '20px' });
							$('#chart_leg1').css("color", "#008ae6");
							$('#chart_leg1').css({ 'font-weight': 'bold' });
						}else{
									$('#chart_leg1').css({ 'font-size': '15px' });
							$('#chart_leg1').css("color", "#000000");
							$('#chart_leg1').css({ 'font-weight': 'none' });
						}

					}else if(value == "leg2" ){
							if(p == 100 ){
									$('#chart_leg2').css({ 'font-size': '20px' });
								$('#chart_leg2').css("color", "#008ae6");
								$('#chart_leg2').css({ 'font-weight': 'bold' });
							}else{
									$('#chart_leg2').css({ 'font-size': '15px' });
								$('#chart_leg2').css("color", "#000000");
								$('#chart_leg2').css({ 'font-weight': 'none' });
							}

						}else if(value == "leg3" ){
								if(p == 100 ){
										$('#chart_leg3').css({ 'font-size': '20px' });
									$('#chart_leg3').css("color", "#008ae6");
									$('#chart_leg3').css({ 'font-weight': 'bold' });
								}else{
										$('#chart_leg3').css({ 'font-size': '15px' });
									$('#chart_leg3').css("color", "#000000");
									$('#chart_leg3').css({ 'font-weight': 'none' });
								}

							}

			return Math.min(Math.floor(percentage * 100), 100);
		};

		goalSettingCtrl.changeMonth = function() {
			console.log("Change Month : " + goalSettingCtrl.selectedMonth);
			var data = profileDataBlock.get();
			var successTracker = data.achievementsHistory.items;

			goalSettingCtrl.successTracker = successTracker[goalSettingCtrl.selectedMonth];
			goalSettingCtrl.refresh();
		};




	}]);
	app.controller("HomeSuccessTrackerController", [
	function() {

	}]);
	app.controller("SuccessTrackerController", ['$http', '$element', '$scope', 'ShareComponents', 'ProfileDataBlock', 'MonthSelector',
	function($http, $element, $scope, sharedComponents, profileDataBlock, monthSelect) {
		var successTrackerCtrl = this;
		successTrackerCtrl.period = "";
		successTrackerCtrl.selectedIndex = 2;
		successTrackerCtrl.monthOptions = [];

		successTrackerCtrl.currentData = {

		};
		successTrackerCtrl.data = [];
		var month_array = _getLabels("months");
		$scope.$watch(function() {
			return localStorage.getItem("language");
		}, function(v) {
			month_array = _getLabels("months");
			successTrackerCtrl.loadData();
		});
		$scope.$watch(function() {
			return profileDataBlock.data;
		}, function(v) {
			if (v !== undefined || v != "") {
				successTrackerCtrl.loadData();
			}
		});


		function commaSeparateNumber(val){
					while (/(\d+)(\d{3})/.test(val.toString())){
						val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
					}
					return val;
				}
		$scope.$watch(function() {
			return localStorage.getItem("monthid");
		}, function(v) {


			var		month_id = localStorage.getItem("monthid")-1;
			var data = profileDataBlock.get();
			var volume_data = [];
			var today = new Date();
			var this_date = today.getDate();
			var this_month = today.getMonth();
			var this_year = today.getFullYear();
			var pv,ov,tv;

				pv1 = data.metricsProfileHistory.items[month_id].value.pv;
				ov1 = data.metricsProfileHistory.items[month_id].value.ov;
				tv1 = data.metricsProfileHistory.items[month_id].value.tv;


				if (this_date < 1) {
					this_year = this_month - 1 < 0 ? this_year - 1 : this_year;
					this_month = this_month - 1 < 0 ? 11 : this_month - 1;
					pv = data.metricsProfileHistory.items[1].value.pv;
					ov = data.metricsProfileHistory.items[1].value.ov;
					tv = data.metricsProfileHistory.items[1].value.tv;
				}
				else
				{
					pv = data.metricsProfile.pv;
					ov = data.metricsProfile.ov;
					tv = data.metricsProfile.tv;
			}

			/*successTrackerCtrl.currentData = {
				"pv" : pv,
				"ov" : ov,
				"tv" : tv,
				"pv1" : pv,
				"ov1" : ov,
				"tv1" : tv,
				"month" : month_array[this_month] + " " + this_year,
					"month_1" : month_array[this_month-1] + " " + this_year,
						"month_2" : month_array[this_month-2] + " " + this_year
			};*/



				var pv,ov,icon_img,icon_style,calov,hide;

						pv = data.metricsProfileHistory.items[month_id].value.pv;
						ov = data.metricsProfileHistory.items[month_id].value.ov;
						tv = data.metricsProfileHistory.items[month_id].value.tv;


								console.log("successTrackerCtrl.selectedIndex == "+month_id);
						if(month_id == 1 ){

						var cal  = data.metricsProfileHistory.items[month_id].value.ov;

						var cal1  = data.metricsProfileHistory.items[2].value.ov ;

						var total = cal - cal1;
						var img = "";
						var style = "";
						var minus = "";

					//	calov = "("+commaSeparateNumber(total)+")";

					if(cal1==0 && cal >0){
						cal1 = 1;
					}
					if(cal1 == cal){
							per = 0;
					}else{
						var per = 100/cal1 * cal;
						per = per-100;
						if(total == 0){
								per = 0;
						}
					}


						total = Math.floor(per);

					if (total > 0) {
						img = "./imgs/icon_up.png";
						style = "width:8px;height:16px";
						minus = "+";
					}else if(total == 0){
						img =  "./imgs/stay.gif";
							style = "width:20px;height:20px";
								minus = "";
					}else{
						img = "./imgs/icon_down.png";
							style = "width:8px;height:16px";
								minus = "";
					}
					icon_img = img;
					icon_style = style;

							icon_img = img;
						icon_style = style;
						calov = "("+minus+""+commaSeparateNumber(Math.floor(total))+"%)";

					//	<img ng-src="{{trackerCtrl.currentData.icon_img}}" style="{{trackerCtrl.currentData.icon_style}}" class="{{trackerCtrl.currentData.hide}}"> {{ trackerCtrl.currentData.calov }}
				//	alert("<img nsrc='"+icon_img+"' style='width:8px;height:16px'>"+calov);
					$("#placeenter").html("<img src='"+icon_img+"' style='"+style+"'>"+calov);
					}else{
						/*img =  "./imgs/none.png";
						style = "width:0px;height:0px";
						calov = "";
						hide = "hide";*/
						$("#placeenter").html("");
					}

					var d1 = "";
					var d2= "";
					var d3= "";

					if(this_month == 0){

						d1 = month_array[this_month] + " " + this_year;
							d2 = month_array[this_month+11] + " " + (this_year-1);
								d3 = month_array[this_month+10] + " " + (this_year-1);


					}
					 if(this_month == 1){
						d1 = month_array[this_month] + " " + this_year;
							d2 = month_array[this_month-1] + " " + this_year;
								d3 = month_array[11] + " " + (this_year-1);
					}
					if(this_month >1){
						d1 = month_array[this_month] + " " + this_year;
							d2 = month_array[this_month-1] + " " + this_year;
								d3 = month_array[this_month-2] + " " + this_year;
					}

		successTrackerCtrl.currentData = {
			"pv" : pv,
			"ov" : ov,
			"tv" : tv,
			"pv1" : pv,
			"ov1" : ov,
			"tv1" : tv,
			"month" : d1,
				"month_1" : d2,
					"month_2" : d3,
			"icon_img" : icon_img,
			"icon_style" : icon_style,
			"calov" : calov,
			"hide" : hide
		};


		/*	successTrackerCtrl.currentData = {
				"pv" : pv,
				"ov" : ov,
				"tv" : tv,
				"pv1" : pv1,
				"ov1" : ov1,
				"tv1" : tv1,
				"month" : month_array[this_month] + " " + this_year,
					"month_1" : month_array[this_month-1] + " " + this_year,
						"month_2" : month_array[this_month-2] + " " + this_year
			};*/

			successTrackerCtrl.data = [];
			successTrackerCtrl.data.push(successTrackerCtrl.currentData);

			successTrackerCtrl.setup();


		});




		$('.img_menu').click(function(){
				$('#goal_block').hide();
				  $('#chart').show();
				 	$(this).attr('src', './imgs/icon-success-01.png');
					$('.img_menu_').attr('src', './imgs/icon-success-02-active.png');

					if(first == 0){
						var $pb = $('#pv-progress');

						$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
						$pb.progressbar({display_text: 'none'});
						$pb.progressbar({transition_delay: 50});

						$pb.attr('data-transitiongoal', f_pv).progressbar();


						$pb = $('#tv-progress');

						$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
						$pb.progressbar({display_text: 'none'});
						$pb.progressbar({transition_delay: 50});


						$pb.attr('data-transitiongoal', f_tv).progressbar();




						$pb = $('#leg1-progress');

						$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
						$pb.progressbar({display_text: 'none'});
						$pb.progressbar({transition_delay: 50});


						$pb.attr('data-transitiongoal', f_leg1).progressbar();


						$pb = $('#leg2-progress');

						$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
						$pb.progressbar({display_text: 'none'});
						$pb.progressbar({transition_delay: 50});


						$pb.attr('data-transitiongoal', f_leg2).progressbar();


						$pb = $('#leg3-progress');

						$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
						$pb.progressbar({display_text: 'none'});
						$pb.progressbar({transition_delay: 50});


						$pb.attr('data-transitiongoal', f_leg3).progressbar();




							first = 1;
					}

		//	$('img', '#s_icon1').attr('src', './imgs/icon-success-01.png');
		});

		$('.img_menu_').click(function(){

					$('#goal_block').show();
  				$('#chart').hide();
					$(this).attr('src', './imgs/icon-success-02.png');
					$('.img_menu').attr('src', './imgs/icon-success-01-active.png');

					if(first == 0){
						var $pb = $('#pv-progress');

						$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
						$pb.progressbar({display_text: 'none'});
						$pb.progressbar({transition_delay: 50});

						$pb.attr('data-transitiongoal', f_pv).progressbar();


						$pb = $('#tv-progress');

						$pb.attr('data-transitiongoal', $pb.attr('data-transitiongoal-backup'));
						$pb.progressbar({display_text: 'none'});
						$pb.progressbar({transition_delay: 50});


						$pb.attr('data-transitiongoal', f_tv).progressbar();



						first = 1;
					}

		//	$('img', '#s_icon1').attr('src', './imgs/icon-success-01.png');
		});



		successTrackerCtrl.displayMonth1 = function(month_id) {
			console.log('displayMonth1');


				$('#dmonth_1x').addClass('btn-primary');
				$('#dmonth_2x').addClass('btn-primary');
				$('#dmonth_3x').addClass('btn-primary');


				$('#dmonth_1x').removeClass('btn-info');
				$('#dmonth_2x').removeClass('btn-info');
				$('#dmonth_3x').removeClass('btn-info');

			if(month_id == "1"){
				$('#dmonth_1x').addClass('active');
					$('#dmonth_1x').removeClass('btn-primary');
					$('#dmonth_1x').addClass('btn-info');
			}else 	if(month_id == "2"){
					$('#dmonth_2x').addClass('active');
						$('#dmonth_2x').removeClass('btn-primary');
						$('#dmonth_2x').addClass('btn-info');
				}else 	if(month_id == "3"){
						$('#dmonth_3x').addClass('active');
							$('#dmonth_3x').removeClass('btn-primary');
							$('#dmonth_3x').addClass('btn-info');
					}



			var data = profileDataBlock.get();
			if (data !== undefined) {

				var volume_data = [];
				var today = new Date();
				var this_date = today.getDate();
				var this_month = today.getMonth();
				var this_year = today.getFullYear();
				var pv,ov,tv;

				if (this_date < 2) {
					this_year = this_month - 1 < 0 ? this_year - 1 : this_year;
					this_month = this_month - 1 < 0 ? 11 : this_month - 1;
					pv = data.metricsProfileHistory.items[1].value.pv;
					ov = data.metricsProfileHistory.items[1].value.ov;
																				tv = data.metricsProfileHistory.items[1].value.tv;
				}
				else
				{
					pv = data.metricsProfile.pv;
					ov = data.metricsProfile.ov;
					tv = data.metricsProfile.tv;
				}

				pv = data.metricsProfileHistory.items[month_id-1].value.pv;
				ov = data.metricsProfileHistory.items[month_id-1].value.ov;
				tv = data.metricsProfileHistory.items[month_id-1].value.tv;



									var d1 = "";
									var d2= "";
									var d3= "";

									if(this_month == 0){

										d1 = month_array[this_month] + " " + this_year;
											d2 = month_array[this_month+11] + " " + (this_year-1);
												d3 = month_array[this_month+10] + " " + (this_year-1);


									}
									 if(this_month == 1){
										d1 = month_array[this_month] + " " + this_year;
											d2 = month_array[this_month-1] + " " + this_year;
												d3 = month_array[11] + " " + (this_year-1);
									}
									if(this_month >1){
										d1 = month_array[this_month] + " " + this_year;
											d2 = month_array[this_month-1] + " " + this_year;
												d3 = month_array[this_month-2] + " " + this_year;
									}


									localStorage.setItem("pv", pv);
										localStorage.setItem("ov", ov);
											localStorage.setItem("tv", tv);


				successTrackerCtrl.currentData = {
					"pv" : pv,
					"ov" : ov,
					"tv" : tv,
					"pv1" : pv,
					"ov1" : ov,
					"tv1" : tv,
					"month" : d1,
						"month_1" : d2,
							"month_2" : d3
				};



					var pv,ov,icon_img,icon_style,calov,hide;

						//	pv = data.metricsProfileHistory.items[month_id].value.pv;
						//	ov = data.metricsProfileHistory.items[month_id].value.ov;
						//	tv = data.metricsProfileHistory.items[month_id].value.tv;


							if(month_id == 2 ){

							var cal  = data.metricsProfileHistory.items[1].value.ov;

							var cal1  = data.metricsProfileHistory.items[2].value.ov ;

							var total = cal - cal1;
							var img = "";
							var style = "";
							var minus = "";

						//	calov = "("+commaSeparateNumber(total)+")";

						if(cal1==0 && cal >0){
							cal1 = 1;
						}
						if(cal1 == cal){
								per = 0;
						}else{
							var per = 100/cal1 * cal;
							per = per-100;
							if(total == 0){
									per = 0;
							}
						}


							total = Math.floor(per);

						if (total > 0) {
							img = "./imgs/icon_up.png";
							style = "width:8px;height:16px";
							minus = "+";
						}else if(total == 0){
							img =  "./imgs/stay.gif";
								style = "width:20px;height:20px";
									minus = "";
						}else{
							img = "./imgs/icon_down.png";
								style = "width:8px;height:16px";
									minus = "";
						}
						icon_img = img;
						icon_style = style;

								icon_img = img;
							icon_style = style;
							calov = "("+minus+""+commaSeparateNumber(Math.floor(total))+"%)";

						//	<img ng-src="{{trackerCtrl.currentData.icon_img}}" style="{{trackerCtrl.currentData.icon_style}}" class="{{trackerCtrl.currentData.hide}}"> {{ trackerCtrl.currentData.calov }}
					//	alert("<img nsrc='"+icon_img+"' style='width:8px;height:16px'>"+calov);
					//	$("#placeenter").html("<img src='"+icon_img+"' style='"+style+"'>"+calov);
						}else{
							img =  "./imgs/none.png";
							style = "width:0px;height:0px";
							calov = "";
							hide = "hide";
						//	$("#placeenter").html("");
						}


											var d1 = "";
											var d2= "";
											var d3= "";

											if(this_month == 0){

												d1 = month_array[this_month] + " " + this_year;
													d2 = month_array[this_month+11] + " " + (this_year-1);
														d3 = month_array[this_month+10] + " " + (this_year-1);


											}
											 if(this_month == 1){
												d1 = month_array[this_month] + " " + this_year;
													d2 = month_array[this_month-1] + " " + this_year;
														d3 = month_array[11] + " " + (this_year-1);
											}
											if(this_month >1){
												d1 = month_array[this_month] + " " + this_year;
													d2 = month_array[this_month-1] + " " + this_year;
														d3 = month_array[this_month-2] + " " + this_year;
											}
			successTrackerCtrl.currentData = {
				"pv" : pv,
				"ov" : ov,
				"tv" : tv,
				"pv1" : pv,
				"ov1" : ov,
				"tv1" : tv,
				"month" : d1,
					"month_1" : d2,
						"month_2" : d3,
				"icon_img" : icon_img,
				"icon_style" : icon_style,
				"calov" : calov,
				"hide" : hide
			};

			console.log(successTrackerCtrl.monthOptions);




				successTrackerCtrl.data = [];
				successTrackerCtrl.data.push(successTrackerCtrl.currentData);

			}

	}


		successTrackerCtrl.loadData = function() {

				$('#chart').hide();
				$('#goal_block').show();
			var data = profileDataBlock.get();
			if (data !== undefined) {

				var volume_data = [];
				var today = new Date();
				var this_date = today.getDate();
				var this_month = today.getMonth();
				var this_year = today.getFullYear();
				var pv,ov,tv;

				if (this_date < 2) {
					this_year = this_month - 1 < 0 ? this_year - 1 : this_year;
					this_month = this_month - 1 < 0 ? 11 : this_month - 1;
					pv = data.metricsProfileHistory.items[1].value.pv;
					ov = data.metricsProfileHistory.items[1].value.ov;
                                        tv = data.metricsProfileHistory.items[1].value.tv;
				}
				else
				{
					pv = data.metricsProfile.pv;
					ov = data.metricsProfile.ov;
          tv = data.metricsProfile.tv;
				}
				var d1 = "";
				var d2= "";
				var d3= "";

				if(this_month == 0){

					d1 = month_array[this_month] + " " + this_year;
						d2 = month_array[this_month+11] + " " + (this_year-1);
							d3 = month_array[this_month+10] + " " + (this_year-1);


				}
				 if(this_month == 1){
					d1 = month_array[this_month] + " " + this_year;
						d2 = month_array[this_month-1] + " " + this_year;
							d3 = month_array[11] + " " + (this_year-1);
				}
				if(this_month >1){
					d1 = month_array[this_month] + " " + this_year;
						d2 = month_array[this_month-1] + " " + this_year;
							d3 = month_array[this_month-2] + " " + this_year;
				}






				console.log(d2);
					console.log(d3);
				successTrackerCtrl.currentData = {
					"pv" : pv,
					"ov" : ov,
          "tv" : tv,
					"pv1" : pv,
					"ov1" : ov,
					"tv1" : tv,
					"month" : d1,
						"month_1" : d2,
							"month_2" : d3
				};



					var pv,ov,icon_img,icon_style,calov,hide;

							pv = data.metricsProfileHistory.items[successTrackerCtrl.selectedIndex].value.pv;
							ov = data.metricsProfileHistory.items[successTrackerCtrl.selectedIndex].value.ov;
							tv = data.metricsProfileHistory.items[successTrackerCtrl.selectedIndex].value.tv;


							if(successTrackerCtrl.selectedIndex == 1 ){

							var cal  = data.metricsProfileHistory.items[successTrackerCtrl.selectedIndex].value.ov;

							var cal1  = data.metricsProfileHistory.items[2].value.ov ;

							var total = cal - cal1;
							var img = "";
							var style = "";
							var minus = "";

						//	calov = "("+commaSeparateNumber(total)+")";

						if(cal1==0 && cal >0){
							cal1 = 1;
						}
						if(cal1 == cal){
								per = 0;
						}else{
							var per = 100/cal1 * cal;
							per = per-100;
							if(total == 0){
									per = 0;
							}
						}


							total = Math.floor(per);

						if (total > 0) {
							img = "./imgs/icon_up.png";
							style = "width:8px;height:16px";
							minus = "+";
						}else if(total == 0){
							img =  "./imgs/stay.gif";
								style = "width:20px;height:20px";
									minus = "";
						}else{
							img = "./imgs/icon_down.png";
								style = "width:8px;height:16px";
									minus = "";
						}
						icon_img = img;
						icon_style = style;

								icon_img = img;
							icon_style = style;
							calov = "("+minus+""+commaSeparateNumber(Math.floor(total))+"%)";

						//	<img ng-src="{{trackerCtrl.currentData.icon_img}}" style="{{trackerCtrl.currentData.icon_style}}" class="{{trackerCtrl.currentData.hide}}"> {{ trackerCtrl.currentData.calov }}
					//	alert("<img nsrc='"+icon_img+"' style='width:8px;height:16px'>"+calov);
						$("#placeenter").html("<img src='"+icon_img+"' style='"+style+"'>"+calov);
						}else{
							img =  "./imgs/none.png";
							style = "width:0px;height:0px";
							calov = "";
							hide = "hide";
							$("#placeenter").html("");
						}


										pv = data.metricsProfileHistory.items[0].value.pv;
										ov = data.metricsProfileHistory.items[0].value.ov;
										tv = data.metricsProfileHistory.items[0].value.tv;


										localStorage.setItem("pv", pv);
											localStorage.setItem("ov", ov);
												localStorage.setItem("tv", tv);


			successTrackerCtrl.currentData = {
				"pv" : pv,
				"ov" : ov,
				"tv" : tv,
				"pv1" : pv,
				"ov1" : ov,
				"tv1" : tv,
				"month" : d1,
					"month_1" : d2,
						"month_2" : d3,
				"icon_img" : icon_img,
				"icon_style" : icon_style,
				"calov" : calov,
				"hide" : hide
			};

			console.log(successTrackerCtrl.monthOptions);




				successTrackerCtrl.data = [];
				successTrackerCtrl.data.push(successTrackerCtrl.currentData);

				successTrackerCtrl.setup();
			}
		};
		//successTrackerCtrl.loadData();
		successTrackerCtrl.convertMonth = function(period) {
			//var month_array = _getLabels("months");

			var year_str = period.substring(0, 4);
			var month_str = period.substring(5, 7);
			var month_int = eval(month_str) - 1;

			return month_array[month_int] + " " + year_str;
		};
		successTrackerCtrl.prevMonth = function() {
			console.log("Prev Month");
			successTrackerCtrl.selectedIndex--;
			if (successTrackerCtrl.selectedIndex < 0) {
				successTrackerCtrl.selectedIndex = 0;
			}
			console.log(successTrackerCtrl.selectedIndex);
			//monthSelect.selected = successTrackerCtrl.selectedIndex;
			successTrackerCtrl.animateSlide();
		};
		successTrackerCtrl.nextMonth = function() {
			console.log("Next Month");
			successTrackerCtrl.selectedIndex++;
			if (successTrackerCtrl.selectedIndex > 2) {
				successTrackerCtrl.selectedIndex = 2;
			}
			console.log(successTrackerCtrl.selectedIndex);
			//monthSelect.selected = successTrackerCtrl.selectedIndex;
			successTrackerCtrl.animateSlide();
		};
		successTrackerCtrl.animateSlide = function() {
			var width = sharedComponents.width - 20;
			$element.find(".volume-orbit-container .slider").css({
				"margin-left" : -width * successTrackerCtrl.selectedIndex + "px",
			});
			$element.find(".month-selector-inner").text(successTrackerCtrl.data[successTrackerCtrl.selectedIndex].month);
		};
		successTrackerCtrl.setup = function() {
			var width = sharedComponents.width - 20;
			var height;
			$(".volume-orbit-container").css({
				"width" : width + "px"
			});
			$(".volume-orbit-container .slider").css({
				"margin-left" : width * -2 + "px",
				"width" : width * 3 + "px"
			});
			setTimeout(function() {
				$(".volume-orbit-container .slider .row").css({
					"width" : width + "px",
					"float" : "left"
				});

				$(".volume img").css({
					"width" : (width / 2) - 60 + "px",
				});
			}, 500);
			$element.find(".volume-orbit-container .slider").css({
				"margin-left" : -width * successTrackerCtrl.selectedIndex + "px",
			});
		};
		setTimeout(function() {
			//var width = sharedComponents.width;
			successTrackerCtrl.setup();

		});
	}]);

})();
