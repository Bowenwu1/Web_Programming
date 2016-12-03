$(function() {
	var presentID = 0;
	function init() {
		presentID++;
		getResponseTimes = 0;
		$("#result").hide();
		$("li span").hide();
		$(".button").removeClass("disable");
		$(".info").removeClass("enable").addClass("disable");
	}
	function checkWhetherSumEnable() {
		// S3 TASK change here
		getResponseTimes++;
		// if (whetherAllButtonIsDisable())
		// 	$(".info").addClass("enable").removeClass("disable");
		if (getResponseTimes == 5)
			$(".info").addClass("enable").removeClass("disable").click();
	}
	function whetherAllButtonIsDisable() {
		var flag = true;
		$(".button").each(function() {
			if (!$(this).hasClass("disable"))
				flag = false;
		});
		return flag;
	}
	function randomUrlGenerator() {
		var result = "/getRandomNumber";
		var date = new Date();
		console.log(result + Number(date));
		return result + Number(date);
	}
	$("#button").mouseenter(init);
	/* S3 TASK change here */
	$(".button").click(function() {
		if (/*!$(this).hasClass("disable")*/true) {
			var temp = $(this).siblings().not(".disable");
			temp.addClass("disable");
			var that = this;
			var buttonID = presentID;
			$(this).children("span").html("...").show();
			$.get(randomUrlGenerator(), function(result) {
				if (buttonID == presentID) {
					$(that).addClass("disable").children("span").html(result).show();
					// temp.removeClass("disable");
					checkWhetherSumEnable();
				}
			});
		}
	});
	$(".info").click(function(){
		if ($(".info").hasClass("enable")) {
			var result = 0;
			$(".button").children("span").each(function() {
				console.log($(this).text());
				result += parseInt($(this).text());
			});
			$("#result").html(result).show();
			$(this).removeClass("enable").addClass("disable");
			$(".button").removeClass("disable").addClass("enable");
		}
	});
	/* S3 TASK */
	$(".apb").click(function() {
		presentID++;
		getResponseTimes = 0;
		$(".button").click();
	});
});