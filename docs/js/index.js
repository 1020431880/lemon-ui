$(function() {
	setIframeHeight();
	$(window).resize(function() {
		setIframeHeight();
	});

	// 控制顶部菜单的显示和隐藏
	$(".lemonui-header .menu-slider").click(function() {
		if($(".header-navbar .navbar-menu").is(":hidden")) {
			$(".header-navbar .navbar-menu").stop(false, true).slideDown(300);
		} else {
			$(".header-navbar .navbar-menu").stop(false, true).slideUp(300);
		}
	});

	// 顶部点击过记录点击的背景
	var list = $(".header-navbar .navbar-menu ul li a");
	list.click(function() {
		$(".navbar-menu-hover").css("color", "#F2F2F2").removeClass("navbar-menu-hover");
		$(this).css("color", "#fff").addClass("navbar-menu-hover");
	});

	// 左侧菜单点击记录点击的背景
	var menuList = $(".main-menu .menu-module ul li");
	menuList.click(function() {
		$(".main-menu .menu-module ul li").removeClass("menu-module-hover");
		$(this).addClass("menu-module-hover");
	});

	// 子菜单显示和隐藏
	$(".menu-module .module-name").click(function() {
		if($(this).next().is(":hidden")) {
			$(this).next().stop(true).slideDown(300);
		} else {
			$(this).next().stop(true).slideUp(300);
		}
	});

});
/**
 * 主页面高度
 */
function setIframeHeight() {
	$(".lemonui-main").height($(window).height() - 50);
	// 判断浏览器宽度大于768小分辨率时候，则自动显示出来顶部菜单
	if($(window).width() > 768) {
		$(".header-navbar .navbar-menu").show();
	}
}

/**
 * 点击导航栏的连接显示主页面菜单
 * flag: 1：CSS，2：Web组件，3：Js插件
 */
function controlMenu(flag) {

	if(flag == 0) {
		$(".lemonui-main .main-menu").css("display", "none");
		$(".lemonui-main .main-content").css({
			"margin-left": "0px"
		});
		$(".menu-css-module").hide();
		$(".menu-web-module").hide();
		$(".menu-js-module").hide();
	}
	if(flag == 1) {
		// 显示左侧菜单
		$(".lemonui-main .main-menu").css("display", "block");
		$(".lemonui-main .main-content").css({
			"margin-left": "210px"
		});
		$(".menu-css-module").show();
		$(".menu-web-module").hide();
		$(".menu-js-module").hide();
	}
	if(flag == 2) {
		// 显示左侧菜单
		$(".lemonui-main .main-menu").css("display", "block");
		$(".lemonui-main .main-content").css({
			"margin-left": "210px"
		});
		$(".menu-css-module").hide();
		$(".menu-web-module").show();
		$(".menu-js-module").hide();
	}
	if(flag == 3) {
		// 显示左侧菜单
		$(".lemonui-main .main-menu").css("display", "block");
		$(".lemonui-main .main-content").css({
			"margin-left": "210px"
		});
		$(".menu-css-module").hide();
		$(".menu-web-module").hide();
		$(".menu-js-module").show();
	}
	if(flag == 4) {
		$(".lemonui-main .main-menu").css("display", "none");
		$(".lemonui-main .main-content").css({
			"margin-left": "0px"
		});
		$(".menu-css-module").hide();
		$(".menu-css-module").hide();
		$(".menu-web-module").hide();
		$(".menu-js-module").hide();
	}
}
/**
 * CSS3动画特效页面控制
 */
$(function() {
	$(".btn").on("click.animated", function() {
		var str = $(this).val();
		$(this).addClass("animated " + str);
		var obj = $(this);
		setTimeout(function() {
			$(obj).removeClass("animated " + str);
		}, 1000);
	});
});

/**
 * dialogbox调用示例
 */
