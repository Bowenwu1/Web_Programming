$(function() {
	/* 记录当前是第几轮计算，判断服务器所相应的是否为当前计算所发出的请求 */
	var presentID = 0;
	var randomSequence = [0, 1, 2, 3, 4];
	function init() {
		presentID++;
		shuffleRandomSequence();
		$("#randomSequence").hide();
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
	function randomSort() {
		return Math.random() > 0.5 ?true:false;
	}
	function shuffleRandomSequence() {
		randomSequence.sort(randomSort);
		console.log(randomSequence);
		var stringSequence = "";
		for (var i in randomSequence)
			stringSequence += indexToCharacter(randomSequence[i]);
		$("#randomSequence").html(stringSequence);
	}
	function indexToCharacter(index) {
		var data = {0:'A', 1:'B', 2:'C', 3:'D', 4:'E'};
		return data[index];
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
		$("#randomSequence").show();
		for (var i in randomSequence) {
			if (!$(".button").eq(randomSequence[i]).hasClass("disable")) {
				$(".button").eq(randomSequence[i]).click();
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