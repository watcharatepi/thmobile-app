/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
	window._getLabels = function(section) {
		var languageSection;
		switch(section) {
		case "header" :
			languageSection = headerTitleLabels;
			break;
		case "sidenav" :
			languageSection = sideNavLabels;
			break;
		case "footer" :
			languageSection = footerLabels;
			break;
		case "content" :
			languageSection = contentLabels;
			break;
		case "pin" :
			languageSection = pinLabels;
			break;
		case "months" :
			languageSection = monthLabels;
			break;
		}
		if (localStorage.getItem("language") != null) {
			language = localStorage.getItem("language");
		} else {
			language = "en";
		}
		return languageSection[language];
	};
	window._echo = function(section, language, label) {
		var languageSection;
		switch(section) {
		case "header" :
			languageSection = headerTitleLabels;
			break;
		case "sidenav" :
			languageSection = sideNavLabels;
			break;
		case "footer" :
			languageSection = footerLabels;
			break;
		case "content" :
			languageSection = contentLabels;
			break;
		case "pin" :
			languageSection = pinLabels;
			break;
		case "pinshort" :
			languageSection = pinLabelsShort;
			break;
		case "month": languageSection = monthLabels;
			break;
		}
		//language = localStorage.getItem("language");
		if (localStorage.getItem("language") != null) {
			language = localStorage.getItem("language");
		} else {
			language = "en";
		}
		return languageSection[language][label];
	};
	var monthLabels = {
		"en" : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		"th" : ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
                "jp" : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                "mm" : ["ဇန္န၀ါရီ", "ေဖေဖာ္၀ါရီ", "မတ္", "ဧပရယ္", "ေမ", "ဇြန္", "ဇူလိုင္", "ၾသဂုတ္", "စက္တင္ဘာ", "ေအာက္တိုဘာ", "ႏို၀င္ဘာ", "ဒီဇင္ဘာ"],
                "hk" : ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                "km" : ["មករា", "កុម្ភះ", "មិនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា​", "វិច្ឆិកា", "ធ្នូ"],
	};
	var pinLabelsShort = {
		en : {
			"distributor" : "Distributor",
			"phase_1" : "Phase 1",
			"manager" : "Manager",
			"senior_manager" : "Sr.Manager",
			"executive_manager" : "Ex.Manager",
			"director" : "Director",
			"senior_director" : "Sr.Director",
			"executive_director" : "Ex.Director",
			"presidential_director" : "Pd.Director",
			"presidential_sapphire" : "Pd.Sapphire",
			"presidential_ruby" : "Pd.Ruby",
			"presidential_diamond" : "Pd.Diamond"
		},
		th : {
			"distributor" : "นักธุรกิจอิสระ",
			"phase_1" : "เฟส 1",
			"manager" : "เมเนเจอร์",
			"senior_manager" : "Sr.เมเนเจอร์",
			"executive_manager" : "Ex.เมเนเจอร์",
			"director" : "ไดเร็คเตอร์",
			"senior_director" : "Sr.ไดเร็คเตอร์",
			"executive_director" : "Ex.ไดเร็คเตอร์",
			"presidential_director" : "Pd.ไดเร็คเตอร์",
			"presidential_sapphire" : "Pd.แซฟไฟร์",
			"presidential_ruby" : "Pd.รูบี้",
			"presidential_diamond" : "Pd.ไดมอนด์"
		},
                jp : {
			"distributor" : "ディストリビューター",
			"phase_1" : "フェーズ1",
			"manager" : "マネージャー",
			"senior_manager" : "シニア マネージャー",
			"executive_manager" : "エグゼクティブ　マネージャー",
			"director" : "ディレクター",
			"senior_director" : "シニア ディレクター",
			"executive_director" : "エグゼクティブ　ディレクター",
			"presidential_director" : "プレジデンシャル ディレクター",
			"presidential_sapphire" : "プレジデンシャル サファイア",
			"presidential_ruby" : "プレジデンシャル ルビー",
			"presidential_diamond" : "プレジデンシャル ダイアモンド"
		},
                mm : {
			"distributor" : "ျဖန္႕ခ်ီသူ",
			"phase_1" : "အဆင့္(၁)",
			"manager" : "မန္ေနဂ်ာ",
			"senior_manager" : "စီနီယာမန္ေနဂ်ာ",
			"executive_manager" : "အစ္(စ္)စဲဂတစ္မန္ေနဂ်ာ",
			"director" : "ဒါရိုက္တာ",
			"senior_director" : "Sr.Director",
			"executive_director" : "အစ္(စ္)စဲဂတစ္ဒါရိုက္တာ",
			"presidential_director" : "ပရဲစီတန္ရွယ္ဒါရိုက္တာ",
			"presidential_sapphire" : "ပရဲစီတန္ရွယ္စဖိုင္း(လ္)ရား",
			"presidential_ruby" : "ပရဲစီတ္ရွယ္ရူဘီ",
			"presidential_diamond" : "ပရဲစီတ္ရွယ္ဒိုင္းမြန္း"
		},
                hk : {
			"distributor" : "聯營商",
			"phase_1" : "第一階段",
			"manager" : "經理",
			"senior_manager" : "資深經理",
			"executive_manager" : "行政經理",
			"director" : "董事",
			"senior_director" : "資深董事",
			"executive_director" : "行政董事",
			"presidential_director" : "皇家總裁",
			"presidential_sapphire" : "皇家藍寶總裁",
			"presidential_ruby" : "皇家紅寶總裁",
			"presidential_diamond" : "皇家鑽石總裁"
		},
                km : {
			"distributor" : "អ្នកចែកចាយ",
			"phase_1" : "Phase 1",
			"manager" : "Manager",
			"senior_manager" : "Sr.Manager",
			"executive_manager" : "Ex.Manager",
			"director" : "Director",
			"senior_director" : "Sr.Director",
			"executive_director" : "Ex.Director",
			"presidential_director" : "Pd.Director",
			"presidential_sapphire" : "Pd.Sapphire",
			"presidential_ruby" : "Pd.Ruby",
			"presidential_diamond" : "Pd.Diamond"
		}
	};
	var pinLabels = {
		en : {
			"distributor" : "Distributor",
			"phase_1" : "Phase 1",
			"manager" : "Manager",
			"senior_manager" : "Senior Manager",
			"executive_manager" : "Executive Manager",
			"director" : "Director",
			"senior_director" : "Senior Director",
			"executive_director" : "Executive Director",
			"presidential_director" : "Presidential Director",
			"presidential_sapphire" : "Presidential Sapphire",
			"presidential_ruby" : "Presidential Ruby",
			"presidential_diamond" : "Presidential Diamond"
		},
		th : {
			"distributor" : "นักธุรกิจอิสระ",
			"phase_1" : "เฟส 1",
			"manager" : "เมเนเจอร์",
			"senior_manager" : "ซีเนียร์ เมเนเจอร์",
			"executive_manager" : "เอคเซคคิวทิฟ เมเนเจอร์",
			"director" : "ไดเร็คเตอร์",
			"senior_director" : "ซีเนียร์ ไดเร็คเตอร์",
			"executive_director" : "เอคเซคคิวทิฟ ไดเร็คเตอร์",
			"presidential_director" : "เพสซิเด็นเชียล ไดเร็คเตอร์",
			"presidential_sapphire" : "เพสซิเด็นเชียล แซฟไฟร์",
			"presidential_ruby" : "เพสซิเด็นเชียล รูบี้",
			"presidential_diamond" : "เพสซิเด็นเชียล ไดมอนด์"
		},
                jp : {
			"distributor" : "ディストリビューター",
			"phase_1" : "フェーズ1",
			"manager" : "マネージャー",
			"senior_manager" : "シニア マネージャー",
			"executive_manager" : "エグゼクティブ　マネージャー",
			"director" : "ディレクター",
			"senior_director" : "シニア ディレクター",
			"executive_director" : "エグゼクティブ　ディレクター",
			"presidential_director" : "プレジデンシャル ディレクター",
			"presidential_sapphire" : "プレジデンシャル サファイア",
			"presidential_ruby" : "プレジデンシャル ルビー",
			"presidential_diamond" : "プレジデンシャル ダイアモンド"
                },
                mm : {
			"distributor" : "ျဖန္႕ခ်ီသူ",
			"phase_1" : "အဆင့္(၁)",
			"manager" : "မန္ေနဂ်ာ",
			"senior_manager" : "စီနီယာမန္ေနဂ်ာ",
			"executive_manager" : "အစ္(စ္)စဲဂတစ္မန္ေနဂ်ာ",
			"director" : "ဒါရိုက္တာ",
			"senior_director" : "Sr.Director",
			"executive_director" : "အစ္(စ္)စဲဂတစ္ဒါရိုက္တာ",
			"presidential_director" : "ပရဲစီတန္ရွယ္ဒါရိုက္တာ",
			"presidential_sapphire" : "ပရဲစီတန္ရွယ္စဖိုင္း(လ္)ရား",
			"presidential_ruby" : "ပရဲစီတ္ရွယ္ရူဘီ",
			"presidential_diamond" : "ပရဲစီတ္ရွယ္ဒိုင္းမြန္း"
		},
                hk : {
			"distributor" : "聯營商",
			"phase_1" : "第一階段",
			"manager" : "經理",
			"senior_manager" : "資深經理",
			"executive_manager" : "行政經理",
			"director" : "董事",
			"senior_director" : "資深董事",
			"executive_director" : "行政董事",
			"presidential_director" : "皇家總裁",
			"presidential_sapphire" : "皇家藍寶總裁",
			"presidential_ruby" : "皇家紅寶總裁",
			"presidential_diamond" : "皇家鑽石總裁"
		},
                km : {
			"distributor" : "អ្នកចែកចាយ",
			"phase_1" : "Phase 1",
			"manager" : "Manager",
			"senior_manager" : "Sr.Manager",
			"executive_manager" : "Ex.Manager",
			"director" : "Director",
			"senior_director" : "Sr.Director",
			"executive_director" : "Ex.Director",
			"presidential_director" : "Pd.Director",
			"presidential_sapphire" : "Pd.Sapphire",
			"presidential_ruby" : "Pd.Ruby",
			"presidential_diamond" : "Pd.Diamond"
		}

	};
	var contentLabels = {
		en : {
			"pv" : "PV",
			"ov" : "OV",
			"tv" : "TV",
			"network" : "Network",
			"enroll" : "Enroll",
			"sharing" : "Sharing",
			"news" : "News",
			"hot_news" : "Unicity Hot News",
			"instagram" : "Instagram",
			"shopping" : "Shopping",
			"upline" : "Upline",
			"me" : "Me",
			"edit_profile_picture" : "Edit Profile Picture",
			"edit_profile_picture_uploading": "Your picture is uploading and will be shown soon",
			"general_edit" : "General Edit",
			"name" : "Name",
			"phone" : "Phone",
			"email" : "Email",
			"address" : "Address",
			"required" : "Required",
			"cancel" : "Cancel",
			"add_to_cart" : "Add To Cart",
			"added" : "Added",
			"ship_to" : "Ship To",
			"ship_method" : "Shipping Method",
			"pickup" : "Pick up",
			"delivery" : "Delivery",
			"enroll_pickup" : "Pick up",
			"enroll_delivery" : "Delivery",
			"total" : "Total",
			"checkout" : "Checkout",
			"calculating" : "Calculating...",
			"ordering" : "Ordering...",
			"leg1" : "Leg1",
			"leg2" : "Leg2",
			"leg3" : "Leg3",
			"all" : "All",
			"categories" : "Categories",
			"easyship" : "Easy Ship",
			"share" : "Share",
			"facebook" : "Facebook",
			"sms" : "SMS",

			"more_info" : "Please contact 	Unicity if you experience any problems with this application or if you have any questions",
			"enroller" : "Enroller ID",
			"sponsor" : "Sponsor ID",
			"verify_enroller" : "Verify Enroller",
			"verify_id" : "Verify ID",
			"verifying" : "Verifying...",
			"verified" : "Verified",
			"information" : "Information",
			"birth_day" : "Birth Day",
			"years20" : "Applicant must be 20 years or older. (MM/DD/YYYY)",
			"province" : "Choose Province",
			"contact_info" : "Contact Information",
			"continue" : "Continue",
			"id_card" : "ID Card Number",
			"passport" : "Passport",
			"first_name_th" : "First Name(Thai)",
			"last_name_th" : "Last Name(Thai)",
			"first_name_en" : "First Name(English)",
			"last_name_en" : "Last Name(English)",
			"road" : "Road",
			"sub_area" : "Sub-Area",
			"area" : "Area",
			"sub_area_bkk" : "Sub-Area",
			"area_bkk" : "Area",
			"country" : "Country",
			"zip" : "Zip",

			"last_downline":"This is the last downline",

			"select_language" : "Select Language",
			"language_en" : "English",
			"language_th" : "Thai",
			"gender" : "Gender",
																	"male" : "Male",
																	"female" : "Female" ,
																	"report_genealogy" : "Genealogy",
					"report_commission" : "Commission",
					"report_order" : "Order",
						"order_date" : "Order Date",
							"ship_date" : "Ship Date",
								"order_number" : "Order Number",
									"bill_to" : "Bill to",
									"itemcode" : "Item Code",
									"qty_ship" : "Qty Ship",
										"qty_order" : "Qty Order",
										"itemname" : "Item Description",
										"itemvalue" : "Item Volume",
											"totalvalue" : "Total Volume",
											"itemprice" : "Item Price",
											"totalprice" : "Total Price",
											"tax" : "Tax",
											"amount" : "Amount",
											"totalamount" : "Total Amount Due",
											"paymentmethod" : "Payments Received",
											"paymenttype" :"Payment Type",
											"receipt" : "Receipt Amount",
											"totalcash" : "Total Cash Receipts",
										"invoicebalance" : "Invoice Balance",
											"qty" : "Qty",
												"back" : "Back",
														"print" : "Print",
														"passwordheader" : "Change Password",
															"oldpassword" : "Old Password",
																"newpassword" : "New Password",
																	"changepassword" : "Change Password",
																	"lbpassword_invalidpwd": "Invalid Old Password",
																	"lbpassword_inputpwd": "Please Input New Password",
																	"lbpassword_success": "The password was successfully changed" ,
																	"report_genealogy" : "Genealogy",
					"report_commission" : "Commission",
					"report_order" : "Order",
					"period_month" : "Period Month",
						"profile" : "Profile",

		},
		th : {
				"profile" : "ข้อมูลส่วนตัว",
				"period_month" : "Period เดือน",
			"report_genealogy" : "สายงาน",
			"report_commission" : "ค่าคอมมิชชั่น",
			"report_order" : "การสั่งซื้อ",
			"gender" : "เพศ",
		"male" : "ชาย",
		"female" : "หญิง",

		"lbpassword_invalidpwd": "รหัสผ่านเดิมไม่ถูกต้อง",
		"lbpassword_inputpwd": "กรุณากรอกรหัสผ่านใหม่",
		"lbpassword_success": "ทำการเปลี่ยนแปลงรหัสผ่านเรียบร้อย",
"passwordheader" : "เปลี่ยนรหัสผ่าน",
		"oldpassword" : "รหัสผ่านเดิม",
			"newpassword" : "รหัสผ่านใหม่",
				"changepassword" : "ยืนยันรหัสผ่าน",
		"order_date" : "วันที่สั่งซื้อสินค้า",
			"ship_date" : "วันที่ส่งสินค้า",

			"order_number" : "เลขที่ใบเสร็จ",
				"bill_to" : "นามผู้ซื้อ",
				"itemcode" : "รหัสสินค้า",
				"qty_ship" : "จำนวนที่ส่ง",
					"qty_order" : "จำนวนที่สั่ง",
					"itemname" : "รายการ",
					"itemvalue" : "พีวี/หน่วย",
						"totalvalue" : "ยอดรวมพีวี",
						"itemprice" : "ราคาสินค้า",
						"totalprice" : "ราคารวม",
						"tax" : "ภาษี",
						"amount" : "จำนวนเงิน",
						"totalamount" : "จำนวนเงินที่ชำระทั้งหมด",
						"paymentmethod" : "ได้รับการชำระเงินเรียบร้อยแล้ว",
						"paymenttype" :"วิธีการชำระเงิน",
						"receipt" : "จำนวนเงิน",
						"totalcash" : "Total Cash Receipts",
					"invoicebalance" : "	Invoice Balance",
"qty" : "หน่วย",
"back" : "กลับ",
"print" : "พิมพ์",
			"pv" : "พีวี",
			"ov" : "โอวี",
			"tv" : "ทีวี",
			"network" : "เครือข่าย",
			"enroll" : "สมัคร",
			"sharing" : "ส่งต่อ",
			"news" : "ข่าว",
			"hot_news" : "ข่าวร้อน",
			"instagram" : "อินสตาแกรม",
			"shopping" : "สั่งซื้อ",
			"upline" : "อัพไลน์",
			"me" : "ฉัน",
			"edit_profile_picture" : "แก้ไขรูป",
			"edit_profile_picture_uploading": "รูปคนกำลังอัพโหลดขึ้น และจะแสดงให้เห็นภายหลัง",
			"general_edit" : "ข้อมูลส่วนตัว",
			"name" : "ชื่อ",
			"phone" : "เบอร์โทร",
			"email" : "อีเมล์",
			"address" : "ที่อยู่",
			"required" : "Required",
			"cancel" : "ยกเลิก",
			"add_to_cart" : "ใส่ตะกร้า",
			"added" : "ใส่ตะกร้าแล้ว",
			"ship_to" : "จัดส่ง",
			"ship_method" : "วิธีรับสินค้า",
			"pickup" : "รับเอง",
			"delivery" : "จัดส่ง (+350 บาท)",
			"enroll_pickup" : "รับเอง : 500 บาท",
			"enroll_delivery" : "จัดส่ง : 850 บาท",
			"total" : "ทั้งหมด",
			"checkout" : "สั่งซื้อ",
			"calculating" : "กำลังคำนวณ...",
			"ordering" : "กำลังสั่งซื้อ...",
			"leg1" : "ขาที่ 1",
			"leg2" : "ขาที่ 2",
			"leg3" : "ขาที่ 3",
			"all" : "ทั้งหมด",
			"categories" : "หมวดหมู่",
			"easyship" : "Easy Ship",
			"share" : "ส่งต่อ",
			"facebook" : "เฟชบุค",
			"sms" : "ส่งข้อความ",
			"more_info" : "หากท่านมีข้อสงสัยใด ๆ เกี่ยวกับขั้นตอนการสมัคร กรุณาติดต่อเจ้าหน้าที่ ได้ที่ 02-7846777",
			"enroller" : "สมาชิกผู้แนะนำ",
			"sponsor" : "สมาชิกผู้สปอนเซอร์",
			"verify_enroller" : "เช็คชื่อผู้แนะนำ",
			"verify_id" : "ตรวจสอบหมายเลขบัตร",
			"verifying" : "กำลังตรวจสอบ...",
			"verified" : "ตรวจสอบผ่าน",
			"information" : "ข้อมูลสมาชิก",
			"birth_day" : "วันเดือนปีเกิด",
			"years20" : "ผู้สมัครต้องมีอายุ 20 ปีขึ้นไป (ดด/วว/ปปปป)",
			"province" : "เลือกจังหวัด",
			"contact_info" : "ข้อมูลการติดต่อ",
			"continue" : "ต่อไป",
			"id_card" : "เลขประจำตัวประชาชน",
			"passport" : "พาสปอร์ต",
			"first_name_th" : "ชื่อ(ไทย)",
			"last_name_th" : "นามสกุล(ไทย)",
			"first_name_en" : "ชื่อ(อังกฤษ)",
			"last_name_en" : "นามสกุล(อังกฤษ)",
			"road" : "ถนน",
			"sub_area_bkk" : "แขวง",
			"area_bkk" : "เขต",
			"sub_area" : "ตำบล",
			"area" : "อำเภอ",
			"country" : "ประเทศ",
			"zip" : "รหัสไปรษณีย์",

			"last_downline":"นี่คือดาวน์ไลน์สุดท้ายของสาย",

			"select_language" : "เลือกภาษา",
			"language_en" : "ภาษาอังกฤษ",
			"language_th" : "ภาษาไทย" ,

		},
                jp : {
			"pv" : "PV",
			"ov" : "OV",
			"tv" : "TV",
			"network" : "ネットワーク",
			"enroll" : "サインアップ",
			"sharing" : "プロモーションビデオ",
			"news" : "ニュース",
			"hot_news" : "最新情報／トピックス",
			"instagram" : "Instagram",
			"shopping" : "オンラインショッピング",
			"upline" : "アップライン",
			"me" : "私",
			"edit_profile_picture" : "プロフィール写真を編集",
			"edit_profile_picture_uploading": "アップロード後すぐに更新されます",
			"general_edit" : "基本情報",
			"name" : "名前",
			"phone" : "電話番号",
			"email" : "Eメールアドレス",
			"address" : "住所",
			"required" : "達成条件",
			"cancel" : "キャンセル",
			"add_to_cart" : "カートに入れる",
			"added" : "追加する",
			"ship_to" : "配送先",
			"ship_method" : "配送方法",
			"pickup" : "サロン受け取り",
			"delivery" : "配送 350 THB",
			"enroll_pickup" : "サロン受け取り 500 THB",
			"enroll_delivery" : "配送 850 THB",
			"total" : "合計",
			"checkout" : "レジへ進む",
			"calculating" : "再計算...",
			"ordering" : "注文...",
			"leg1" : "Leg1",
			"leg2" : "Leg2",
			"leg3" : "Leg3",
			"all" : "すべて",
			"categories" : "カテゴリー",
			"easyship" : "Easy Ship",
			"share" : "シェア",
			"facebook" : "Facebook",
			"sms" : "SMS",

			"more_info" : "アプリに関するご質問、お問い合わせはユニシティ・ジャパン㈱メンバーサービスまでご連絡ください",
			"enroller" : "スポンサーID",
			"sponsor" : "スポンサーID",
			"verify_enroller" : "スポンサーの確認",
			"verify_id" : "スポンサーID",
			"verifying" : "確認中...",
			"verified" : "確認完了",
			"information" : "情報",
			"birth_day" : "誕生日",
			"years20" : "20歳以上の方のみ登録できます。",
			"province" : "市町村を選んでください",
			"contact_info" : "連絡先",
			"continue" : "次のページ",
			"id_card" : "ID Card Number",
			"passport" : "Passport",
			"first_name_th" : "名前（かな）",
			"last_name_th" : "苗字（かな）",
			"first_name_en" : "名前（ローマ字）",
			"last_name_en" : "苗字（ローマ字）",
			"road" : "その他住所",
			"sub_area" : "市町村",
			"area" : "都道府県",
			"sub_area_bkk" : "市町村",
			"area_bkk" : "都道府県",
			"country" : "国",
			"zip" : "郵便番号",

			"last_downline":"This is the last downline",

			"select_language" : "Select Language",
			"language_en" : "英語",
			"language_th" : "日本語"
		},
                mm : {
			"pv" : "တစ္ဦးခ်င္းေရာင္းခ်ႏိုင္သည့္အေရအတြက္",
			"ov" : "အဖြဲ႕အစည္းပမာဏ",
			"tv" : "အဖြဲ႕ပမာဏ",
			"network" : "ကြန္ရက္",
			"enroll" : "စာရင္းသြင္းျခင္း",
			"sharing" : "မွ်ေ၀ျခင္း",
			"news" : "သတင္း",
			"hot_news" : "ယူနီစီးတီး၏  လက္တေလာသတင္းမ်ား",
			"instagram" : "Instagram",
			"shopping" : "ေစ်း၀ယ္ျခင္း",
			"upline" : "အပ္(ပ္)လိုင္း",
			"me" : "ကၽြန္ေတာ္ / ကၽြန္မ",
			"edit_profile_picture" : "ပရိုဖိုင္း ပုံကိုျပင္ဆင္ရန္",
			"edit_profile_picture_uploading": "သင့္ဓာတ္ပံုကိုတင္ျပရန္လုပ္ေဆာင္ေနပါသည္။မၾကာမီေပၚလာပါမည္။",
			"general_edit" : "အေထြေထြျပင္ဆင္ရန္",
			"name" : "အမည္",
			"phone" : "ဆက္သြယ္ရန္ဖုန္းနံပါတ္",
			"email" : "ဆက္သြယ္ရန္အီးေမးလိပ္စာ",
			"address" : "ဆက္သြယ္ရန္ေနရပ္လိပ္စာ",
			"required" : "လိုအပ္ခ်က္",
			"cancel" : "ပယ္ဖ်က္",
			"add_to_cart" : "ေစ်း၀ယ္ျခင္းထဲသို႕ထည့္သည္",
			"added" : "ထပ္ေပါင္းျခင္း (သို႕) ထပ္ျဖည့္ျခင္း",
			"ship_to" : "တင္ပို႕သည္",
			"ship_method" : "တင္ပို႕ ျခင္း နည္းလမ္း",
			"pickup" : "ဒီဇင္ဘာ",
			"delivery" : "ပို႕ေဆာင္သည္ 350 THB",
			"enroll_pickup" : "ဒီဇင္ဘာ 500 THB",
			"enroll_delivery" : "ပို႕ေဆာင္သည္ 850 THB",
			"total" : "စုစုေပါင္း",
			"checkout" : "ထြက္ခြာသည္",
			"calculating" : "တြက္ခ်က္သည္...",
			"ordering" : "မွာယူသည္...",
			"leg1" : "မ်ိဳးဆက္(၁)",
			"leg2" : "မ်ိဳးဆက(၂)",
			"leg3" : "မ်ိဳးဆက္(၃)",
			"all" : "အားလံုး",
			"categories" : "အမ်ိဳးအစားမ်ား",
			"easyship" : "အီးဇီး ရွစ္(ပ္)",
			"share" : "ေ၀စု",
			"facebook" : "ေဖ့စ္ဘြတ္",
			"sms" : "SMS",

			"more_info" : "သင္သည္ ၏  ေလွ်ာက္လႊာႏွင့္ပတ္သတ္   ျပသနာတစ္စံုတစ္ရာရွိ   ေသာ္လည္းေကာင္း ေမးျမန္းစံုစမ္းလို   ေသာ္လည္းေကာင္း ေက်းဇူးျပဳ   ယူနီစီးတီးအားဆက္သြယ္ပါရန္",
			"enroller" : "စာရင္းသြင္းသူဧ၊၊္အိုင္ဒီ",
			"sponsor" : "မိတ္ဆက္သူဧ၊၊္အိုင္ဒီ",
			"verify_enroller" : "စာရင္းသြင္းသူကိုအတည္ျပဳရန္",
			"verify_id" : "အိုင္ဒီ ကိုအတည္ျပဳရန္",
			"verifying" : "အတည္ျပဳေနသည္...",
			"verified" : "အတည္ျပဳျပီး",
			"information" : "သတင္းအခ်က္အလက္",
			"birth_day" : "ေမြးေန႕",
			"years20" : "ေလွ်ာက္ထားသူသည္အသက္ႏွစ္ဆယ္ႏွင့္အထက္ျဖစ္ရမည္။ (လ/ေန့/ႏွစ္)",
			"province" : "ဲျပည္နယ္ကိုေရြးခ်ယ္ရန္",
			"contact_info" : "ဆက္သြယ္ရန္သတင္းအခ်က္အလက္",
			"continue" : "ဆက္လက္ေဆာက္ရြက္ရန္",
			"id_card" : "အိုင္ဒီကတ္္နံပါတ္",
			"passport" : "ႏိုင္ငံကူးလက္မွတ္",
			"first_name_th" : "ပထမ အမည္ (ခမာ)",
			"last_name_th" : "ေနာက္ဆံုး အမည္ (ခမာ)",
			"first_name_en" : "ပထမ အမည္ (အဂၤလိပ္)",
			"last_name_en" : "ေနာက္ဆံုး အမည္ (အဂၤလိပ္)",
			"road" : "လမ္း",
			"sub_area" : "ဧရိ ယာ ခဲြမ်ား",
			"area" : "ဧရိ ယာ",
			"sub_area_bkk" : "ဧရိ ယာ ခဲြမ်ား",
			"area_bkk" : "ဧရိ ယာ",
			"country" : "ႏိုင္ငံ ",
			"zip" : "စာတိုက္သေကၤတအမွတ္",

			"last_downline":"ေနာက္ဆံုး ေဒါင္းလိုင္း",

			"select_language" : "ဘာသာစကားေရြးခ်ယ္ရန္",
			"language_en" : "အဂၤလိပ္",
			"language_th" : "ခမာ"
		},
                hk : {
			"pv" : "個人績分",
			"ov" : "組織績分",
			"tv" : "團隊積分",
			"network" : "團隊網絡",
			"enroll" : "推薦",
			"sharing" : "分享",
			"news" : "訊息",
			"hot_news" : "最新資訊",
			"instagram" : "Instagram",
			"shopping" : "購物",
			"upline" : "上線",
			"me" : "我",
			"edit_profile_picture" : "設定個人圖片",
			"edit_profile_picture_uploading": "您的圖片正在上傳並且很快就會顯示出來",
			"general_edit" : "一般設定",
			"name" : "名字",
			"phone" : "電話",
			"email" : "電子郵件",
			"address" : "地址",
			"required" : "需要",
			"cancel" : "取消",
			"add_to_cart" : "添加到購物車",
			"added" : "已添加",
			"ship_to" : "運送到",
			"ship_method" : "送貨方式",
			"pickup" : "自取",
			"delivery" : "送貨 350 THB",
			"enroll_pickup" : "自取 500 THB",
			"enroll_delivery" : "送貨 850 THB",
			"total" : "總計",
			"checkout" : "付款",
			"calculating" : "計算中...",
			"ordering" : "訂購中...",
			"leg1" : "第1條線",
			"leg2" : "第2條線",
			"leg3" : "第3條線",
			"all" : "全部",
			"categories" : "分類",
			"easyship" : "自動送貨",
			"share" : "分享",
			"facebook" : "Facebook",
			"sms" : "短信",

			"more_info" : "如果您對此應用程式有任何疑問，請與我們的顧客服務部聯絡。",
			"enroller" : "推薦人 ID",
			"sponsor" : "介紹人 ID",
			"verify_enroller" : "驗證推薦人",
			"verify_id" : "驗證ID",
			"verifying" : "正在驗證...",
			"verified" : "已驗證",
			"information" : "信息",
			"birth_day" : "生日",
			"years20" : "申請人必須年滿20歲或以上 (月/日/年) ",
			"province" : "選擇地區",
			"contact_info" : "聯絡資料",
			"continue" : "繼續",
			"id_card" : "身份證號碼",
			"passport" : "護照",
			"first_name_th" : "名字 (中文)",
			"last_name_th" : "姓氏 (中文)",
			"first_name_en" : "名字 (英文)",
			"last_name_en" : "姓氏 (英文)",
			"road" : "路",
			"sub_area" : "分地區",
			"area" : "地區",
			"sub_area_bkk" : "分地區",
			"area_bkk" : "地區",
			"country" : "國家",
			"zip" : "郵政區碼",

			"last_downline":"這是最後的下線",

			"select_language" : "選擇語言",
			"language_en" : "英文",
			"language_th" : "中文"
		},
                km : {
			"pv" : "បរិមាណផ្ទាល់ខ្លួន",
			"ov" : "បរិមាណអង្គភាព",
			"tv" : "បរិមាណជាក្រុម​",
			"network" : "បណ្ដាយ",
			"enroll" : "អ្នកចុះឈ្មោះ",
			"sharing" : "ចែករំលែកព៌តមាន",
			"news" : "ពត៌មាន",
			"hot_news" : "Unicity ពត៌មានទាន់ហេតុការណ៏",
			"instagram" : "Instagram",
			"shopping" : "ទិញទំនិញ",
			"upline" : "ថ្នាក់លើ",
			"me" : "ខ្ញុំ",
			"edit_profile_picture" : "កែសម្រួលទម្រង់រូបភាព",
			"edit_profile_picture_uploading": "រូបភាពរបស់អ្នកកំពុងតំឡើងនិងបង្ហាញរយះពេលខ្លី",
			"general_edit" : "បន្ថែមពត៌មានទូទៅ",
			"name" : "ឈ្មោះ",
			"phone" : "លេខទូរស័ព្ទ",
			"email" : "សារលិខិត",
			"address" : "អាស័យដ្ឋាន",
			"required" : "លខ័្ខណ្ឌ",
			"cancel" : "លុបចោល",
			"add_to_cart" : "បន្ថែមក្នុងរទេះអីវ៉ាន់",
			"added" : "បន្ថែម",
			"ship_to" : "បញ្ជូនអីវ៉ាន់",
			"ship_method" : "មធ្យោបាយដឹកជញ្ជូន",
			"pickup" : "កន្លែងទទួល",
			"delivery" : "ដឹកជញ្ជូន 350 THB",
			"enroll_pickup" : "កន្លែងទទួល 500 THB",
			"enroll_delivery" : "ដឹកជញ្ជូន 850 THB",
			"total" : "សរុប​",
			"checkout" : "ពិនិត្យមើល",
			"calculating" : "គណនា...",
			"ordering" : "បញ្ជារទិញ...",
			"leg1" : "បណ្ដាយជំនាន់ទី1",
			"leg2" : "បណ្ដាយជំនាន់ទី2",
			"leg3" : "បណ្ដាយជំនាន់ទី3",
			"all" : "ទាំងអស់",
			"categories" : "ប្រភេទ",
			"easyship" : "Easy Ship",
			"share" : "ចែករំលែកព៌តមាន",
			"facebook" : "Facebook",
			"sms" : "ផ្ញើសារ",

			"more_info" : "សូមទំនាក់ទំនងមកក្រុមហ៊ុនUnicity ប្រសិនបើអ្នកមានបញ្ហារឺសំណួរណាមួយដែលទាក់ទងនឹងកម្មវិធីនេះ",
			"enroller" : "លេខកូដអ្នកចុះឈ្មោះ",
			"sponsor" : "លេខកូដអ្នកឧបត្ថម្ភ",
			"verify_enroller" : "បញ្ជាក់អ្នកចុះឈ្មោះ",
			"verify_id" : "បញ្ជាក់លេខកូដ",
			"verifying" : "កំពុងបញ្ជាក់...",
			"verified" : "បញ្ជាក់",
			"information" : "ពត៌មាន",
			"birth_day" : "ថ្ងៃ​កំណើត",
			"years20" : "អ្នកដាក់ពាក្យស្នើរសុំត្រូវមានអាយុ20ឆ្នាំឬលើសពីនេះ",
			"province" : "ជ្រើសរើសខេត្ត",
			"contact_info" : "ទំនាក់ទំនងពត៌មាន",
			"continue" : "បន្ត",
			"id_card" : "លេខអត្តសញ្ញាណប័ណ្ណ",
			"passport" : "លិខិតឆ្លងដែន",
			"first_name_th" : "នាមត្រកូល(ខ្មែរ)",
			"last_name_th" : "នាមខ្លួន(ខ្មែរ)",
			"first_name_en" : "នាមត្រកូល(ឡាតាំង)",
			"last_name_en" : "នាមខ្លួន(ឡាតាំង)",
			"road" : "ផ្លូវ",
			"sub_area" : "តំបន់បន្ទាប់",
			"area" : "តំបន់",
			"sub_area_bkk" : "តំបន់បន្ទាប់",
			"area_bkk" : "តំបន់",
			"country" : "ប្រទេស",
			"zip" : "លេខកូដប្រទេស",

			"last_downline":"នេះគឺជាបណ្តាញជាន់ក្រោមបង្អស់",

			"select_language" : "ជ្រើសរើសភាសា",
			"language_en" : "អង់គ្លេស",
			"language_th" : "ខ្មែរ"
		}
	};
	var headerTitleLabels = {
		en : {
			home : "Home",
			profile : "Profile",
			tracker : "Success Tracker",
			network : "Genealogy",
			"network-depth" : "Downline",
			news : "News",
			shopping : "Shopping",
			prospect : "Sharing",
			enroll : "Enroll",
			cart : "Cart",
			payment : "Payment",
			setting : "Choose Language"
		},
		th : {
			home : "หน้าแรก",
			profile : "ข้อมูลส่วนตัว",
			tracker : "ตำแหน่ง",
			network : "สายงาน",
			"network-depth" : "สายลึก",
			news : "ข่าว",
			shopping : "สั่งซื้อ",
			prospect : "ส่งต่อ",
			enroll : "สมัครสมาชิก",
			cart : "ตระกร้า",
			payment : "ชำระเงิน",
			setting : "เลือกภาษา"
		},
                jp : {
			home : "ホーム",
			profile : "プロフィール",
			tracker : "達成状況",
			network : "組織",
			"network-depth" : "ダウンライン",
			news : "ニュース",
			shopping : "オンラインショッピング",
			prospect : "シェア",
			enroll : "スポンサー",
			cart : "カート",
			payment : "支払い方法",
			setting : "言語を選んでください"
		},
                mm : {
			home : "အိမ္",
			profile : "ပရိုဖုိင္(လ္)",
			tracker : "ေအာင္ျမင္မွု လမ္း",
			network : "ေဆြစဥ္မ်ိဳးဆက္",
			"network-depth" : "ေဒါင္းလိုင္း",
			news : "သတင္း",
			shopping : "ေစ်း၀ယ္ျခင္း",
			prospect : "မွ်ေ၀ျခင္း",
			enroll : "စာရင္းသြင္းျခင္း",
			cart : "ေစ်း၀ယ္လွည္း",
			payment : "ေငြေပးေခ်မူ",
			setting : "ဘာသာစကားေရြးခ်ယ္ရန္"
		},
                hk : {
			home : "首頁",
			profile : "個人資料",
			tracker : "成功分析",
			network : "族譜",
			"network-depth" : "下線",
			news : "訊息",
			shopping : "購物",
			prospect : "分享",
			enroll : "推薦",
			cart : "購物車",
			payment : "付款",
			setting : "選擇語言"
		}
                ,
                km : {
			home : "កន្លែងដើម",
			profile : "ប្រវត្តិរូប",
			tracker : "ទន្និន័យលទ្ធផលគ្រោងសាង",
			network : "បញ្ជីរាយនាម",
			"network-depth" : "ជាន់ក្រោម",
			news : "ពត៌មាន",
			shopping : "ទិញទំនិញ",
			prospect : "ចែករំលែកព៌តមាន",
			enroll : "អ្នកចុះឈ្មោះ",
			cart : "រទេះអីវ៉ាន់",
			payment : "ការបង់ប្រាក់",
			setting : "ជ្រើសរើសភាសា"
		}
	};
	var sideNavLabels = {
		en : {
			home : "Home",
			profile : "Profile",
			success : "Success",
			network : "Genealogy",
			news : "News",
			shopping : "Shopping",
			prospect : "Sharing",
			enroll : "Enroll",
			setting : "Language",
			facebook : "Facebook",
			instagram : "Instagram",
			      report : "Report",
			signOut : "Sign Out",
		},
		th : {
			    report : "รายงาน",
			home : "หนัาแรก",
			profile : "ข้อมูลส่วนตัว",
			success : "ตำแหน่ง",
			network : "สายงาน",
			news : "ข่าว",
			shopping : "สั่งซื้อ",
			prospect : "ส่งต่อ",
			enroll : "สมัครสมาชิก",
			setting : "ภาษา",
			facebook : "Facebook",
			instagram : "Instagram",
			signOut : "ออกจากระบบ",
		},
                jp : {
			home : "ホーム",
			profile : "プロフィール",
			success : "成功",
			network : "組織",
			news : "ニュース",
			shopping : "オンラインショッピング",
			prospect : "プロモーションビデオ",
			enroll : "スポンサー",
			setting : "設定",
			facebook : "Facebook",
			instagram : "Instagram",
			signOut : "サインアウト",
		},
                mm : {
			home : "အိမ္",
			profile : "ပရိုဖုိင္(လ္)",
			success : "ေအာင္ျမင္ ျခင္း",
			network : "ကြန္ရက္",
			news : "သတင္း",
			shopping : "ေစ်း၀ယ္ျခင္း",
			prospect : "မွ်ေ၀ျခင္း",
			enroll : "စာရင္းသြင္းျခင္း",
			setting : "ဆက္တင္",
			facebook : "Facebook",
			instagram : "Instagram",
			signOut : "ထြက္သည္",
		},
                hk : {
			home : "首頁",
			profile : "個人資料",
                        success : "成功",
			network : "族譜",
			news : "訊息",
			shopping : "購物",
			prospect : "分享",
			enroll : "推薦",
			setting : "設定",
			facebook : "Facebook",
			instagram : "Instagram",
			signOut : "登出",
		}

                ,
                km : {
			home : "កន្លែងដើម",
			profile : "ប្រវត្តិរូប",
			success : "成功",
			network : "បញ្ជីរាយនាម",
			news : "ពត៌មាន",
			shopping : "ទិញទំនិញ",
			prospect : "ចែករំលែកព៌តមាន",
			enroll : "អ្នកចុះឈ្មោះ",
			setting : "ការកំណត់",
			facebook : "Facebook",
			instagram : "Instagram",
			signOut : "ចាកចេញ",
		}
	};
	var footerLabels = {
		en : {
			home : "Home",
			success : "Success",
			network : "Genealogy",
			news : "News",
			shopping : "Shopping"
		},
		th : {
			home : "หน้าแรก",
			success : "ตำแหน่ง",
			network : "สายงาน",
			news : "ข่าว",
			shopping : "สั่งซื้อ"
		}
                ,
		jp : {
			home : "ホーム",
			success : "成功",
			network : "組織",
			news : "ニュース",
			shopping : "オンラインショッピング"
		},
                mm : {
			home : "အိမ္",
			success : "ေအာင္ျမင္ ျခင္း",
			network : "ကြန္ရက္",
			news : "သတင္း",
			shopping : "ေစ်း၀ယ္ျခင္း"
		},
                hk : {
			home : "首頁",
			success : "成功",
			network : "團隊網絡",
			news : "訊息",
			shopping : "購物"
		},
                km : {
			home : "កន្លែងដើម",
			success : "ជោគជ័យ",
			network : "បញ្ជីរាយនាម",
			news : "ពត៌មាន",
			shopping : "ទិញទំនិញ"
		}
	};
})();
