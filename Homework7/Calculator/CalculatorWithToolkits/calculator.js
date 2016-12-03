/* 全局变量 */
var output = "";
var whetherEnd = false;
$("document").ready(function() {
function displayOutput() {
    $("#output").html(output);
    if (output.length <= 5) {
        $("#output").css("font-size", "75px");
    }else if (output.length <= 18) {
        $("#output").css("font-size", "30px");
    } else if (output.length <= 25) {
        $("#output").css("font-size", "20px");
    } else if (output.length > 26) {
        alert("超出最大精度"), whetherEnd = true;
    }
}
$(".button").click(function() {
      if (whetherEnd) {
            output = "";
            whetherEnd = false;
        }
        output += this.innerHTML;
        displayOutput();
});

/* 有运算功能的运算符 */
$("#CE").click(function() {
    output = "";
    displayOutput();
});

$("#del").click(function() {
        if (whetherEnd) {
        output = "";
        whetherEnd = false;
        }
    output = output.slice(0, output.length - 1);
    displayOutput();
});

$("#equal").click(function() {
    try {
        var temp = eval(output);
        if (temp == "Infinity" || temp == "-Infinity")
            throw 0;
        output = parseFloat(temp.toFixed(6));
        displayOutput();
        whetherEnd = true;
    }
    catch (exception) {
        alert("非法的表达式！请重试");
    }
});
});