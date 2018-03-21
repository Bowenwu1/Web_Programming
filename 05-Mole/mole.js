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
function inputTagGenerator(i, j) {
    var tempNode = document.createElement("input");
    tempNode.type = "radio";
    tempNode.id = idGenerator(i, j);
    tempNode.className = "eachButton";
    return tempNode;
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
    var father = document.getElementById("map");
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 10; j++) {
            father.appendChild(inputTagGenerator(i, j));
        }
        father.appendChild(document.createElement("br"))
    }
}
init();

function setMole() {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 10; j++) {
            var tempNode = document.getElementById(idGenerator(i, j));
            tempNode.checked = false;
        }
    }
    if (whetherStart)
        document.getElementById(idGenerator(x, y)).checked = true;
}
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
    document.getElementById("time").innerHTML = timeLeft;
    document.getElementById("score").innerHTML = score;
    document.getElementById("Status").innerHTML = output;
}

document.getElementById("start").onclick = function () {
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
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 10; j++) {
        document.getElementById(idGenerator(i, j)).onclick = function () {
            if (whetherStart) {
                if (i == x && j == y)
                    getScore();
                else
                    lostScore();
            } else {
                setMole();
            }
        }
    }
}