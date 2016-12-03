$(function() {
	var presentID = 0;
	function init() {
		presentID++;
		$("#result").hide();
		$("li span").hide();
		$(".button").removeClass("disable");
		$(".info").removeClass("enable").addClass("disable");
	}
	function checkWhetherSumEnable() {
		if (whetherAllButtonIsDisable())
			$(".info").addClass("enable").removeClass("disable");	
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
		var random = Math.random() * 10000;
		return result + random;
	}
	$("#button").mouseenter(init);
	$(".button").click(function() {
		if (!$(this).hasClass("disable")) {
			var temp = $(this).siblings().not(".disable");
			temp.addClass("disable");
			var that = this;
			var buttonID = presentID;
			$(this).children("span").html("...").show();
			$.get(randomUrlGenerator(), function(result) {
				if (buttonID == presentID) {
					$(that).addClass("disable").children("span").html(result).show();
					temp.removeClass("disable");
					checkWhetherSumEnable();
					clickNextStep();
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
	/* S2 TASK */
	function clickNextStep() {
		for (var i in $(".button")) {
			if (!$(".button").eq(i).hasClass("disable")) {
				$(".button").eq(i).click();
				break;
			}
		}
		if (whetherAllButtonIsDisable())
			$(".info").click();
	}
	$(".apb").click(function() {
		init();
		clickNextStep();
	});
});