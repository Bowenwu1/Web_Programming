/* Created by BowenWu-15331310
 * simple Calculator
 */

/* 全局变量 */
var output = "";


function displayOutput() {
    document.getElementById("output").innerHTML = output;
}

    // 我对这种bug的解决表示很困惑
    // 如何才能优雅的完成这十个按钮
    // 表示我这种实现的方式实在时太丑陋了
    // for (var i = 0; i < 10; i++) {
    //     alert(i);
    //     document.getElementById(i.toString()).onclick = function() {
    //         var temp = i;
    //         output += temp.toString();
    //         displayOutput();
    //     }
    // }

// number button function
document.getElementById("0").onclick = function () {
    output += "0"
    displayOutput();
};
document.getElementById("1").onclick = function () {
    output += "1"
    displayOutput();
};


document.getElementById("2").onclick = function () {
    output += "2"
    displayOutput();
};

document.getElementById("3").onclick = function () {
    output += "3"
    displayOutput();
};

document.getElementById("4").onclick = function () {
    output += "4"
    displayOutput();
};

document.getElementById("5").onclick = function () {
    output += "5"
    displayOutput();
};

document.getElementById("6").onclick = function () {
    output += "6"
    displayOutput();
};

document.getElementById("7").onclick = function () {
    output += "7"
    displayOutput();
};

document.getElementById("8").onclick = function () {
    output += "8"
    displayOutput();
};

document.getElementById("9").onclick = function () {
    output += "9"
    displayOutput();
};


// operator function
document.getElementById("divide").onclick = function() {
    output += "/";
    displayOutput();
};

document.getElementById("multiple").onclick = function() {
    output += "*";
    displayOutput();
};

document.getElementById("minus").onclick = function() {
    output += "-";
    displayOutput();
};

document.getElementById("plus").onclick = function() {
    output += "+";
    displayOutput();
};

document.getElementById("CE").onclick = function() {
    output = "";
    displayOutput();
};

document.getElementById("dot").onclick = function() {
    output += ".";
    displayOutput();
};

document.getElementById("del").onclick = function() {
    output = output.slice(0, output.length - 1);
    displayOutput();
};

document.getElementById("right-braket").onclick = function() {
    output += ")";
    displayOutput();
}

document.getElementById("left-braket").onclick = function() {
    output += "(";
    displayOutput();
}

document.getElementById("equal").onclick = function() {
    try {
        var temp = eval(output);
        output = temp.toFixed(6);
        displayOutput();
    }
    catch (exception) {
        alert("非法的表达式！请重试");
    }
};

// 当鼠标移到按钮上的风格
// document.getElementsByClassName("button").onmouseover = function() {
//     alert("test");
// }
