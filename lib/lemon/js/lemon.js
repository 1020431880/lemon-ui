/**
 * @插件名 lemon弹出插件
 * @作用 美化弹出框、弹出层、弹出Iframe、TIPS
 * @作者 andy
 * @日期 2014-09-24
 * @Version 0.1
 */
;
(function($, window, document, undefined) {
	"use strict";
	var LE = {},
		// 所有公用函数的集合
		doc = document,
		win = window,
		zIndex = 1222,
		lemonIcons = ["0 0", "-30px 0", "-60px 0", "-90px 0", "-120px 0", "-150px 0", "-180px 0"], // 系统默认图标定位
		timeOut = null, //定时
		// alert的函数集合
		leAlert = {},
		alertOpts = {
			title: "提示", // 标题
			icon: ["", ""], // 默认图标类型0-6和为控股不显示图标，输入ohter可以自定义，尺寸在30*30
			content: "内容", // 内容
			button: ["确定", "center"], // 确定按钮自定义名称和位置，取值：left,center,right
			closeBtn: true, // 是否显示右上角关闭小图标
			skin: "lemon-alert-default", // 皮肤名称
			onClick: "", // 点击确定按钮的回调函数
			shade: [true, 0.6, "#000"], // 是否显示遮罩层并控制透明度和背景颜色
			animate: [true, 0, ""], // 是否显示元素弹出时候的动画效果和控制动画的间隔时间
			shake: [true, 90] //插件点击遮罩层抖动效果的控制
		},
		// confirm的函数集合
		leConfirm = {},
		confirmOpts = {
			title: "提示", // 标题
			icon: ["0", "icon.png"], // 默认图标类型0-1和为空不显示图标，输入ohter可以自定义，尺寸在30*30
			content: "内容", // 内容
			button: ["确定", "取消", "right"], // 确定和取消按钮的自定义名称和位置，取值：left,center,right
			closeBtn: true, // 是否显示右上角关闭小图标
			skin: "lemon-confirm-default", // 皮肤名称
			onClick: "", // 点击确定按钮的回调函数
			onClose: "", // 点击取消按钮的回调函数
			shade: [true, 0.3, "#000"], // 是否显示遮罩层并控制透明度和背景颜色
			animate: [true, 0, ""], // 是否显示元素弹出时候的动画效果和控制动画的间隔时间
			shake: [true, 90] //插件点击遮罩层抖动效果的控制
		},
		// iframe的函数集合
		leIframe = {},
		iframeOpts = {
			title: "提示", // 标题
			width: 800, // iframe的宽度
			height: 500, // iframe的高度
			url: "", // 连接的地址
			iframeid: "", // 设置打开iframe的id，必须设置
			onClose: "", // 点击关闭按钮的回调函数
			shade: [true, 0.3, "#000"], // 是否显示遮罩层并控制透明度和背景颜色
			animate: [true, 0, ""], // 是否显示元素弹出时候的动画效果和控制动画的间隔时间
			shake: [true, 90] //插件点击遮罩层抖动效果的控制
		},
		// msg提示的函数集合
		leMsg = {},
		msgOpts = {
			content: "内容",
			icon: ["", ""],
			height: 40, // 默认高度
			width: 80, // 默认宽度
			skin: "lemon-msg-default", // 皮肤名称
			style: "text-align:center;", // 自定义样式
			time: 2000, // 时间
			shade: [false, 0.3, "#000"],
			animate: [true, 0, ""],
			onClose: "" // 关闭的回调函数
		},
		// load图标函数集合
		leLoad = {},
		loadOpts = {
			icon: ["0", ""], // 加载的图标
			shade: [true, 0.3, "#fff"],
			time: 2000, // 时间
			onClose: "" // 关闭的回调函数
		},
		// layer的函数集合
		leLayer = {},
		layerOpts = {
			height: 50,
			width: 100,
			// 方向,有top,center,left,right,bottom,leftTop,rightTop,leftBottom,rightBottom,默认是中间
			align: "center",
			icon: ["0", "loading-0.gif"], // layer加载时候的小图标，也可以使用自定义图标
			content: "", // 内容
			style: "", // 自定义样式，包括背景颜色，边框等
			onClose: "", // 点击关闭按钮的回调函数
			shade: [true, 0.3, "#000"], // 是否显示遮罩层并控制透明度和背景颜色
			animate: [true, 0, ""], // 是否显示元素弹出时候的动画效果和控制动画的间隔时间
			time: 0, // 设置定时关闭的时间,默认不关闭
			closeBtn: false //是否显示右上角关闭图标按钮
		},
		// tips的函数集合
		leTips = {},
		tipsOpts = {
			animate: [true, 200], // 是否淡入淡出动画和动画的时间
			bgColor: "#0099CC", // 背景颜色
			defaultTitle: "lemon-tip提示" // 默认提示内容

		};
	/**
	 * lemon插件
	 */
	jQuery.lemon = {
		version: "0.1",
		alert: function(settings) {
			var opts = $.extend({}, alertOpts, settings);
			leAlert.init(opts);
		},
		confirm: function(settings) {
			var opts = $.extend({}, confirmOpts, settings);
			leConfirm.init(opts);
		},
		iframe: function(settings) {
			var opts = $.extend({}, iframeOpts, settings);
			leIframe.init(opts);
		},
		closeIframe: function(iframeid) {
			leIframe.closeIframe(iframeid);
		},
		msg: function(settings) {
			var opts = $.extend({}, msgOpts, settings);
			leMsg.init(opts);
		},
		load: function(settings) {
			var opts = $.extend({}, loadOpts, settings);
			leLoad.init(opts);
		},
		layer: function(settings) {
			var opts = $.extend({}, layerOpts, settings);
			leLayer.init(opts);
		},
		tips: function(settings) {
			var opts = $.extend({}, tipsOpts, settings);
			tipsOpts = opts; // 设置用户设置的属性
		}
	};

	/*******************************************************************alert*******************************************************************/
	/**
	 * alert初始化
	 */
	leAlert.init = function(opts) {
		// alert渲染
		$("#lemon-shade,#lemon-alert").remove();
		var leHtml = "<div id='lemon-shade' class='lemon-shade animated fadeIn middle' style='display:" + (opts.shade[0] ? "block" : "none") + ";opacity:" + (opts.shade[1] ? opts.shade[1] : 0.3) + ";background-color:" + (opts.shade[2] ? opts.shade[2] : "#000") + ";' unselectable='on' onselectstart='return false;'></div><div id='lemon-alert' style='z-index:" + (zIndex++) + ";' class='lemon-alert " + opts.skin + "' unselectable='on'  onselectstart='return false;'><div class='head'>" + opts.title + "</div><span class='head-close' style='display:" + (opts.closeBtn ? "block" : "none") + ";'></span><div class='content'><span class='content-icon'></span>" + opts.content + "</div><div class='bottom' style='text-align:" + opts.button[1] + ";'><input type='button' class='bottom-btn' value='" + opts.button[0] + "'/></div></div>";
		$("body").append(leHtml);
		// 设置icon图标
		LE.setIcons(opts, null);
		// 设定位置
		leAlert.resize(opts, "#lemon-alert");
		// 插件弹出特效
		LE.animate(opts, "#lemon-alert");
		// 插件点击拖动
		LE.move(opts, "." + opts.skin + " .head", "#lemon-alert");
		// 点击关闭小图标事件
		$("." + opts.skin + " .head-close").bind("click", function() {
			LE.close("#lemon-alert");
		});
		// 点击确定按钮事件
		$("." + opts.skin + " .bottom-btn").bind("click", function() {
			LE.close("#lemon-alert");
			if(opts.onClick != "" && typeof opts.onClick == "function") {
				opts.onClick();
			}
		});
	};
	/**
	 * alert窗口改变
	 */
	leAlert.resize = function(opts, elem) {
		leAlert.align(opts, elem);
		$(win).resize(function(e) {
			leAlert.align(opts, elem);
		});
	};
	/**
	 * alert定位
	 */
	leAlert.align = function(opts, elem) {
		// 计算位置
		var winHeight = $(win).height();
		var winWidth = $(win).width();
		var elemHeight = $(elem).height();
		var elemWidth = $(elem).width();
		var top = (util.parseInt(winHeight) - util.parseInt(elemHeight)) / 2;
		var left = (util.parseInt(winWidth) - util.parseInt(elemWidth)) / 2;
		// 设置位置
		$(elem).css({
			"top": top + "px",
			"left": left + "px"
		});
		// 控制遮罩层和抖动特效
		LE.shade(opts, elem);
	};

	/*******************************************************************confirm*******************************************************************/
	/**
	 * confirm初始化
	 */
	leConfirm.init = function(opts) {
		// 渲染confirm
		$("#lemon-shade,#lemon-confirm").remove();
		var leHtml = "<div id='lemon-shade' class='lemon-shade' style='display:" + (opts.shade[0] ? "block" : "none") + ";opacity:" + (opts.shade[1] ? opts.shade[1] : 0.3) + ";background-color:" + (opts.shade[2] ? opts.shade[2] : "#000") + ";' unselectable='on' onselectstart='return false;'></div><div id='lemon-confirm' style='z-index:" + (zIndex++) + ";' class='lemon-confirm " + opts.skin + "' unselectable='on'  onselectstart='return false;'><div class='head'>" + opts.title + "</div><span class='head-close' style='display:" + (opts.closeBtn ? "block" : "none") + ";'></span><div class='content'><span class='content-icon'></span>" + opts.content + "</div><div class='bottom' style='text-align:" + (opts.button[2]) + ";'><input type='button' class='bottom-btn-ok' value='" + opts.button[0] + "'/><input type='button'  class='bottom-btn-no' value='" + opts.button[1] + "'/></div></div>";
		$("body").append(leHtml);
		// 设置icon图标
		LE.setIcons(opts, null);
		// 设定位置
		leConfirm.resize(opts, "#lemon-confirm");
		// 插件弹出特效
		LE.animate(opts, "#lemon-confirm");
		// 插件点击拖动
		LE.move(opts, "." + opts.skin + " .head", "#lemon-confirm");

		// 点击关闭小图标事件
		$("." + opts.skin + " .head-close").bind("click", function() {
			LE.close("#lemon-confirm");
		});
		// 点击确定按钮事件
		$(".bottom-btn-ok").bind("click", function() {
			LE.close("#lemon-confirm");
			if(opts.onClick != "" && typeof opts.onClick == "function") {
				opts.onClick();
			}
		});
		// 点击取消按钮事件
		$("." + opts.skin + " .bottom-btn-no").bind("click", function() {
			LE.close("#lemon-confirm");
			if(opts.onClose != "" && typeof opts.onClose == "function") {
				opts.onClose();
			}
		});
	};
	/**
	 * confirm窗口改变
	 */
	leConfirm.resize = function(opts, elem) {
		leAlert.align(opts, elem);
		$(win).resize(function(e) {
			leAlert.align(opts, elem);
		});
	};
	/**
	 * confirm定位
	 */
	leConfirm.align = function(opts, elem) {
		// 计算位置
		var winHeight = $(win).height();
		var winWidth = $(win).width();
		var elemHeight = $(elem).height();
		var elemWidth = $(elem).width();
		var top = (util.parseInt(winHeight) - util.parseInt(elemHeight)) / 2;
		var left = (util.parseInt(winWidth) - util.parseInt(elemWidth)) / 2;
		// 设置位置
		$(elem).css({
			"top": top + "px",
			"left": left + "px"
		});
		// 控制遮罩层和抖动特效
		LE.shade(opts, elem);
	};

	/*******************************************************************iframe*******************************************************************/
	/**
	 * iframe初始化
	 */
	leIframe.init = function(opts) {
		// 渲染iframe
		if(opts.iframeid == "" || opts.iframeid == "undefined") {
			$.lemon.alert({
				icon: ["0"],
				content: "请先设置iframeid属性!"
			});
			return;
		}
		var elemId = "lemon-iframe-" + opts.iframeid;
		$("#" + elemId).remove(); // 清除iframe
		var leHtml = "<div id='lemon-shade' class='lemon-shade' style='display:" + (opts.shade[0] ? "block" : "none") + ";opacity:" + (opts.shade[1] ? opts.shade[1] : 0.3) + ";background-color:" + (opts.shade[2] ? opts.shade[2] : "#000") + ";' unselectable='on' onselectstart='return false;'></div><div id='" + elemId + "' style='height:" + opts.height + "px;width:" + opts.width + "px;z-index:" + (zIndex++) + ";' class='lemon-iframe' unselectable='on' onselectstart='return false;'><div class='head'>" + opts.title + "</div><span class='head-min'><span></span></span><span class='head-max-before'></span><span class='head-max-after'></span><span class='head-close'></span><div class='content'><iframe id='" + opts.iframeid + "' align='top' src='" + opts.url + "' width='100%' height='" + (opts.height - 43) + "' marginheight='0' marginwidth='0' hspeace='0' vspace='0' frameborder='0' scrolling='auto'></iframe></div></div>";
		$("body").append(leHtml);

		// 设定位置
		leIframe.resize(opts, "#" + elemId);
		// 插件弹出特效
		LE.animate(opts, "#" + elemId);
		// 插件点击拖动
		LE.move(opts, "#" + elemId + " .head", "#" + elemId);

		// 点击关闭小图标事件
		$("#" + elemId + " .head-close").bind("click", function() {
			LE.close("#lemon-shade,#" + elemId);
			if(opts.onClose != "" && typeof opts.onClose == "function") {
				opts.onClose();
			}
		});
		// 点击最小化图标事件
		$("#" + elemId + " .head-min").bind("click", function() {
			leIframe.min(opts, "#" + elemId);
		});
		// 点击最大化before事件
		$("#" + elemId + " .head-max-before").bind("click", function() {
			leIframe.maxBefore(opts, "#" + elemId);
		});
		// 点击最大化after事件
		$("#" + elemId + " .head-max-after").bind("click", function() {
			leIframe.maxAfter(opts, "#" + elemId);
		});
	};
	/**
	 * iframe窗口最小化的点击
	 */
	leIframe.min = function(opts, elem) {
		// 隐藏缩小图标并改变展示样式
		$(elem + " .head-min," + elem + " .content").hide();
		$(elem + " .head").css("border-bottom", "none")

		// 隐藏maxBefore图标，展示maxAfter图标
		$(elem + " .head-max-before").hide();
		$(elem + " .head-max-after").show();
		// 文字过长则用小数点表示
		var title = opts.title.length > 8 ? (opts.title.substring(0, 8) + "…") : opts.title;
		$(elem + " .head").text(title);
		$(elem).css({
			"height": "42px",
			"width": "230px"
		});
	}
	/**
	 * iframe窗口最大化之前的点击
	 */
	leIframe.maxBefore = function(opts, elem) {
		$(elem).css({
			"height": $(win).height() + "px",
			"width": $(win).width() + "px",
			"top": "0px",
			"left": "0px",
			"right": "0px",
			"bottom": "0px"
		});
		$(elem + " .head").css("border-bottom", "solid 1px #eee")
		// 展示max-before
		$(elem + " .head-max-after").show();
		$(elem + " .head-min").hide();
		$(elem + " .head-max-before").hide();
		$(elem + " .head").text(opts.title); // 最大化后展示完整的title

		// 放大时候iframe也跟着放大
		$(elem + " iframe").height($(win).height() - 43);
		$(elem + " iframe").width($(win).width());
	}
	/**
	 * iframe窗口最大化之后的点击
	 */
	leIframe.maxAfter = function(opts, elem) {
		$(elem).css({
			"height": opts.height + "px",
			"width": opts.width + "px",
		});
		// 展示max-before
		$(elem + " .head-max-after").hide();
		$(elem + " .head-min").show();
		$(elem + " .head-max-before").show();
		$(elem + " .head").css("border-bottom", "solid 1px #eee")
		$(elem + " .head-min," + elem + " .content").show();
		// 放大After后iframe也跟着缩小
		$(elem + " iframe").height(opts.height - 43);
		$(elem + " iframe").width(opts.width);
		$(elem + " .head").text(opts.title); // 最大化后展示完整的title
		// 居中显示
		leIframe.align(opts, elem);
	}
	/**
	 * iframe窗口改变
	 */
	leIframe.resize = function(opts, elem) {
		leIframe.align(opts, elem);
		$(win).resize(function(e) {
			leIframe.align(opts, elem);
		});
	};
	/**
	 * iframe定位
	 */
	leIframe.align = function(opts, elem) {
		// 计算位置
		var winHeight = $(win).height();
		var winWidth = $(win).width();
		var elemHeight = $(elem).height();
		var elemWidth = $(elem).width();
		var top = (util.parseInt(winHeight) - util.parseInt(elemHeight)) / 2;
		var left = (util.parseInt(winWidth) - util.parseInt(elemWidth)) / 2;
		// 设置位置
		$(elem).css({
			"top": top + "px",
			"left": left + "px"
		});
		// 控制遮罩层和抖动特效
		LE.shade(opts, elem);
	};
	/**
	 * 调用关闭iframe方法
	 */
	leIframe.closeIframe = function(iframeid) {
		$(window.parent.document).find("#lemon-iframe-" + iframeid).fadeOut(200, function() {
			$(this).remove();
		});
	};
	/*******************************************************************layer*******************************************************************/
	/**
	 *layer初始化
	 */
	leLayer.init = function(opts, elem) {
		// 渲染layer
		$("#lemon-shade,#lemon-layer").remove();
		var leHtml = "<div id='lemon-shade' class='lemon-shade' style='display:" + (opts.shade[0] ? "block" : "none") + ";opacity:" + (opts.shade[1] ? opts.shade[1] : 0.3) + ";background-color:" + (opts.shade[2] ? opts.shade[2] : "#000") + ";' unselectable='on' onselectstart='return false;'></div><div id='lemon-layer' style='" + opts.style + ";height:" + opts.height + "px;width:" + opts.width + "px;' class='lemon-layer'><span class='lemon-layer-icon' style='display:" + (opts.closeBtn ? "block" : "none") + ";'></span><div class='content'>" + opts.content + "</div></div>";
		$("body").append(leHtml);
		// 设定位置
		leLayer.resize(opts, "#lemon-layer");
		// 插件弹出特效
		LE.animate(opts, "#lemon-layer");
		// 点击关闭按钮关闭
		$(".lemon-layer-icon").bind("click", function() {
			LE.close("#lemon-layer");
			if(opts.onClose != "" && typeof opts.onClose == "function") {
				opts.onClose();
			}
		});
		// 定时关闭
		clearTimeout(timeOut);
		timeOut = setTimeout(function() {
			LE.close("#lemon-lajyer");
			// 关闭的回调函数
			if(opts.onClose != "" && typeof opts.onClose == "function") {
				opts.onClose();
			}
		}, opts.time);

	};
	/**
	 * confirm窗口改变
	 */
	leLayer.resize = function(opts, elem) {
		leLayer.align(opts, elem);
		$(win).resize(function(e) {
			leLayer.align(opts, elem);
		});
	};
	/**
	 *layer定位
	 */
	leLayer.align = function(opts, elem) {
		// 计算位置
		var winHeight = $(win).height();
		var winWidth = $(win).width();
		var elemHeight = $(elem).outerHeight();
		var elemWidth = $(elem).outerWidth();
		var top = (util.parseInt(winHeight) - util.parseInt(elemHeight)) / 2;
		var left = (util.parseInt(winWidth) - util.parseInt(elemWidth)) / 2;
		// 设置位置
		if(opts.align == "top") {
			$(elem).css({
				"top": (opts.closeBtn ? "15" : "0") + "px",
				"left": left + "px"
			});
		} else if(opts.align == "bottom") {
			$(elem).css({
				"top": (util.parseInt(winHeight) - util.parseInt(elemHeight)) + "px",
				"left": left + "px"
			});
		} else if(opts.align == "left") {
			$(elem).css({
				"top": top + "px",
				"left": "0px"
			});
		} else if(opts.align == "right") {
			$(elem).css({
				"top": top + "px",
				"left": (opts.closeBtn ? (util.parseInt(winWidth) - util.parseInt(elemWidth)) - 15 : (util.parseInt(winWidth) - util.parseInt(elemWidth))) + "px"
			});
		} else if(opts.align == "center") {
			$(elem).css({
				"top": top + "px",
				"left": left + "px"
			});
		} else if(opts.align == "left-top") {
			$(elem).css({
				"top": (opts.closeBtn ? "15" : "0") + "px",
				"left": "0px"
			});
		} else if(opts.align == "left-bottom") {
			$(elem).css({
				"top": (util.parseInt(winHeight) - util.parseInt(elemHeight)) + "px",
				"left": "0px"
			});
		} else if(opts.align == "right-top") {
			$(elem).css({
				"top": (opts.closeBtn ? "15" : "0") + "px",
				"left": (opts.closeBtn ? (util.parseInt(winWidth) - util.parseInt(elemWidth)) - 15 : (util.parseInt(winWidth) - util.parseInt(elemWidth))) + "px"
			});
		} else if(opts.align == "right-bottom") {
			$(elem).css({
				"top": (util.parseInt(winHeight) - util.parseInt(elemHeight)) + "px",
				"left": (opts.closeBtn ? (util.parseInt(winWidth) - util.parseInt(elemWidth)) - 15 : (util.parseInt(winWidth) - util.parseInt(elemWidth))) + "px"
			});
		}

		// 控制遮罩层和抖动特效
		LE.shade(opts, elem);
	};

	/*******************************************************************msg*******************************************************************/
	/**
	 *msg初始化
	 */
	leMsg.init = function(opts, elem) {
		// 渲染msg
		$("#lemon-shade,#lemon-msg").remove();
		var leHtml = "<div id='lemon-shade' class='lemon-shade' style='display:" + (opts.shade[0] ? "block" : "none") + ";opacity:" + (opts.shade[1] ? opts.shade[1] : 0.3) + ";background-color:" + (opts.shade[2] ? opts.shade[2] : "#000") + ";' unselectable='on' onselectstart='return false;'></div><div  unselectable='on' onselectstart='return false;' id='lemon-msg' style='" + opts.style + "; height:" + opts.height + "px;line-height:" + opts.height + "px;width:" + opts.width + "px;' class='lemon-msg " + opts.skin + "'><div class='content'><span class='content-icon'></span>" + opts.content + "</div></div>";
		$("body").append(leHtml);
		// 图标距离顶部的距离
		var top = ($("#lemon-msg").outerHeight() - 30) / 2;
		var elemHeight = $("#lemon-msg").height();
		// 设置icon图标
		if(opts.icon[0] != "" && typeof opts.icon[0] != "undefined") {
			if(opts.icon[0] == "others") {
				// 自定义图标
				$("." + opts.skin + " .content .content-icon").css({
					"background": "url(" + opts.icon[1] + ") no-repeat",
					"top": top + "px"
				}).show();
				$("." + opts.skin + " .content").css({
					"padding-left": "40px",
					"text-align": "center"
				});
			} else {
				$("." + opts.skin + " .content .content-icon").css({
					"background": "url(" + util.getPath() + "images/icon.png) no-repeat",
					"background-position": lemonIcons[opts.icon[0]],
					"top": top + "px"
				}).show();
				$("." + opts.skin + " .content").css({
					"padding-left": "40px",
					"text-align": "center"
				});
			}
		}
		// 设定位置
		leMsg.resize(opts, "#lemon-msg");
		// 插件弹出特效
		LE.animate(opts, "#lemon-msg");
		// 定时关闭
		clearTimeout(timeOut);
		timeOut = setTimeout(function() {
			LE.close("#lemon-msg");
			// 关闭的回调函数
			if(opts.onClose != "" && typeof opts.onClose == "function") {
				opts.onClose();
			}
		}, opts.time);
	};
	/**
	 * msg窗口改变
	 */
	leMsg.resize = function(opts, elem) {
		leMsg.align(opts, elem);
		$(win).resize(function(e) {
			leMsg.align(opts, elem);
		});
	};
	/**
	 *msg定位
	 */
	leMsg.align = function(opts, elem) {
		// 计算位置
		var winHeight = $(win).height();
		var winWidth = $(win).width();
		var elemHeight = $(elem).height();
		var elemWidth = $(elem).width();
		var top = (util.parseInt(winHeight) - util.parseInt(elemHeight)) / 2;
		var left = (util.parseInt(winWidth) - util.parseInt(elemWidth)) / 2;
		// 设置位置
		$(elem).css({
			"top": top + "px",
			"left": left + "px"
		});
		// 控制遮罩层和抖动特效
		LE.shade(opts, elem);
	};
	/*******************************************************************load*******************************************************************/
	/**
	 *load初始化
	 */
	leLoad.init = function(opts, elem) {
		// 渲染msg
		$("#lemon-shade,#lemon-load").remove();
		var leHtml = "<div id='lemon-shade' class='lemon-shade' style='display:" + (opts.shade[0] ? "block" : "none") + ";opacity:" + (opts.shade[1] ? opts.shade[1] : 0.3) + ";background-color:" + (opts.shade[2] ? opts.shade[2] : "#000") + ";' unselectable='on' onselectstart='return false;'></div><div id='lemon-load' style='margin:0px;padding:0px;' class='lemon-load'><span class='lemon-load-icon'><img src='" + (opts.icon[0] != "other" ? (util.getPath() + "images/loading-" + opts.icon[0] + ".gif") : opts.icon[1]) + "'/></span></div>";
		$("body").append(leHtml);
		// 设定位置
		leLoad.resize(opts, "#lemon-load");
		// 定时关闭
		clearTimeout(timeOut);
		timeOut = setTimeout(function() {
			LE.close("#lemon-load");
			// 关闭的回调函数
			if(opts.onClose != "" && typeof opts.onClose == "function") {
				opts.onClose();
			}
		}, opts.time);
	};
	/**
	 * msg窗口改变
	 */
	leLoad.resize = function(opts, elem) {
		leLoad.align(opts, elem);
		$(win).resize(function(e) {
			leLoad.align(opts, elem);
		});
	};
	/**
	 *msg定位
	 */
	leLoad.align = function(opts, elem) {
		// 计算位置
		var winHeight = $(win).height();
		var winWidth = $(win).width();
		var elemHeight = $(elem).height();
		var elemWidth = $(elem).width();
		var top = (util.parseInt(winHeight) - util.parseInt(elemHeight)) / 2;
		var left = (util.parseInt(winWidth) - util.parseInt(elemWidth)) / 2;
		// 设置位置
		$(elem).css({
			"top": top + "px",
			"left": left + "px"
		});
	};

	/*******************************************************************tips*******************************************************************/
	/**
	 * tips提示
	 */
	jQuery(doc).ready(function() {
		$(".lemon-tips").hover(function(e) {
			// 初始化tips提示
			leTips.init(tipsOpts, this, e);
		}, function() {
			// 移除tips提示
			leTips.mouseOut(tipsOpts);
		});
	});
	/**
	 *tips初始化
	 */
	leTips.init = function(opts, elem, e) {
		// 获得元素属性和值
		var content = $(elem).attr("lemon-tips-title") ? $(elem).attr("lemon-tips-title") : opts.defaultTitle; // 提示内容
		var align = $(elem).attr("lemon-tips-align") ? $(elem).attr("lemon-tips-align") : "top"; // 展示的位置，分top,bottom,left,right, 默认top
		// 渲染tips
		$("#lemon-tip").remove();
		var leHtml = "<div id='lemon-tip' class='lemon-tip' style='background-color:" + opts.bgColor + ";' unselectable='on' onselectstart='return false;'><span class='lemon-tip-role'></span>" + content + "</div>";
		$("body").append(leHtml);

		// 定位
		leTips.align(opts, elem, "#lemon-tip", e, align);
	};
	/**
	 *tips移除
	 */
	leTips.mouseOut = function(opts, elem) {
		// 是否淡入淡出特效
		if(opts.animate[0]) {
			$("#lemon-tip").fadeOut(opts.animate[1], function() {
				$(this).remove();
			});
		} else {
			$("#lemon-tip").remove();
		}
	};
	/**
	 *tips定位
	 */
	leTips.align = function(opts, elem, tipElem, e, align) {
		var event = e || window.event;
		// 计算位置
		var elemHeight = $(elem).outerHeight();
		var elemWidth = $(elem).outerWidth();
		var tipElemHeight = $(tipElem).outerHeight();
		var tipElemWidth = $(tipElem).outerWidth();
		var elemOffset = $(elem).offset();

		// 设置位置和三角小图标定位
		if(align == "top") {
			$(tipElem).css({
				"top": (elemOffset.top - tipElemHeight - 8) + "px",
				"left": e.pageX - 15 + "px"
			});
			$(".lemon-tip .lemon-tip-role").css({
				"top": (tipElemHeight - 3) + "px",
				"left": "5px",
				"border-top-color": opts.bgColor
			});
		} else if(align == "bottom") {
			$(tipElem).css({
				"top": (elemOffset.top + tipElemHeight - 8) + "px",
				"left": e.pageX - 15 + "px"
			});
			$(".lemon-tip .lemon-tip-role").css({
				"top": "-13px",
				"left": "5px",
				"border-bottom-color": opts.bgColor
			});
		} else if(align == "left") {
			$(tipElem).css({
				"top": elemOffset.top + "px",
				"left": (elemOffset.left - tipElemWidth - 8) + "px"
			});
			$(".lemon-tip .lemon-tip-role").css({
				"top": "5px",
				"right": "-13px",
				"border-left-color": opts.bgColor
			});
		} else if(align == "right") {
			$(tipElem).css({
				"top": (elemOffset.top) + "px",
				"left": (elemOffset.left + elemWidth + 8) + "px"
			});
			$(".lemon-tip .lemon-tip-role").css({
				"top": "5px",
				"left": "-13px",
				"border-right-color": opts.bgColor
			});
		}

		// 是否淡入淡出特效
		if(opts.animate[0]) {
			$(tipElem + ",.lemon-tip-role").fadeIn(opts.animate[1]);
		} else {
			$(tipElem + ",.lemon-tip-role").show();
		}
	};
	/*******************************************************************公用LE的函数*******************************************************************/
	/**
	 * 插件弹出特效
	 */
	LE.animate = function(opts, elem) {
		// 控制是否弹出特效
		if(opts.animate[0]) {
			if(opts.animate[1] == 0) {
				// 特效0
				LE.animateIn0(opts, elem);
			} else if(opts.animate[1] == 1) {
				// 特效1
				LE.animateIn1(opts, elem);
			} else if(opts.animate[1] == 2) {
				// 特效2
				LE.animateIn2(opts, elem);
			} else if(opts.animate[1] == 3) {
				// 特效3
				LE.animateIn3(opts, elem);
			} else if(opts.animate[1] == 4) {
				// 特效4
				LE.animateIn4(opts, elem);
			} else if(opts.animate[1] == 5) {
				// 特效5
				LE.animateIn5(opts, elem);
			} else if(opts.animate[1] == 6) {
				// 特效6
				LE.animateIn6(opts, elem);
			} else if(opts.animate[1] == 7) {
				// 特效7
				LE.animateIn7(opts, elem);
			}
		} else {
			// 无特效直接显示
			$(elem).show();
		}
	};
	/**
	 *插件弹入特效0-zoomIn
	 */
	LE.animateIn0 = function(opts, elem) {
		// 动画特效实现

		$(elem).removeClass("animated zoomIn").addClass("animated zoomIn").css({
			"-webkit-animation-duration": opts.animate[2] ? opts.animate[2] : "0.2s",
			"animation-duration": opts.animate[2] ? opts.animate[2] : "0.2s"
		});
	};
	/**
	 *插件弹入特效1-rollIn
	 */
	LE.animateIn1 = function(opts, elem) {
		// 动画特效实现
		$(elem).removeClass("animated rollIn").addClass("animated rollIn").css({
			"-webkit-animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.3s",
			"animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.3s"
		});
	};
	/**
	 *插件弹入特效2-slideInLeft
	 */
	LE.animateIn2 = function(opts, elem) {
		// 动画特效实现
		$(elem).removeClass("animated slideInLeft").addClass("animated slideInLeft").css({
			"-webkit-animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.5s",
			"animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.5s"
		});
	};
	/**
	 *插件弹入特效3-slideInDown
	 */
	LE.animateIn3 = function(opts, elem) {
		// 动画特效实现
		$(elem).removeClass("animated slideInDown").addClass("animated slideInDown").css({
			"-webkit-animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.5s",
			"animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.5s"
		});
	};
	/**
	 *插件弹入特效4-flipInX
	 */
	LE.animateIn4 = function(opts, elem) {
		// 动画特效实现
		$(elem).removeClass("animated flipInX").addClass("animated flipInX").css({
			"-webkit-animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.5s",
			"animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.5s"
		});
	};

	/**
	 *插件弹入特效5-flipInY
	 */
	LE.animateIn5 = function(opts, elem) {
		// 动画特效实现
		$(elem).removeClass("animated flipInY").addClass("animated flipInY").css({
			"-webkit-animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.5s",
			"animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.5s"
		});
	};
	/**
	 *插件弹入特效6-fadeInDown
	 */
	LE.animateIn6 = function(opts, elem) {
		// 动画特效实现
		$(elem).removeClass("animated fadeInDown").addClass("animated fadeInDown").css({
			"-webkit-animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.5s",
			"animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.5s"
		});
	};
	/**
	 *插件弹入特效7-fadeInUp
	 */
	LE.animateIn7 = function(opts, elem) {
		// 动画特效实现
		$(elem).removeClass("animated fadeInUp").addClass("animated fadeInUp").css({
			"-webkit-animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.5s",
			"animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.5s"
		});
	};
	/**
	 *插件弹出特效0-fadeOut
	 */
	LE.animateOut0 = function(opts, elem) {
		// 动画特效实现
		$(elem).removeClass("animated fadeOut").addClass("animated fadeOut").css({
			"-webkit-animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.7s",
			"animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.7s"
		});
	};
	/**
	 *插件弹出特效1-fadeOutDown
	 */
	LE.animateOut1 = function(opts, elem) {
		// 动画特效实现
		$(elem).removeClass("animated fadeOutDown").addClass("animated fadeOutDown").css({
			"-webkit-animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.7s",
			"animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.7s"
		});
	};

	/**
	 *插件弹出特效2-fadeOutUp
	 */
	LE.animateOut2 = function(opts, elem) {
		// 动画特效实现
		$(elem).removeClass("animated fadeOutUp").addClass("animated fadeOutUp").css({
			"-webkit-animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.7s",
			"animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.7s"
		});
	};
	/**
	 *插件弹出特效3-fadeOutLeft
	 */
	LE.animateOut3 = function(opts, elem) {
		// 动画特效实现
		$(elem).removeClass("animated fadeOutLeft").addClass("animated fadeOutLeft").css({
			"-webkit-animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.7s",
			"animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.7s"
		});
	};
	/**
	 *插件弹出特效4-fadeOutRight
	 */
	LE.animateOut4 = function(opts, elem) {
		// 动画特效实现
		$(elem).removeClass("animated fadeOutRight").addClass("animated fadeOutRight").css({
			"-webkit-animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.7s",
			"animation-duration": opts.animate[2] == "" ? opts.animate[2] : "0.7s"
		});
	};
	/**
	 * 应用系统默认图标
	 */
	LE.setIcons = function(opts, elem) {
		if(opts.icon[0] != "" && typeof opts.icon[0] != "undefined") {
			if(opts.icon[0] == "others") {
				// 自定义图标
				$("." + opts.skin + " .content .content-icon").css({
					"background": "url(" + opts.icon[1] + ") no-repeat",
				}).show();
				$("." + opts.skin + " .content").css({
					"padding-left": "40px"
				});
			} else {
				$("." + opts.skin + " .content .content-icon").css({
					"background": "url(" + util.getPath() + "images/icon.png) no-repeat",
					"background-position": lemonIcons[opts.icon[0]],
				}).show();
				$("." + opts.skin + " .content").css({
					"padding-left": "40px"
				});
			}
		}
	};
	/**
	 * 控制遮罩层和抖动特效
	 */
	LE.shade = function(opts, elem) {
		if(opts.shade[0]) {
			$("#lemon-shade").unbind("click").bind("click", function() {
				// 是否开启盒子抖动效果
				LE.shake(opts, elem);
			});
		}
	};
	/**
	 * 插件点击遮罩层抖动特效
	 */
	LE.shake = function(opts, elem) {
		var ske = $(elem);
		var offset = ske.offset();

		if(opts.shake[0]) {
			// 不处于动画中执行，可以防止重复执行动画
			if(!ske.is(":animated")) {
				for(var i = 1; 4 >= i; i++) {
					ske.animate({
						left: offset.left - (12 - 3 * i)
					}, opts.shake[1] ? opts.shake[1] : 90);
					ske.animate({
						left: offset.left + 2 * (12 - 3 * i)
					}, opts.shake[1] ? opts.shake[1] : 90);
				}
			}
		}
	};
	/**
	 * 关闭遮罩层，关闭多个元素中间用逗号分开
	 */
	LE.close = function(args) {
		$("#lemon-shade," + args).removeClass("animated").fadeOut(500, function() {
			$(this).remove();
		});
	};
	/**
	 * 插件点击拖动
	 */
	LE.move = function(opts, moveElem, elem) {
		var tempDiv = "#temp_div",
			isDrag = false,
			disX = 0,
			disY = 0;
		// 拖拽对象按下的事件
		$(moveElem).mousedown(function(e) {
			var event = e || window.event;
			var divHtml = "<div id='temp_div' for='" + elem + "' onselectstart='return false;' style='z-index:" + (zIndex++) + ";position:absolute;border:3px solid #666; border:3px solid rgba(0,0,0,.5); cursor:move;background-color:#fff;background-color:rgba(255,255,255,.3);filter:alpha(opacity=30)'></div>";
			$("body").append(divHtml);
			var lemonElem = $(tempDiv).attr("for"); // 重新获得正在移动的对象
			isDrag = true; // 可拖动
			// 添加可预览div的样式
			$(tempDiv).css({
				"height": $(lemonElem).height() - 6 + "px",
				"width": $(lemonElem).width() - 6 + "px",
				"top": $(lemonElem).offset().top + "px",
				"left": $(lemonElem).offset().left + "px"
			});
			// 计算初始的位置坐标
			disX = event.pageX - $(tempDiv).offset().left;
			disY = event.pageY - $(tempDiv).offset().top;
		});
		// 鼠标移动事件
		$(doc).mousemove(function(e) {
			if(isDrag) {
				var lemonElem = $(tempDiv).attr("for"); // 重新获得正在移动的对象
				var event = e || window.event;
				var pageX = event.pageX - disX;
				var pageY = event.pageY - disY;
				var maxX = $(doc).width() - $(lemonElem).width();
				var maxY = $(doc).height() - $(lemonElem).height();

				// 计算移动的位置坐标
				pageX <= 0 && (pageX = 0);
				pageX >= maxX && (pageX = maxX);
				pageY <= 0 && (pageY = 0);
				pageY >= maxY && (pageY = maxY);
				// 设置移动时候预览div的位置
				$(tempDiv).css({
					"top": pageY + "px",
					"left": pageX + "px"
				});
			}
		});
		// 鼠标按起事件
		$(doc).mouseup(function(e) {
			var event = e || window.event;
			isDrag = false;
			var lemonElem = $(tempDiv).attr("for"); // 重新获得正在移动的对象
			var tempOffset = $(tempDiv).offset(),
				top, left;
			if(typeof tempOffset != "undefined") {
				top = tempOffset.top;
				left = tempOffset.left;
			}
			$(lemonElem).css({
				"top": top + "px",
				"left": left + "px",
				"width": $(tempDiv).width() + 6 + "px",
				"height": $(tempDiv).height() + 6 + "px",
				"position": "absolute",
				"z-index": $(tempDiv).css("z-index")
			});
			// 移动完成后移除tempDiv并禁止拖动
			$(tempDiv).remove();

			// 设置当前的一些事件为null
			doc.onmousedown = null;
			doc.onmousemove = null;
			doc.onmouseup = null;
		});
	};
	/**
	 * 常用的工具类
	 */
	var util = {
		getPath: function() {
			// 获得插件所在的路径
			var script = doc.scripts || doc.getElementsByTagName("script");
			var path;
			for(var i = script.length; i > 0; i--) {
				if(script[i - 1].src.indexOf("lemon") > -1) {
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
		removeCss: function(className) {
			// 移除引用重复的css
			var allsuspects = doc.getElementsByTagName("link");
			for(var i = allsuspects.length; i >= 0; i--) {
				if(allsuspects[i] && allsuspects[i].getAttribute("href") != null && allsuspects[i].getAttribute("href").indexOf(
						className) != -1) allsuspects[i].parentNode.removeChild(allsuspects[i]);
			}
		}
	};
})(jQuery, window, document);