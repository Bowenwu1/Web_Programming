/* 存储拼图块 */
var clip = new Array();
for (var i = 0; i < 4; ++i)
    clip[i] = new Array();
/* 用于存储游戏状态的全局变量 */
var MAXSIZE = 4;
var blankClipId = "img33";
var difficulty = 20;
var whetherStartGame = false;
var t;
var startButton = document.getElementById("start-button");
var autoRecoveryButton = document.getElementById("auto-recovery");
var time = 0;
var step = 0;
var timeCounter;
var whetherInAutoRecovery = false;

function init() {
    var pazzle = document.createDocumentFragment();
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            clip[i][j] = document.createElement("div");
            clip[i][j].id = idGenerator(i, j);
            clip[i][j].className = positionClassNameGenerator(i, j);
            pazzle.appendChild(clip[i][j]);
        }
    }
    document.getElementById("pazzle-container").appendChild(pazzle);
}
function initClip() {
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            clip[i][j].id = idGenerator(i, j);
            clip[i][j].className = positionClassNameGenerator(i, j);
        }
    }
}

function findBlank() {
    var blankClipX;
    var blankClipY;
    for (var i = 0; i < MAXSIZE; ++i) {
        for (var j = 0; j < MAXSIZE; ++j) {
            if (clip[i][j].id == blankClipId) {
                blankClipX = i;
                blankClipY = j;
                break;
            }
        }
    }
    return {
        x:blankClipX,
        y:blankClipY
    }
}

function autoRecovery() {
    var temp = findBlank();
    var blankClipX = temp.x;
    var blankClipY = temp.y;
    var direction;
    if (whetherStartGame && !whetherInAutoRecovery) {
        var confirmBar = confirm("该功能开发中\n现在大概有99%的机会无法复原\n是否继续？");
        if (confirmBar) {
            t = window.setInterval(moveRandomly, 300);
            whetherInAutoRecovery = true;
        }
    }
}

function moveRandomly() {
    if (!whetherStartGame || checkWhetherWin()) {
        whetherInAutoRecovery = false;
        window.clearInterval(t);
        setTimeout(initClip, 400);
    }
    var direction;
    var temp = findBlank();
    var blankClipX = temp.x;
    var blankClipY = temp.y;
    while (1) {
        direction = Math.round(Math.random() * 1000) % 4;
        console.log(direction);
        if (direction == 0) {
            if (whetherCordinateLegal(blankClipX - 1, blankClipY))
                moveClip(blankClipX,
                blankClipY, blankClipX - 1, blankClipY);
                blankClipX--;
                break;
        } else if (direction == 1) {
            if (whetherCordinateLegal(blankClipX, blankClipY + 1))
                moveClip(blankClipX,
                blankClipY, blankClipX, blankClipY + 1);
                blankClipY++;
                break;
        } else if (direction == 2) {
            if (whetherCordinateLegal(blankClipX + 1, blankClipY))
                moveClip(blankClipX,
                blankClipY, blankClipX + 1, blankClipY);
                blankClipX++;
                break;
        } else if (direction == 3) {
            if (whetherCordinateLegal(blankClipX, blankClipY - 1))
                moveClip(blankClipX,
                blankClipY, blankClipX, blankClipY - 1);
                blankClipY--;
                break;
        }
    }
}

function positionClassNameGenerator(x, y) {
    var result = "row";
    result += x.toString();
    result += " "
    result += "col"
    result += y.toString();
    return result;
}

function positionClassNameToCordinate(className) {
    var a = className[3];
    var b = className[8];
    return {
      x:a,
      y:b
    };
}
function idGenerator(x, y) {
    var result = "img";
    result += x.toString();
    result += y.toString();
    return result;
}

function whetherCordinateLegal(x, y) {
    if (x >= MAXSIZE || x < 0)
        return false;
    if (y >= MAXSIZE || y < 0)
        return false;
    return true;
}

function checkWhetherBlank(x, y) {
    if (!whetherCordinateLegal(x, y))
        return false;
    return clip[x][y].id == blankClipId;
}

function checkWhetherWin() {
    for (var i = 0; i < MAXSIZE; ++i) {
        for (var j = 0; j < MAXSIZE; ++j) {
            if ((function() {
                return idGenerator(i, j) != clip[i][j].id;
            })())
                return false;
        }
    }
    return true;
}

function moveClip(x1, y1, x2, y2) {
    clip[x1][y1].className = positionClassNameGenerator(x2, y2);
    clip[x2][y2].className = positionClassNameGenerator(x1, y1);
    var temp = clip[x1][y1];
    clip[x1][y1] = clip[x2][y2];
    clip[x2][y2] = temp;
    step++;
}