$(function() {
	// 调用方法
	$("#btn-dialogbox-alert").click(function() {
		$.dialogbox.alert({
			title: "警告框",
			backdrop: true,
			content: "这是一个alert警告框！",
			icon: "success",
			backdrop: true,
			onClick: function() {
				$.dialogbox.alert({
					backdrop: true,
					content: "这是点击按钮的回调函数"
				});
			}
		});
	});

	$("#btn-dialogbox-confirm").click(function() {
		$.dialogbox.confirm({
			title: "确认框",
			icon: "info",
			content: "这是一个confirm确认框！",
			onClick: function() {
				$.dialogbox.alert({
					title: "操作提示",
					content: "您的订单已经提交成功！",
					icon: "success"
				});
			},
			onCancel: function() {
				$.dialogbox.alert({
					title: "操作提示",
					content: "您的订单已经取消！",
					icon: "info"
				});
			}
		});
	});
	$("#btn-dialogbox-prompt").click(function() {
		$.dialogbox.prompt({
			title: "this is title!",
			content: "这是一个prompt提示框！",
			placeholder: "请输入内容！",
			onClick: function(value) {
				$.dialogbox.alert({
					title: "操作提示",
					content: "用户输入的是：" + value
				});
			}
		});
	});
	$("#btn-dialogbox-msg").click(function() {
		$.dialogbox.msg({
			title: "this is title!",
			skin: "dialogbox-danger",
			icon: "info",
			content: "登录超时，请重新登录！"
		});
	});
	$("#btn-dialogbox-iframe").click(function() {
		$.dialogbox.iframe({
			element: "iframe1",
			title: "Dialogbox的Iframe弹出窗口示例-窗口1",
			url: "http://www.qq.com",
			onCancel: function() {
				alert("这是回调函数");
			}
		});
	});
	$("#btn-dialogbox-iframe1").click(function() {
		$.dialogbox.iframe({
			element: "iframe2",
			title: "Dialogbox的Iframe弹出窗口示例-窗口2",
			url: "http://www.sogou.com",
			onCancel: function() {
				alert("这是回调函数");
			}
		});
	});
	// 主题颜色
	$("#btn-dialogbox-default").click(function() {
		$.dialogbox.alert({
			skin: "dialogbox-default",
			content: "主题为dialogbox-default的弹出框！"
		});
	});
	$("#btn-dialogbox-primary").click(function() {
		$.dialogbox.alert({
			skin: "dialogbox-primary",
			content: "主题为dialogbox-primary的弹出框！"
		});
	});
	$("#btn-dialogbox-info").click(function() {
		$.dialogbox.alert({
			skin: "dialogbox-info",
			content: "主题为dialogbox-info的弹出框！"
		});
	});
	$("#btn-dialogbox-success").click(function() {
		$.dialogbox.confirm({
			skin: "dialogbox-success",
			content: "主题为dialogbox-success的弹出框！"
		});
	});
	$("#btn-dialogbox-warning").click(function() {
		$.dialogbox.alert({
			skin: "dialogbox-warning",
			content: "主题为dialogbox-warning的弹出框！"
		});
	});
	$("#btn-dialogbox-danger").click(function() {
		$.dialogbox.alert({
			skin: "dialogbox-danger",
			content: "主题为dialogbox-danger的弹出框！"
		});
	});

});

/**
 * modal调用示例
 */
$(function() {

	$("#open-modal").click(function() {
		$("#myModal").modal("show", {
			//time:2000,
			onBefore: function() {
				//alert("打开之前执行的代码");
			},
			onClose: function() {
				$.dialogbox.alert({
					title: "提示",
					content: "你已经关闭窗口！！"
				})

			}
		});

	});
});

/**
 * 日期选择器调用
 */
$(function() {
	//$("#datepicker-default").datepicker("setValue", "2017-04-03");
	// 普通日期
	$("#datepicker-default").datepicker({});
	// 带时分秒日期
	$("#datepicker-default-times").datepicker({
		format: "yyyy-MM-dd HH:mm:ss",
		isTime: true
	});

	// 格式化日期
	$("#datepicker-default-format1").datepicker({
		isTime: true,
		format: "yyyy-MM-dd HH:mm:ss"
	});
	$("#datepicker-default-format2").datepicker({
		isTime: true,
		format: "yyyy年MM月dd日 HH时mm分ss秒"
	});
	$("#datepicker-default-format3").datepicker({
		isTime: true,
		format: "yyyy/MM/dd HH:mm:ss"
	});
	$("#datepicker-default-format4").datepicker({
		isTime: true,
		format: "MM/dd/yyyy HH:mm:ss"
	});
	$("#datepicker-default-format5").datepicker({
		isTime: true,
		format: "yyyyMMddHHmmss"
	});

	// 固定日期选择器
	$("#datepicker-default-fixed").datepicker({
		isTime: true,
		fixed: false
	});

	//给日期标注
	$("#datepicker-default-marks").datepicker({
		isTime: true,
		marks: ["2017-06-01", "2017-06-03", "2017-06-04", "2017-06-05", "2017-06-06"]
	});
});