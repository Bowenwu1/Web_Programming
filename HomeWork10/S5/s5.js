$(function() {
	/* 记录当前是第几轮计算，判断服务器所相应的是否为当前计算所发出的请求 */
	var presentID = 0;
	function init() {
		$(".apb").removeClass("disable");
		presentID++;
		shuffleRandomSequence();
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
	function randomlyDecideWhetherRunNormally() {
		if (Math.random() > 0.6) {
			console.log("success");
			return true;
		} else {
			console.log("fail");
			return false;
		}
	}
	function shuffleRandomSequence() {
		var randomSequence = [0, 1, 2, 3, 4];
		randomSequence.sort(randomSort);
		// console.log(randomSequence);
		var stringSequence = "";
		for (var i in randomSequence)
			stringSequence += indexToCharacter(randomSequence[i]);
		$("#randomSequence").html(stringSequence);
		return randomSequence;
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
	$("#button").mouseout(init);
	/* S5 TASK */
	function clickNextStep(err, currentSum, randomSequence, currentEle, currentInformation) {
		var index = randomSequence.indexOf(currentEle);
		if (!err && index != -1) {
			index++;
		}
		if (err) {
			$("#stateMent").html(currentInformation).show();
		}
		if (index == -1 || index == 5) {
			bubbleHandler(currentSum, randomSequence, clickNextStep);
			return;
		}
		switch(randomSequence[index]) {
			case 0:
				aHandler(currentSum, randomSequence, clickNextStep);
				break;
			case 1:
				bHandler(currentSum, randomSequence, clickNextStep);
				break;
			case 2:
				cHandler(currentSum, randomSequence, clickNextStep);
				break;
			case 3:
				dHandler(currentSum, randomSequence, clickNextStep);
				break;
			case 4:
				eHandler(currentSum, randomSequence, clickNextStep);
				break;
		}
	}
	$(".apb").click(function() {
		if (!$(this).hasClass("disable")) {
			init();
			$(this).addClass("disable");
			var randomSequence = shuffleRandomSequence();
			switch(randomSequence[0]) {
				case 0:
					aHandler(0, randomSequence, clickNextStep);
					break;
				case 1:
					bHandler(0, randomSequence, clickNextStep);
					break;
				case 2:
					cHandler(0, randomSequence, clickNextStep);
					break;
				case 3:
					dHandler(0, randomSequence, clickNextStep);
					break;
				case 4:
					eHandler(0, randomSequence, clickNextStep);
					break;
			}
		}
	});
	/* third comparhension */
	function clickNextStep(err, currentSum, randomSequence, currentEle, currentInformation) {
		var index = randomSequence.indexOf(currentEle);
		if (!err && index != -1) {
			index++;
		}
		if (err) {
			$("#stateMent").html(currentInformation).show();
		}
		if (index == -1 || index == 5) {
			bubbleHandler(currentSum, randomSequence, clickNextStep);
			return;
		}
		switch(randomSequence[index]) {
			case 0:
				aHandler(currentSum, randomSequence, clickNextStep);
				break;
			case 1:
				bHandler(currentSum, randomSequence, clickNextStep);
				break;
			case 2:
				cHandler(currentSum, randomSequence, clickNextStep);
				break;
			case 3:
				dHandler(currentSum, randomSequence, clickNextStep);
				break;
			case 4:
				eHandler(currentSum, randomSequence, clickNextStep);
				break;
		}
	}
	function aHandler(currentSum, randomSequence, callback) {
			var that = $(".mask");
			var temp = $(that).siblings().not(".disable");
			temp.addClass("disable");
            that.addClass("enable");
			$(that).children("span").html("...").show();
			$.get(randomUrlGenerator(), function(result) {
				if (randomlyDecideWhetherRunNormally()) {
					$("#stateMent").html("这是个天大的秘密").show();
					$(that).addClass("disable").removeClass("enable").children("span").html(result).show();
					temp.removeClass("disable");
					callback(null, currentSum + parseInt(result), randomSequence, 0, "这是个天大的秘密");
				} else {
                    $(that).addClass("disable").removeClass("enable").children("span").html(result).show();
					temp.removeClass("disable");
					callback(new Error(), currentSum, randomSequence, 0, "这不是个天大的秘密");
				}
			});
	}
	function bHandler(currentSum, randomSequence, callback) {
			var that = $(".history");
			var temp = $(that).siblings().not(".disable");
			temp.addClass("disable");
            that.addClass("enable");
			$(that).children("span").html("...").show();
			$.get(randomUrlGenerator(), function(result) {
				if (randomlyDecideWhetherRunNormally()) {
					$("#stateMent").html("我不知道");
					$(that).addClass("disable").removeClass("enable").children("span").html(result).show();
					temp.removeClass("disable");
					callback(null, currentSum + parseInt(result), randomSequence, 1, "我不知道");
				} else {
                    $(that).addClass("disable").removeClass("enable").children("span").html(result).show();
					temp.removeClass("disable");
					callback(new Error(), currentSum, randomSequence, 1, "我知道");
				}
			});
	}
	function cHandler(currentSum, randomSequence, callback) {
			var that = $(".message");
			var temp = $(that).siblings().not(".disable");
			temp.addClass("disable");
            that.addClass("enable");
			$(that).children("span").html("...").show();
			$.get(randomUrlGenerator(), function(result) {
				if (randomlyDecideWhetherRunNormally()) {
					$("#stateMent").html("你不知道");
					$(that).addClass("disable").removeClass("enable").children("span").html(result).show();
					temp.removeClass("disable");
					callback(null, currentSum + parseInt(result), randomSequence, 2, "你不知道");
				} else {
                    $(that).addClass("disable").removeClass("enable").children("span").html(result).show();
					temp.removeClass("disable");
					callback(new Error(), currentSum, randomSequence, 2, "你知道");
				}
			});
	}
	function dHandler(currentSum, randomSequence, callback) {
			var that = $(".setting");
			var temp = $(that).siblings().not(".disable");
			temp.addClass("disable");
            that.addClass("enable");
			$(that).children("span").html("...").show();
			$.get(randomUrlGenerator(), function(result) {
				if (randomlyDecideWhetherRunNormally()) {
					$("#stateMent").html("他不知道");
					$(that).addClass("disable").removeClass("enable").children("span").html(result).show();
					temp.removeClass("disable");
					callback(null, currentSum + parseInt(result), randomSequence, 3, "他不知道");
				} else {
                    $(that).addClass("disable").removeClass("enable").children("span").html(result).show();
					temp.removeClass("disable");
					callback(new Error(), currentSum, randomSequence, 3, "他知道");
				}
			});
	}
	function eHandler(currentSum, randomSequence, callback) {
			var that = $(".sign");
			var temp = $(that).siblings().not(".disable");
			temp.addClass("disable");
            that.addClass("enable");
			$(that).children("span").html("...").show();
			$.get(randomUrlGenerator(), function(result) {
				if (randomlyDecideWhetherRunNormally()) {
					$("#stateMent").html("才怪");
					$(that).addClass("disable").removeClass("enable").children("span").html(result).show();
					temp.removeClass("disable");
					callback(null, currentSum + parseInt(result), randomSequence, 4, "才怪");
				} else {
                    $(that).addClass("disable").removeClass("enable").children("span").html(result).show();
					temp.removeClass("disable");
					callback(new Error(), currentSum, randomSequence, 4, "才怪的否定形式");
				}
			});
	}
	function bubbleHandler(currentSum, randomSequence, callback) {
		if (randomlyDecideWhetherRunNormally()) {
			$("#stateMent").html("楼主异步调用战斗力感人，目测不超过").show();
				$("#result").html(currentSum).show();
		} else {
			callback(new Error(), currentSum, randomSequence, 5, "楼主异步调用战斗力不感人，目测超过");
		}
	}
});