function moveClipWithoutChangePositionClassName(x1, y1, x2, y2) {
    if (x2 < MAXSIZE && x2 > -1 && y2 < MAXSIZE && y2 > -1) {
        var temp = clip[x1][y1];
        clip[x1][y1] = clip[x2][y2];
        clip[x2][y2] = temp;
        return true;
    }
    return false;
}
/* In order to Move all clip to
 * their target in one time
 * change their className
 * in almost one time
 */
function moveAllCilpInplaceAtOneTime() {
    for (var i = 0; i < MAXSIZE; ++i) {
        for (var j = 0; j < MAXSIZE; ++j) {
            clip[i][j].className = positionClassNameGenerator(i, j);
        }
    }
}

/* improve it latter */
function randomlyLocateClip() {
    var blankClipX;
    var blankClipY;
    for (var i = 0; i < MAXSIZE; ++i) {
        for (var j = 0; j < MAXSIZE; ++j) {
            if (clip[i][j].id == blankClipId) {
                blankClipX = i;
                blankClipY = j;
                break;
            }
        }
    }

    /* naive algorithm
     * just randomly move the blankClip 
     * 10 times
     */
    var direction;
    for (var i = 0; i < difficulty; ++i) {
        direction = Math.round(Math.random() * 1000) % 4;
        console.log(direction);
        if (direction == 0) {
            if (moveClipWithoutChangePositionClassName(blankClipX,
                blankClipY, blankClipX - 1, blankClipY))
                --blankClipX;
            else
                --i;
        } else if (direction == 1) {
            if (moveClipWithoutChangePositionClassName(blankClipX,
                blankClipY, blankClipX, blankClipY + 1))
                ++blankClipY;
            else
                --i;
        } else if (direction == 2) {
            if (moveClipWithoutChangePositionClassName(blankClipX,
                blankClipY, blankClipX + 1, blankClipY))
                ++blankClipX;
            else
                --i;
        } else if (direction == 3) {
            if (moveClipWithoutChangePositionClassName(blankClipX,
                blankClipY, blankClipX, blankClipY - 1))
                --blankClipY;
            else
                --i;
        }
    }
    moveAllCilpInplaceAtOneTime();
}

function shutDown() {
    whetherStartGame = false;
    setTimeout("alert('恭喜你！你已经成功复原拼图!')" , 300);
    startButton.innerHTML = "开始游戏";
}

function changeBackGroundImage (imgName) {
    var pazzle = document.getElementById("pazzle-container");
    var demo = document.getElementById("demo");
    var className;
    if (imgName == "panda") {
        className = "imgPanda";
    } else if (imgName == "Star") {
        className = "imgStar";
    } else {
        className = "imgWater";
    }
    demo.className = className;
    pazzle.className = className;
}

var distributeEventForEachClip = function(x, y) {
    var result = function() {
        clip[x][y].onclick = function() {
            if (whetherStartGame) {
                var temp = positionClassNameToCordinate(this.className);
                var i = parseInt(temp.x);
                var j = parseInt(temp.y);
                console.log(typeof i);
                console.log(i.toString() + " " + j.toString());
                if (checkWhetherBlank(i - 1, j))
                    moveClip(i, j, i - 1, j);
                else if (checkWhetherBlank(i, j + 1))
                    moveClip(i, j, i, j + 1);
                else if (checkWhetherBlank(i + 1, j))
                    moveClip(i, j, i + 1, j);
                else if (checkWhetherBlank(i, j - 1))
                    moveClip(i, j, i, j - 1);
                if (checkWhetherWin()) {
                    shutDown();
                }
            }
        }
    }
    return result;
}

startButton.onclick = function () {
    if (whetherStartGame) {
        this.innerHTML = "开始游戏";
        initClip();
        whetherStartGame = false;
    } else {
        time = 0;
        step = 0;
        displayTimeAndStep();
        timeCounter = window.setInterval(timeCount, 1000);
        this.innerHTML = "结束游戏";
        randomlyLocateClip();
        whetherStartGame = true;
    }
}

autoRecoveryButton.onclick = function () {
    autoRecovery();
}

document.getElementById("difficulties-selector").onchange = function() {
    if (this.selectedIndex == 0)
        difficulty = 10;
    else if (this.selectedIndex == 1)
        difficulty = 100;
    else if (this.selectedIndex == 2)
        difficulty = 1000;
}

document.getElementById("img-selector").onchange = function() {
    if (this.selectedIndex == 0)
        changeBackGroundImage("panda");
    else if (this.selectedIndex == 1)
        changeBackGroundImage("Star");
    else if (this.selectedIndex == 2)
        changeBackGroundImage("Water");
}

window.onload = function () {
    init();
    for (var i = 0; i < MAXSIZE; ++i)
        for (var j = 0; j < MAXSIZE; ++j)
            distributeEventForEachClip(i, j)();
}