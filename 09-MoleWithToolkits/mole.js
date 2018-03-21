/* 用于记录游戏状态的全局变量 */
var whetherStart = false;
var timeLeft = 30;
var score = 0;
var output = "";
/* 当前坐标 */
var x = 0;
var y = 0;

function idGenerator(i, j) {
    return i.toString() + j.toString();
}
// Return a jQuery Object
function inputTagGenerator(i, j) {
    return $("<input>").attr("type", "radio").attr("id", idGenerator(i, j)).addClass("eachButton");
}

function cordinateGenerator() {
    var temp_x = x;
    var temp_y = y;
    while (x == temp_x && y == temp_y) {
        x = (Math.round(Math.random() * 100000)) % 6;
        y = (Math.round(Math.random() * 100000)) % 6;
    }
}

function init() {
    var father = $("#map");
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 10; j++) {
            father.append(inputTagGenerator(i, j));
        }
        father.append($("<br>"));
    }
    distributeEvent();
    distributeStartButtonEvent();
}
function setMole() {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 10; j++) {
            $("#" + idGenerator(i, j)).prop("checked", false);
        }
    }
    if (whetherStart)
        $("#" + idGenerator(x, y)).prop("checked", true);
}
// function setMole() {
//     for (var i = 0; i < 6; i++) {
//         for (var j = 0; j < 10; j++) {
//             var tempNode = document.getElementById(idGenerator(i, j));
//             tempNode.checked = false;
//         }
//     }
//     if (whetherStart)
//         document.getElementById(idGenerator(x, y)).checked = true;
// }
function shutDown() {
    if (score == -1) {
        alert("Game Over.\nYou have lost all your scores!");
    } else {
        alert("Game Over.\nYour score is: " + score.toString());
    }
    timeLeft = 30;
    score = 0;
    whetherStart = false;
    setMole();
    display();
}
function timeRecorder() {
    if (whetherStart) {
        timeLeft--;
        display();
    }
    if (0 == timeLeft) {
        shutDown();
    }
}
setInterval("timeRecorder()", 1000);
function display() {
    $("#time").html(timeLeft);
    $("#score").html(score);
    $("#Status").html(output);
}
function distributeStartButtonEvent() {
    $("#start").click(function () {
        if (whetherStart) {
            output = "Game Over";
            shutDown();
            whetherStart = false;
        } else {
            output = "Playing";
            whetherStart = true;
            cordinateGenerator();
            setMole();
        }
        display();
    });
}
function getScore() {
    score++;
    cordinateGenerator();
    setMole();
    display();
}
function lostScore() {
    score--;
    display();
    setMole();
    if (score < 0)
        shutDown();
}
function distributeEvent() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 10; j++) {
            $('#' + idGenerator(i, j)).click(function(){
                if (whetherStart) {
                    if (i == x && j == y)
                        getScore();
                    else
                        lostScore();
                } else {
                    setMole();
                }
            });
        }
    }
}
$("document").ready(init);