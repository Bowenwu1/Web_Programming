/* Model for the map */
/* (0, 0)*************************************************************(600, 0)
 * ***********                                     (400, 50)**********
 * ***********            (250, 100)**                      **********
 * ***********(200, 200)            **                      **********(600, 200)
 * start                            **(350, 250)                   end
 * (0, 250)***********************************************************(600, 300)
 */

/* 用于记录状态的全局变量 */
var whetherStart = false;
var whetherTouchWall = false;
var output = "";
/* draw the initial map */
wallInformation = new Array();
wallInformation[0] = new Array(0, 0, 200, 200);
wallInformation[1] = new Array(200, 0, 200, 50);
wallInformation[2] = new Array(400, 0, 200, 200);
wallInformation[3] = new Array(250, 100, 100, 150);
wallInformation[4] = new Array(0, 250, 600, 50);
/* 这个函数没有模块化的必要 */
function initDraw(redWall) {
    var canvas = document.getElementById("Moze");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        /* 清空画布 */
        ctx.clearRect(0, 0, 600, 300);
        /* 画矩形 */
        ctx.fillStyle = "#eeedef";
        for (x in wallInformation) {
            if (x != redWall)
                initWall(x);
            else
                drawWall(x);
        }
        /* 画线 */
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(600, 0);
        ctx.lineTo(600, 200);
        ctx.lineTo(400, 200);
        ctx.lineTo(400, 50);
        ctx.lineTo(200, 50);
        ctx.lineTo(200, 200);
        ctx.lineTo(0, 200);
        ctx.lineTo(0, 0);
        ctx.stroke();
        /* 画第二条线 */
        ctx.beginPath();
        ctx.moveTo(0, 250);
        ctx.lineTo(250, 250);
        ctx.lineTo(250, 100);
        ctx.lineTo(350, 100);
        ctx.lineTo(350, 250);
        ctx.lineTo(600, 250);
        ctx.lineTo(600, 300);
        ctx.lineTo(0, 300);
        ctx.lineTo(0, 250);
        ctx.stroke();
        /* 画起点 */
        ctx.fillStyle = "#92ff8c";
        ctx.fillRect(0, 202, 45, 45);
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 202, 45, 45);
        /* 画终点 */
        ctx.fillStyle = "#8980fa";
        ctx.fillRect(550, 202, 45, 45);
        ctx.strokeRect(550, 202, 45, 45);
        /* 起点和终点的字母 */
        ctx.font = "35px serif";
        ctx.fillStyle = "black";
        ctx.fillText("S", 15, 237);
        ctx.fillText("E", 560, 237);
    } else {
        alert("请使用最新版本chrome或firefox浏览器!");
    }
}

initDraw();

/* 触碰到墙的处理， 从左到右，从上到下编号为0~4 */
function drawWall(x) {
    var canvas = document.getElementById("Moze");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(wallInformation[x][0], wallInformation[x][1], wallInformation[x][2], wallInformation[x][3]);
}
function initWall(x) {
    var canvas = document.getElementById("Moze");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(150, 150, 150, 0.5)";
    if (x != -1)
        ctx.fillRect(wallInformation[x][0], wallInformation[x][1], wallInformation[x][2], wallInformation[x][3]);
}
/* 检测鼠标所处的位置 */
function whetherInWall(x, y) {
    for (i in wallInformation) {
        if ((x > wallInformation[i][0] && x < wallInformation[i][0] + wallInformation[i][2])
            && (y > wallInformation[i][1] && y < wallInformation[i][1] + wallInformation[i][3]))
            return true;
    }
    return false;
}
function inWhichWall(x, y) {
    for (i in wallInformation) {
        if ((x > wallInformation[i][0] && x < wallInformation[i][0] + wallInformation[i][2])
            && (y > wallInformation[i][1] && y < wallInformation[i][1] + wallInformation[i][3]))
            return i;
    }
    return -1;
}
function whetherInStartBlock(x, y) {
    if ((x > 0 && x < 45) && (y > 202 && y < 202 + 45))
        return true;
    else
        return false;
}
function whetherInEndBlock(x, y) {
    if ((x > 550 && x < 550 + 45 - 3) && (y > 202 && y < 202 + 45))
        return true;
    else
        return false;
}
function whetherCheatWin(x, y) {
    if ((x > 550 + 45 - 5 && x < 550 + 45) && (y > 200 && y < 202 + 48))
        return true;
    else
        return false;
}
/* 展示说明 */
function display() {
    document.getElementById("output").innerHTML = output;
}
/* 主要逻辑部分 */
document.getElementById("Moze").onmousemove = function (e) {
    /* 获取坐标 */
    var x = e.clientX;
    var y = e.clientY;
    var canvas = document.getElementById("Moze");
    var bbox = canvas.getBoundingClientRect();
    x = (x - bbox.left) * (canvas.width / bbox.width);
    y = (y - bbox.top) * (canvas.height / bbox.height);
    //  alert(x.toString() + "  " + y.toString());
    if (whetherInStartBlock(x, y)) {
        whetherStart = true;
        whetherTouchWall = false;
        output = "You have start!";
        initDraw(-1);
    } else if (whetherInWall(x, y)) {
        if (whetherStart) {
            output = "You Lose! Please restart";
            initDraw(inWhichWall(x, y));
            whetherStart = false;
        }
    } else if (whetherCheatWin(x, y)) {
            output = "Don't cheat, you should start from the 'S' and move to the 'E' inside the Moze!";
            whetherStart = false;
    } else if (whetherInEndBlock(x, y)) {
        if (whetherStart) {
            output = "You Win!";
            whetherStart = false;
        }
    } else {
        initDraw(-1);
    }
    display();
}
document.getElementById("Moze").onmouseout = function () {
    initDraw(-1);
    output = "";
    display();
}

/* demo */
function drawDemo() {
    var convas = document.getElementById("demo");
    var ctx = convas.getContext("2d");
    ctx.fillStyle = "rgba(150, 150, 150, 0.5)";
    ctx.fillRect(0, 0, 100, 30);
    ctx.lineWidth = "0.5";
    ctx.strokeRect(0, 0, 100, 30);
}
drawDemo();