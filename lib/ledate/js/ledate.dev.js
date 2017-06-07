/**
 * @插件名 ledate
 * @介绍 使用jquery开发的一款扁平化日期插件
 * @作者 彼岸花开
 * @日期 2014-11-17
 * @Version 0.1
 */
;
(function($, window, document, undefined) {
	var jpDt = {},
		doc = document,
		config = {
			skin: "default",                   // 皮肤
			language: "zh",	                   // 语言,en/zh，默认中文zh
			startDate: "",	                   // 开始日期,默认当天日期
			minDate: "1900-01-01 00:00:00",    // 最小日期
			maxDate: "2099-12-31 23:59:59",	   // 最大日期
			format: "yyyy-MM-dd",              // 日期格式化,默认是yyyy-MM-dd
			icon: [true, ""],                  // 是否显示小图标和设置小图标的路径
			isTime: false,                     // 是否开启时间显示
			isFestival: false,	               // 是否开启节日显示
			startElem: "",	                   // 日期限制，startElem绑定的ID的值为开始日期
			fixed: false,	                   // 是否直接固定显示日期插件
			style: "",	                       // 自定义样式
			onBefore: "",                      // 日期插件加载前的回调函数
			onSelect: "",	                   // 选择日期后的回调函数
			zIndex: "19911222"                 // 层的下标，用于解决插件被 层覆盖的问题，默认本人的生日：19911222
		},
		language = {
			month_zh: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],week_zh: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],month_en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],week_en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
		};
	/**
	 * ledate日期插件
	 */
	$.fn.ledate = function(opts) {
		var settings = $.extend({}, config, opts); // 插件参数传递
		jpDt.init(settings, this); // 初始化资源
	};
	/**
	 * 初始化资源
	 */
	jpDt.init = function(opts, obj) {
		jpDt.addSkin(opts, obj); // 加载皮肤
		// 是否固定
		if (opts.fixed) {
			jpDt.mainSection(opts, obj);
		} else {
			$(obj).addClass("ledate_blank").bind("click", function() {
				jpDt.mainSection(opts, obj); // 展示日期主界面
				jpDt.blankClose(opts, obj); // 点击空白部分关闭
			});
		}
	};
	/**
	 * 创建日期主视图
	 */
	jpDt.mainSection = function(opts, obj) {
		jpDt.doFunction(opts, "onBefore"); // 开始之前函数
		jpDt.validateDate(opts, obj);
		//　初始化参数
		var tempStr = "", jpHtml = "";
		var elemId = $(obj).attr("id");
		var monthArray = (opts.language == "zh" ? language.month_zh : language.month_en); // 月份语言
		var weekArray = (opts.language == "zh" ? language.week_zh : language.week_en); // 周的语言
		var minDate = util.getTransformDefaultTime(opts.minDate).split(","); // 最小日期
		var maxDate = util.getTransformDefaultTime(opts.maxDate).split(","); // 最大日期
		var dateArray = util.getTransformDefaultTime(opts.startDate == "" ? util.getDefaultTime() : opts.startDate).split(","); // 当前初始化的日期

		// 渲染插件骨架并定位
		jpHtml = "<div class='ledate ledate_" + elemId + "' id='ledate_" + elemId + "' onselectstart='return false;'><table border='0' cellspacing='0' cellpadding='0' width='100%'><thead><tr><th width='35' class='ledate_month_left_" + elemId + "'><img src='" + util.getPath() + "/images/ledate_left.png' class='ledate_img_left' /></th><th class='ledate_year_control_" + elemId + "'><label style='cursor:pointer;' class='ledate_now_year_" + elemId + "'>" + dateArray[0] + "</label><label class='ledate_now_year_title_" + elemId + "'>\u5e74</label><label style='cursor:pointer;' class='ledate_now_month_" + elemId + "'>" + util.digit(dateArray[1]) + "</label><label class='ledate_now_month_title_" + elemId + "'>\u6708</label><label style='display:none;' class='ledate_now_day_" + elemId + "'>" + util.parseInt(dateArray[2]) + "</label></th><th width='35' class='ledate_month_right_" + elemId + "'><img src='" + util.getPath() + "/images/ledate_right.png' class='ledate_img_right' /></th></tr></thead><tbody><tr><td colspan='3'><div style='height:200px;margin:2px;' class='ledate_main ledate_main_" + elemId + "'><div style='display:none;' class='ledate_main_time_" + elemId + "'><div class='ledate_time_menu ledate_time_menu_" + elemId + "' style='height:25px;border-bottom:solid 1px #ccc;line-height:25px;padding-left:15px;' align='center'><span class='ledate_span_time_title_" + elemId + "'></span><span class='ledate_span_time_close' style='float:right;height:25px;line-height:25px;cursor:pointer;padding-right:2px;font-size:18px;font-weight:bold;font-size:25px\0;#font-size:25x;'>×</span></div><div class='ledate_main_time_section_" + elemId + "'></div></div><div class='ledate_main_date_" + elemId + "'><div class='ledate_week ledate_week_" + elemId + "'><ul></ul></div><div class='ledate_date ledate_date_" + elemId + "'><ul></ul></div></div></div></td></tr></tbody><tfoot><tr><th colspan='3'><div style='display:" + (opts.isTime ? "block" : "none") + ";' class='ledate_end ledate_end_" + elemId + "'><div style='float:left;line-height:37px;'><input style='margin-left:2px;' type='text' onclick='this.select();' value='" + (util.digit(dateArray[3])) + "' readonly class='ledate_time_box ledate_time_box_hours_" + elemId + "' />\u65f6<input type='text' onclick='this.select();' value='" + (util.digit(dateArray[4])) + "' readonly class='ledate_time_box ledate_time_box_minutes_" + elemId + "' />\u5206<input type='text' onclick='this.select();' value='" + (util.digit(dateArray[5])) + "' readonly class='ledate_time_box ledate_time_box_seconds_" + elemId + "' />\u79d2</div><div style='float:right;line-height:37px;margin-bottom:-2px;'><input type='button' class='ledate_time_button ledate_time_button_clear_" + elemId + "' value='\u6e05\u7a7a' /><input type='button' class='ledate_time_button ledate_time_button_ok_" + elemId + "' value='\u786e\u8ba4' /></div></div></th></tr></tfoot></table></div>";
		jpDt.close(opts, obj); // 加载前清空
		$("body").append(jpHtml); // 追加到页面
		jpDt.orien(doc.getElementById("ledate_" + elemId), doc.getElementById(elemId)); // 日期定位

		var nowWeek = util.getWeek(dateArray[0], dateArray[1]); // 当月第一天是周几
		var fullDay = util.getFullDay(util.parseInt(dateArray[0]), util.parseInt(dateArray[1])); // 当月的总天数
		var prepLastDay = (util.parseInt(dateArray[1]) - 1 <= 0) ? util.getFullDay(util.parseInt(dateArray[0]) - 1, 12) : util.getFullDay(dateArray[0], util.parseInt(dateArray[1]) - 1); // 上个月最后一天

		// 循环周数
		for (var i = 0; i < weekArray.length; i++) {
			tempStr += "<li class=''>" + weekArray[i] + "</li>";
		}
		$(".ledate_week_" + elemId + " ul").append(tempStr);

		// 循环日期
		tempStr = ""
		// 上个月的日期
		for (var i = prepLastDay - nowWeek + 1; i <= prepLastDay; i++) {
			tempStr += "<li date-y='" + (util.parseInt(dateArray[1]) - 1 <= 0 ? util.parseInt(dateArray[0]) - 1 : dateArray[0]) + "' date-m='" + (util.parseInt(dateArray[1]) - 1 <= 0 ? 12 : util.digit(util.parseInt(dateArray[1]) - 1)) + "' date-d='" + (util.digit(i)) + "' class='ledate_prep_date_" + elemId + " ledate_common_hover ledate_common_noclick'>" + jpDt.isFestival(opts, dateArray[1], i, "prep") + "</li>";
		}
		// 正常日期
		for (var i = 1; i <= fullDay; i++) {
			if ((util.compareDate(dateArray[0], dateArray[1], i) >= util.compareDate(minDate[0], minDate[1], minDate[2])) && (util.compareDate(dateArray[0], dateArray[1], i) <= util.compareDate(maxDate[0], maxDate[1], maxDate[2]))) {
				tempStr += "<li date-y='" + dateArray[0] + "' date-m='" + dateArray[1] + "' date-d='" + (util.digit(i)) + "' class='" + (i == util.parseInt(dateArray[2]) ? "ledate_common_current" : "ledate_common_hover") + " ledate_normal_date_" + elemId + "'>" + jpDt.isFestival(opts, dateArray[1], i, "normal") + "</li>";
			} else {
				tempStr += "<li class='ledate_common_noclick' style='cursor:default;'>" + i + "</li>";
			}
		}
		// 下一个月日期
		for (var i = 1; i <= 42 - fullDay - nowWeek; i++) {
			tempStr += "<li date-y='" + (util.parseInt(dateArray[1]) + 1 > 12 ? util.parseInt(dateArray[0]) + 1 : dateArray[0]) + "' date-m='" + (util.parseInt(dateArray[1]) + 1 > 12 ? util.digit(1) : util.digit(util.parseInt(dateArray[1]) + 1)) + "' date-d='" + (util.digit(i)) + "' class='ledate_next_date_" + elemId + " ledate_common_hover ledate_common_noclick'>" + jpDt.isFestival(opts, dateArray[1], i, "next") + "</li>";
		}
		$(".ledate_date_" + elemId + " ul").append(tempStr); // 所有日期字符串

		// 上一个月的日期点击事件
		$(".ledate_prep_date_" + elemId).bind("click", function() {
			opts.startDate = $(this).attr("date-y") + "-" + $(this).attr("date-m") + "-" + $(this).attr("date-d") + " " + dateArray[3] + ":" + dateArray[4] + ":" + dateArray[5];
			jpDt.mainSection(opts, obj);
		});

		// 正常日期点击事件
		var normalList = $(".ledate_normal_date_" + elemId);
		normalList.click(function() {
			normalList.removeClass("ledate_common_current").addClass("ledate_common_hover");
			$(this).addClass("ledate_common_current").removeClass("ledate_common_hover");
			dateArray = util.getTransformDefaultTime(opts.startDate == "" ? util.getDefaultTime() : opts.startDate).split(","); // 确定的时候重新获得最新的日期

			// 设置文本框的值
			var dateValue = $(this).attr("date-y") + "-" + $(this).attr("date-m") + "-" + $(this).attr("date-d") + " " + dateArray[3] + ":" + dateArray[4] + ":" + dateArray[5];
			$(obj).val(util.format(dateValue, opts.format));
			$(".ledate_now_day_" + elemId).text(util.parseInt($(this).attr("date-d")));
			opts.startDate = dateValue;

			jpDt.doFunction(opts, "onSelect", dateValue); // 选择日期的函数
			// 是否是固定的关闭
			if (!opts.fixed) {jpDt.close(opts, obj);}
		});
		// 下一个月的日期点击事件
		$(".ledate_next_date_" + elemId).bind("click", function() {
			opts.startDate = $(this).attr("date-y") + "-" + $(this).attr("date-m") + "-" + $(this).attr("date-d") + " " + dateArray[3] + ":" + dateArray[4] + ":" + dateArray[5];
			jpDt.mainSection(opts, obj);
		});

		// 工具栏上个月日期点击
		$(".ledate_month_left_" + elemId).unbind("click").bind("click", function() {
			jpDt.monthControl(opts, obj, 0);
		});
		// 工具栏下个月日期点击
		$(".ledate_month_right_" + elemId).unbind("click").bind("click", function() {
			jpDt.monthControl(opts, obj, 1);
		});
		// 工具栏年份控制
		$(".ledate_year_control_" + elemId).bind("click", function() {
			var yearArray = new Array();
			// 计算出要显示的年份
			for (var i = 0; i < 6; i++) {
				yearArray[i] = util.parseInt(dateArray[0]) - (6 - i);
			}
			yearArray[6] = dateArray[0];
			for (var i = 7; i < 25; i++) {
				yearArray[i] = util.parseInt(dateArray[0]) + (i - 6);
			}
			jpDt.yearSection(opts, obj, yearArray); // 当前的年

			// 工具栏上一年
			$(".ledate_month_left_" + elemId).unbind("click").bind("click", function() {
				var firstYear = yearArray[0];
				yearArray = new Array();
				for (var i = util.parseInt(firstYear) - 25; i < firstYear; i++) {
					yearArray.push(i);
				}
				jpDt.yearSection(opts, obj, yearArray);
			});
			// 工具栏下一年
			$(".ledate_month_right_" + elemId).unbind("click").bind("click", function() {
				var firstYear = yearArray[24];
				yearArray = new Array();
				for (var i = 0; i < 25; i++) {
					yearArray[i] = util.parseInt(firstYear) + i + 1;
				}
				jpDt.yearSection(opts, obj, yearArray);
			});
		});
		jpDt.isTimeDisabled(opts, obj); // 时分秒是否可点击
		// 点击小时
		$(".ledate_time_box_hours_" + elemId).bind("click", function() {
			jpDt.hoursSection(opts, obj);
		});
		// 点击分钟
		$(".ledate_time_box_minutes_" + elemId).bind("click", function() {
			jpDt.minutesSection(opts, obj);
		});
		// 点击秒数
		$(".ledate_time_box_seconds_" + elemId).bind("click", function() {
			jpDt.secondsSection(opts, obj);
		});
		// 点击清空
		$(".ledate_time_button_clear_" + elemId).bind("click", function() {
			$(obj).val("");
		});
		// 点击确认
		$(".ledate_time_button_ok_" + elemId).bind("click", function() {
			var y = $(".ledate_now_year_" + elemId).text(), m = $(".ledate_now_month_" + elemId).text(), d = $(".ledate_now_day_" + elemId).text(), hh = $(".ledate_time_box_hours_" + elemId).val(), mm = $(".ledate_time_box_minutes_" + elemId).val(), ss = $(".ledate_time_box_seconds_" + elemId).val();
			opts.startDate = y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;

			// 验证日期是否合法,所有不合法日期重置为minDate的日期
			jpDt.validateDate(opts, obj);

			$(obj).val(util.format(opts.startDate, opts.format));
			// 是否是固定的关闭
			if (!opts.fixed) { jpDt.close(opts, obj); }
		});
	};
	/**
	 * 创建年份视图
	 */
	jpDt.yearSection = function(opts, obj, yearArray) {
		var elemId = $(obj).attr("id");
		var minDate = util.getTransformDefaultTime(opts.minDate).split(","); // 最小日期
		var maxDate = util.getTransformDefaultTime(opts.maxDate).split(","); // 最大日期
		var dateArray = util.getTransformDefaultTime(opts.startDate == "" ? util.getDefaultTime() : opts.startDate).split(","); // 当前初始化的日期
		$(".ledate_main_" + elemId).empty();
		var tempStr = "<ul class='ledate_main_year'>";
		for (var i = 0; i < yearArray.length; i++) {
			if ((yearArray[i] >= minDate[0]) && (yearArray[i] <= maxDate[0])) {
				tempStr += "<li class='" + (yearArray[i] == dateArray[0] ? "ledate_common_current" : "ledate_common_hover") + "'>" + yearArray[i] + "</li>";
			} else {
				tempStr += "<li class='ledate_common_noclick' style='cursor:default;'>" + yearArray[i] + "</li>";
			}
		}
		$(".ledate_main_" + elemId).empty().append(tempStr + "</ul>");
		$(".ledate_now_month_" + elemId).hide(); // 月份隐藏
		$(".ledate_now_month_title_" + elemId).hide(); // 月份隐藏
		$(".ledate_now_year_" + elemId).text(yearArray[0] + "-" + yearArray[yearArray.length - 1]);
		// 点击年份获取对应的月份
		$(".ledate_main_" + elemId + " ul li").click(function() {
			if ($(this).hasClass("ledate_common_noclick")) {return;}
			$(".ledate_now_year_" + elemId).text($(this).text());
			jpDt.monthSection(opts, obj);
		});
	};
	/**
	 * 创建月份视图
	 */
	jpDt.monthSection = function(opts, obj) {
		$(".ledate_main_" + elemId).empty();

		var tempStr = "<ul class='ledate_main_month'>";
		var elemId = $(obj).attr("id");
		var monthArray = (opts.language == "zh" ? language.month_zh : language.month_en); // 月份语言
		var weekArray = (opts.language == "zh" ? language.week_zh : language.week_en); // 周的语言
		var minDate = util.getTransformDefaultTime(opts.minDate).split(","); // 最小日期
		var maxDate = util.getTransformDefaultTime(opts.maxDate).split(","); // 最大日期
		var dateArray = util.getTransformDefaultTime(opts.startDate == "" ? util.getDefaultTime() : opts.startDate).split(","); // 当前初始化的日期
		var currentYear = $(".ledate_now_year_" + $(obj).attr("id")).text(),
			currentMonth = $(".ledate_now_month_" + $(obj).attr("id")).text();

		for (var i = 0; i < monthArray.length; i++) {
			if (util.compareDate(currentYear, (util.parseInt(i) + 1)) >= util.compareDate(minDate[0], minDate[1]) && util.compareDate(currentYear, (util.parseInt(i) + 1)) <= util.compareDate(maxDate[0], maxDate[1])) {
				tempStr += "<li date-m = '" + (util.parseInt(i) + 1) + "' class='" + (i == (dateArray[1] - 1) ? "ledate_common_current" : "ledate_common_hover") + "'>" + monthArray[i] + "</li>";
			} else {
				tempStr += "<li class='ledate_common_noclick' style='cursor:default;'>" + monthArray[i] + "</li>";
			}

		}
		$(".ledate_main_" + elemId).empty().append(tempStr + "</ul>");
		// 点击年份获取对应的月份
		$(".ledate_main_" + elemId + " ul li").click(

		function() {
			if ($(this).hasClass("ledate_common_noclick")) {return;}
			$(".ledate_now_month_" + elemId).text($(this).attr("date-m"));
			var dateValue = $(".ledate_now_year_" + elemId).text() + "-" + $(".ledate_now_month_" + elemId).text() + "-" + $(".ledate_now_day_" + elemId).text() + " " + dateArray[3] + ":" + dateArray[4] + ":" + dateArray[5];
			opts.startDate = dateValue;
			jpDt.mainSection(opts, obj);
		});
	};
	/**
	 * 工具栏控制月份增加和减少
	 */
	jpDt.monthControl = function(opts, obj, type) {
		var dateArray = util.getTransformDefaultTime(opts.startDate == "" ? util.getDefaultTime() : opts.startDate).split(","); // 当前初始化的日期
		var y, m, d = dateArray[2];
		// 月份减少
		if (type == 0) {
			if (util.parseInt(dateArray[1]) - 1 < 1) {
				y = util.parseInt(dateArray[0]) - 1;
				m = 12;
			} else {
				y = util.parseInt(dateArray[0]);
				m = util.parseInt(dateArray[1]) - 1;
			}
			opts.startDate = y + "-" + m + "-" + d + " " + dateArray[3] + ":" + dateArray[4] + ":" + dateArray[5];
		}
		// 月份增加
		if (type == 1) {
			if (util.parseInt(dateArray[1]) + 1 > 12) {
				y = util.parseInt(dateArray[0]) + 1;
				m = 1;
			} else {
				y = util.parseInt(dateArray[0]);
				m = util.parseInt(dateArray[1]) + 1;
			}
			opts.startDate = y + "-" + m + "-" + d + " " + dateArray[3] + ":" + dateArray[4] + ":" + dateArray[5];
		}
		jpDt.mainSection(opts, obj);
	};
	/**
	 * 创建小时视图
	 */
	jpDt.hoursSection = function(opts, obj) {
		var elemId = $(obj).attr("id");
		var minDate = util.getTransformDefaultTime(opts.minDate).split(","); // 最小日期
		var maxDate = util.getTransformDefaultTime(opts.maxDate).split(","); // 最大日期
		var currentYear = $(".ledate_now_year_" + elemId).text();
		var currentMonth = $(".ledate_now_month_" + elemId).text();
		var currentDay = $(".ledate_now_day_" + elemId).text();
		var hours = util.parseInt($(".ledate_time_box_hours_" + elemId).val());
		// 需要展示隐藏的内容
		$(".ledate_main_date_" + elemId).hide();
		$(".ledate_main_time_" + elemId).show();
		$(".ledate_span_time_title_" + elemId).text("\u5c0f\u65f6"); // 展示时分秒工具条 

		// 小时视图主体部分
		var hoursHtml = "<ul class='ledate_time_hours'>";
		for (var i = 0; i <= 23; i++) {
			if ((util.compareDate(currentYear, currentMonth, currentDay, i) >= util.compareDate(minDate[0], minDate[1], minDate[2], minDate[3])) && (util.compareDate(currentYear, currentMonth, currentDay, i) <= util.compareDate(maxDate[0], maxDate[1], maxDate[2], maxDate[3]))) {
				hoursHtml += "<li class='" + (i == hours ? "ledate_common_current" : "ledate_common_hover") + "'>" + util.digit(i) + "</li>";
			} else {
				hoursHtml += "<li class='ledate_common_noclick' style='cursor:default;'>" + util.digit(i) + "</li>";
			}
		}
		$(".ledate_main_time_section_" + elemId).empty().append(hoursHtml + "</ul>");
		// 时分秒工具条点击
		$(".ledate_time_menu_" + elemId).click(function() {
			$(".ledate_main_time_section_" + elemId).empty();
			$(".ledate_main_time_" + elemId).hide();
			$(".ledate_main_date_" + elemId).show();
		});
		// 小时的数字点击
		$(".ledate_main_time_section_" + elemId + " ul li").click(function() {
			if ($(this).hasClass("ledate_common_noclick")) {return;}
			$(".ledate_main_time_section_" + elemId).empty();
			$(".ledate_main_time_" + elemId).hide();
			$(".ledate_main_date_" + elemId).show();
			jpDt.timeSelect(opts, obj, "hours", $(this).text());
		});
	};
	/**
	 * 创建分钟视图
	 */
	jpDt.minutesSection = function(opts, obj) {
		// 初始化参数
		var elemId = $(obj).attr("id");
		var minDate = util.getTransformDefaultTime(opts.minDate).split(","); // 最小日期
		var maxDate = util.getTransformDefaultTime(opts.maxDate).split(","); // 最大日期
		var currentYear = $(".ledate_now_year_" + elemId).text();
		var currentMonth = $(".ledate_now_month_" + elemId).text();
		var currentDay = $(".ledate_now_day_" + elemId).text();
		var hours = util.parseInt($(".ledate_time_box_hours_" + elemId).val());
		var minutes = util.parseInt($(".ledate_time_box_minutes_" + elemId).val());
		// 需要展示隐藏的内容
		$(".ledate_main_date_" + elemId).hide();
		$(".ledate_main_time_" + elemId).show();
		$(".ledate_span_time_title_" + elemId).text("\u5206\u949f"); // 展示时分秒工具条 

		// 分钟视图主体部分
		var hoursHtml = "<ul class='ledate_time_minutes'>";
		for (var i = 0; i <= 59; i++) {
			if (util.compareDate(currentYear, currentMonth, currentDay, hours, i) >= util.compareDate(minDate[0], minDate[1], minDate[2], minDate[3], minDate[4]) && util.compareDate(currentYear, currentMonth, currentDay, hours, i) <= util.compareDate(maxDate[0], maxDate[1], maxDate[2], maxDate[3], maxDate[4])) {
				hoursHtml += "<li class='" + (i == minutes ? "ledate_common_current" : "ledate_common_hover") + "'>" + util.digit(i) + "</li>";
			} else {
				hoursHtml += "<li class='ledate_common_noclick' style='cursor:default;'>" + util.digit(i) + "</li>";
			}
		}
		$(".ledate_main_time_section_" + elemId).empty().append(hoursHtml + "</ul>");

		// 时分秒工具条点击
		$(".ledate_time_menu_" + elemId).click(function() {
			$(".ledate_main_time_section_" + elemId).empty();
			$(".ledate_main_time_" + elemId).hide();
			$(".ledate_main_date_" + elemId).show();
		});
		// 分钟的数字点击
		$(".ledate_main_time_section_" + elemId + " ul li").click(function() {
			if ($(this).hasClass("ledate_common_noclick")) {return;}
			$(".ledate_main_time_section_" + elemId).empty();
			$(".ledate_main_time_" + elemId).hide();
			$(".ledate_main_date_" + elemId).show();
			jpDt.timeSelect(opts, obj, "minutes", $(this).text());
		});
	};
	/**
	 * 创建秒视图
	 */
	jpDt.secondsSection = function(opts, obj) {
		// 初始化参数
		var elemId = $(obj).attr("id");
		var minDate = util.getTransformDefaultTime(opts.minDate).split(","); // 最小日期
		var maxDate = util.getTransformDefaultTime(opts.maxDate).split(","); // 最大日期
		var currentYear = $(".ledate_now_year_" + elemId).text();
		var currentMonth = $(".ledate_now_month_" + elemId).text();
		var currentDay = $(".ledate_now_day_" + elemId).text();
		var hours = util.parseInt($(".ledate_time_box_hours_" + elemId).val());
		var minutes = util.parseInt($(".ledate_time_box_minutes_" + elemId).val());
		var seconds = util.parseInt($(".ledate_time_box_seconds_" + elemId).val());
		// 需要展示隐藏的内容
		$(".ledate_main_date_" + elemId).hide();
		$(".ledate_main_time_" + elemId).show();
		$(".ledate_span_time_title_" + elemId).text("\u79d2\u6570"); // 展示时分秒工具条 

		// 秒数视图主体部分
		var hoursHtml = "<ul class='ledate_time_seconds'>";
		for (var i = 0; i <= 59; i++) {
			if (util.compareDate(currentYear, currentMonth, currentDay, hours, minutes, i) >= util.compareDate(minDate[0], minDate[1], minDate[2], minDate[3], minDate[4], minDate[5]) && util.compareDate(currentYear, currentMonth, currentDay, hours, minutes, i) <= util.compareDate(maxDate[0], maxDate[1], maxDate[2], maxDate[3], maxDate[4], maxDate[5])) {
				hoursHtml += "<li class='" + (i == seconds ? "ledate_common_current" : "ledate_common_hover") + "'>" + util.digit(i) + "</li>";
			} else {
				hoursHtml += "<li class='ledate_common_noclick' style='cursor:default;'>" + util.digit(i) + "</li>";
			}

		}
		$(".ledate_main_time_section_" + elemId).empty().append(hoursHtml + "</ul>");

		// 时分秒工具条点击
		$(".ledate_time_menu_" + elemId).click(function() {
			$(".ledate_main_time_section_" + elemId).empty();
			$(".ledate_main_time_" + elemId).hide();
			$(".ledate_main_date_" + elemId).show();
		});
		$(".ledate_main_time_section_" + elemId + " ul li").click(function() {
			if ($(this).hasClass("ledate_common_noclick")) {return;}
			$(".ledate_main_time_section_" + elemId).empty();
			$(".ledate_main_time_" + elemId).hide();
			$(".ledate_main_date_" + elemId).show();
			jpDt.timeSelect(opts, obj, "seconds", $(this).text());
		});
	};
	/**
	 * 时分秒选择
	 */
	jpDt.timeSelect = function(opts, obj, type, args) {
		var elemId = $(obj).attr("id");
		var h = util.parseInt($(".ledate_time_box_hours_" + elemId).val());
		var m = util.parseInt($(".ledate_time_box_minutes_" + elemId).val());
		var s = util.parseInt($(".ledate_time_box_seconds_" + elemId).val());
		// 点击的小时
		if (type == "hours") {
			h = args;
			$(".ledate_time_box_hours_" + elemId).val(args);
		}
		// 点击的分钟
		if (type == "minutes") {
			m = args;
			$(".ledate_time_box_minutes_" + elemId).val(args);
		}
		// 点击的秒数
		if (type == "seconds") {
			s = args;
			$(".ledate_time_box_seconds_" + elemId).val(args);
		}
		var dateValue = $(".ledate_now_year_" + elemId).text() + "-" + $(".ledate_now_month_" + elemId).text() + "-" + $(".ledate_now_day_" + elemId).text() + " " + h + ":" + m + ":" + s;
		opts.startDate = dateValue;
		$(".ledate_main_date_" + elemId).show(); // 显示日期主视图
	};
	/**
	 * 时间是否可以点击
	 */
	jpDt.isTimeDisabled = function(opts, obj) {
		var elemId = $(obj).attr("id");
		if (opts.format.indexOf("HH") < 0) {
			$(".ledate_time_box_hours_" + elemId).attr("disabled", true);
		}
		if (opts.format.indexOf("mm") < 0) {
			$(".ledate_time_box_minutes_" + elemId).attr("disabled", true);
		}
		if (opts.format.indexOf("ss") < 0) {
			$(".ledate_time_box_seconds_" + elemId).attr("disabled", true);
		}
	};
	/**
	 * 验证插件中的日期是否合法，并自动设置日期为minDate
	 */
	jpDt.validateDate = function(opts, obj) {
		// 初始化参数
		var elemId = $(obj).attr("id");
		var minDate = util.getTransformDefaultTime(opts.minDate).split(","); // 最小日期
		var maxDate = util.getTransformDefaultTime(opts.maxDate).split(","); // 最大日期
		var currentYear = $(".ledate_now_year_" + elemId).text();
		var currentMonth = $(".ledate_now_month_" + elemId).text();
		var currentDay = $(".ledate_now_day_" + elemId).text();
		var hours = util.parseInt($(".ledate_time_box_hours_" + elemId).val());
		var minutes = util.parseInt($(".ledate_time_box_minutes_" + elemId).val());
		var seconds = util.parseInt($(".ledate_time_box_seconds_" + elemId).val());
		var currentDate = util.getTransformDefaultTime(opts.startDate).split(",");
		
		// 验证日期格式是否正确
		if (new Date(currentDate[0], currentDate[1], currentDate[2], currentDate[3], currentDate[4], currentDate[5]) == "Invalid Date") {
			alert("\u65e5\u671f\u683c\u5f0f\u4e0d\u6b63\u786e\uff01"); // 日期格式不正确！
			opts.startDate = opts.minDate;
		}
		// 验证日期是否在minDate和maxDate之内
		if (util.compareDate(currentDate[0], currentDate[1], currentDate[2], currentDate[3], currentDate[4], currentDate[5]) < util.compareDate(minDate[0], minDate[1], minDate[2], minDate[3], minDate[4], minDate[5])) {
			alert("\u65e5\u671f\u5fc5\u987b\u5927\u4e8e\u6700\u5c0f\u65e5\u671f\uff01"); //日期必须大于最小日期！
			opts.startDate = opts.minDate;
		}
		if (util.compareDate(currentDate[0], currentDate[1], currentDate[2], currentDate[3], currentDate[4], currentDate[5]) > util.compareDate(maxDate[0], maxDate[1], maxDate[2], maxDate[3], maxDate[4], maxDate[5])) {
			alert("\u65e5\u671f\u5fc5\u987b\u5c0f\u4e8e\u6700\u5927\u65e5\u671f\uff01"); //日期必须小于最大日期！
			opts.startDate = opts.maxDate;
		}
	};
	/**
	 * 调用回调函数
	 */
	jpDt.doFunction = function(opts, funs, args) {
		if (funs == "onBefore") {
			opts.onBefore != "" && typeof "function" ? opts.onBefore() : null;
		} else if (funs == "onSelect") {
			opts.onSelect != "" && typeof "function" ? opts.onSelect(args) : null;
		} else if (funs == "onClose") {
			opts.onClose != "" && typeof "function" ? opts.onClose(args) : null;
		}
	}
	/**
	 * 日期定位
	 */
	jpDt.scroll = function(type) {
		type = type ? "scrollLeft" : "scrollTop";
		return doc.body[type] | doc.documentElement[type];
	};
	jpDt.winarea = function(type) {
		return doc.documentElement[type ? "clientWidth" : "clientHeight"];
	};
	jpDt.orien = function(obj, self, pos) {
		var tops, rect = self.getBoundingClientRect();
		obj.style.left = rect.left + jpDt.scroll(1) + "px";
		tops = (rect.bottom + obj.offsetHeight / 1.5 <= jpDt.winarea()) ? rect.bottom - 1 : rect.top > obj.offsetHeight / 1.5 ? rect.top - obj.offsetHeight + 1 : jpDt.winarea() - obj.offsetHeight;
		obj.style.top = Math.max(tops + jpDt.scroll() + 1, 1) + "px";
	}
	/**
	 * 是否显示节日
	 */
	jpDt.isFestival = function(opts, month, day, type) {
		// 上个月显示的日期
		if (type == "prep") {
			return opts.isFestival ? util.festival((util.parseInt(month) - 1) <= 0 ? 12 : (util.parseInt(month) - 1), day) : day;
		}
		// 本月显示的日期
		if (type == "normal") {
			return opts.isFestival ? util.festival(util.parseInt(month), day) : day;
		}
		// 下个月显示的日期
		if (type == "next") {
			return opts.isFestival ? util.festival((util.parseInt(month) + 1) > 12 ? 1 : (util.parseInt(month) + 1), day) : day;
		}
	};
	/**
	 * 点击后关闭插件
	 */
	jpDt.close = function(opts, obj) {
		// 删除当前的日期插件对象
		$(".ledate_" + $(obj).attr("id")).remove();
	};

	/**
	 * 点击空白地方关闭插件
	 */
	jpDt.blankClose = function(opts, obj) {
		$(document).bind("click", function(e) {
			var e = e || window.event;
			var elem = e.srcElement || e.target;
			var classname = $(elem).prop("className");
			if (classname.indexOf("ledate") < 0) {
				$(".ledate_" + $(obj).attr("id")).remove();
			}
		});
	};
	/**
	 * 加载日期皮肤
	 */
	jpDt.addSkin = function(opts, obj) {
		// 接收外部设置的皮肤
		$.ledate.skin(opts.skin);
		// 加载皮肤前清除所有重复的皮肤
		util.removeCss("ledate.css");

		// 动态加载日期皮肤库
		var head_css = document.getElementsByTagName('head')[0];
		var href = util.getPath() + "skins/" + opts.skin + "/ledate.css";
		var css = doc.createElement("link");
		css.type = "text/css";
		css.rel = "stylesheet";
		css.href = href;
		head_css.appendChild(css);
		var iconPath = opts.icon[1] == "" ? (util.getPath() + "skins/" + opts.skin + "/icon.png") : opts.icon[1]; // 图标的路径
		// 加载小图标
		if (opts.icon[0]) {
			$(obj).css({ "background": "url(" + iconPath + ") no-repeat right center", "background-color": "#FFF" });
		}
	};
	/**
	 * 接受插件定义的皮肤，并重新设置到参数中
	 */
	$.ledate = {
		skin: function(skins) {
			// 设置用户定义的皮肤
			config.skin = skins ? skins : config.skin;
		}
	}

	/**
	 * 工具类
	 */
	var util = {
		getPath: function() {
			// 获得插件所在的路径
			var script = document.scripts || document.getElementsByTagName("script");
			var path;
			for (var i = script.length; i > 0; i--) {
				if (script[i - 1].src.indexOf("ledate") > -1) {
					path = script[i - 1].src.substring(0, script[i - 1].src.lastIndexOf("/") - 2);
				}
			}
			return path;
		},
		parseInt: function(str) {
			// 将字符转换为数字，解决字符为09和08时候不正常问题
			return parseInt(str, 10);
		},
		trim: function(str) {
			// 去除字符串空格
			str = str || '';
			return str.replace(/^\s|\s$/g, '').replace(/\s+/g, ' ');
		},
		digit: function(num) {
			// 数字补位处理
			return num < 10 ? '0' + (num | 0) : num;
		},
		getDefaultTime: function() {
			// 得到当前默认时间
			var date = new Date();
			return util.digit(date.getFullYear()) + "-" + util.digit(date.getMonth() + 1) + "-" + util.digit(date.getDate()) + " " + util.digit(date.getHours()) + ":" + util.digit(date.getMinutes()) + ":" + util.digit(date.getSeconds());
		},
		getTransformDefaultTime: function(dateStr) {
			// 将传递过来的格式化的日期转化为默认时间
			var objTime = util.format(dateStr, "yyyy-MM-dd HH:mm:ss");
			var year = objTime.substring(0, 4);
			var month = objTime.substring(5, 7);
			var nowDay = objTime.substring(8, 10);
			var hours = objTime.substring(11, 13);
			var minutes = objTime.substring(14, 16);
			var seconds = objTime.substring(17);
			return year + "," + month + "," + nowDay + "," + hours + "," + minutes + "," + seconds;
		},
		compareDate: function(y, m, d, hh, mm, ss) {
			// 转换为new Date().getTime();来比较日期
			return new Date(y, m ? m : 00, d ? d : 00, hh ? hh : 00, mm ? mm : 00, ss ? ss : 00).getTime();
		},
		getWeek: function(year, month) {
			// 得到某年某月的第一天是周几
			var date = new Date(year, util.parseInt(month) - 1);
			var week = new Array("7", "1", "2", "3", "4", "5", "6")[date.getDay()];
			return week;
		},
		getFullDay: function(year, month) {
			// 得到某年某月的总天数
			var fullDay;
			if (month == 2) {
				fullDay = util.isLeap(year) ? 29 : 28;
			} else {
				if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
					fullDay = 31;
				} else {
					fullDay = 30;
				}
			}
			// 返回结果
			return fullDay;
		},
		isLeap: function(year) {
			// 是否是瑞年
			return (year % 4 === 0 && year % 100 !== 0) || year % 400 == 0;
		},
		removeCss: function(className) {
			// 移除引用重复的css
			var allsuspects = document.getElementsByTagName("link");
			for (var i = allsuspects.length; i >= 0; i--) {
				if (allsuspects[i] && allsuspects[i].getAttribute("href") != null && allsuspects[i].getAttribute("href").indexOf(
				className) != -1) allsuspects[i].parentNode.removeChild(allsuspects[i]);
			}
		},
		format: function(dateStr, formatStr) {
			// 日期字符串格式化
			var date = new Date(dateStr.replace(/-/g, '/').replace(/T|Z/g, ' ').trim());
			var o = {
				"M+": date.getMonth() + 1,
				"d+": date.getDate(),
				/*"h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,*/
				"H+": date.getHours(),
				// 只支持24小时制
				"m+": date.getMinutes(),
				"s+": date.getSeconds()
			};
			if (/(y+)/.test(formatStr)) {
				formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
			for (var k in o) {
				if (new RegExp("(" + k + ")").test(formatStr)) {
					formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				}
			}
			return formatStr;
		},
		festival: function(month, day) {
			// 获取节日
			var str = util.parseInt(month) + "." + util.parseInt(day);
			switch (str) {
				case '1.1':   str = '\u5143\u65e6';  break;
				case '3.8':   str = '\u5987\u5973';  break;
				case '3.12':  str = '\u690d\u6811';  break;
				case '4.5':   str = '\u6e05\u660e';  break;
				case '5.1':   str = '\u52b3\u52a8';  break;
				case '6.1':   str = '\u513f\u7ae5';  break;
				case '7.1':   str = '\u5efa\u515a';  break;
				case '8.1':   str = '\u5efa\u519b';  break;
				case '9.10':  str = '\u6559\u5e08';  break;
				case '10.1':  str = '\u56fd\u5e86';  break;
				case '11.10': str = '\u9752\u5e74';  break;
				case '12.24': str = '\u5e73\u5b89';  break;
				case '12.25': str = '\u5723\u8bde';  break;
				default:      str = day;             break;
			}
			return str;
		}
	};
})(jQuery, window, document);