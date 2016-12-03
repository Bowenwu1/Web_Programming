/* Created by BowenWu-15331310
 * simple Calculator
 */

/* 全局变量 */
var output = "";
var whetherEnd = false;

function displayOutput() {
    var oo = document.getElementById("output");
    oo.innerHTML = output;
    if (output.length <= 5) {
        oo.style.fontSize = '75px';
    } else if (output.length <= 12) {
        oo.style.fontSize = '45px';
    } else if (output.length <= 18) {
        oo.style.fontSize = '30px';
    } else if (output.length <= 25) {
        oo.style.fontSize = "20px";
    } else if (output.length > 26) {
        alert("超出最大精度");
        whetherEnd = true;
    }

        
}

/* 数字按钮和操作符
 * getElementsByClassName返回的是标签
 * 但是for in循环中x却是下标
 * 被这个坑了好久
 */
var button_list = document.getElementsByClassName("button");
for (x in button_list) {
    button_list[x].onclick = function() {
        if (whetherEnd) {
            output = "";
            whetherEnd = false;
        }
        output += this.innerHTML;
        displayOutput();
    }
}

/* 有运算功能的运算符 */
document.getElementById("CE").onclick = function() {
    output = "";
    displayOutput();
};

document.getElementById("del").onclick = function() {
        if (whetherEnd) {
        output = "";
        whetherEnd = false;
        }
    output = output.slice(0, output.length - 1);
    displayOutput();
};

document.getElementById("equal").onclick = function() {
    try {
        var temp = eval(output);
        if (temp == "Infinity")
            throw 0;
        output = temp.toFixed(6);
        output = parseFloat(output);
        displayOutput();
        whetherEnd = true;
    }
    catch (exception) {
        alert("非法的表达式！请重试");
    }
};
