/* 存储拼图块 */
var clip = new Array();
for (var i = 0; i < 4; ++i)
    clip[i] = new Array();
/* 用于存储游戏状态的全局变量 */
var MAXSIZE = 4;
var blankClipId = "img33";
var blankClipX, blankClipY;
var difficulty = 20;
var whetherStartGame = false;
var t;
var startButton = $("#start-button");
var autoRecoveryButton = $("#auto-recovery");
var time = 0;
var step = 0;
var timeCounter;
var whetherInAutoRecovery = false;

function init() {
    var pazzle = document.createDocumentFragment();
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            clip[i][j] = $("<div></div>").attr("id", idGenerator(i, j)).addClass(positionClassNameGenerator(i, j));
            $("#pazzle-container").append(clip[i][j]);
        }
    }
}
function initClip() {
    for (var i = 0; i < 4; ++i)
        for (var j = 0; j < 4; ++j)
            clip[i][j].attr("id", idGenerator(i, j)).removeClass().addClass(positionClassNameGenerator(i, j));
}
function findBlank() {
    for (var i = 0; i < MAXSIZE; ++i) {
        for (var j = 0; j < MAXSIZE; ++j) {
            if (clip[i][j].attr("id") == blankClipId) {
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
function whetherMoveRandomlyShouleStop() {
    if (!whetherStartGame || checkWhetherWin()) {
        whetherInAutoRecovery = false;
        window.clearInterval(t);
        setTimeout(initClip, 400);
    }
}
function setBlankClipXandBlankClipY() {
    var temp = findBlank();
    var blankClipX = temp.x;
    var blankClipY = temp.y;
}
function moveBlankClipLeft() {
    if (whetherCordinateLegal(blankClipX - 1, blankClipY)) {
        moveClip(blankClipX, blankClipY, blankClipX - 1, blankClipY);
            blankClipX--;
    } else {
        return false;
    }
    return true;
}
function moveBlankClipRight() {
    if (whetherCordinateLegal(blankClipX + 1, blankClipY)) {
        moveClip(blankClipX, blankClipY, blankClipX + 1, blankClipY);
            blankClipX++;
    } else {
        return false;
    }
    return true;
}
function moveBlankClipUp() {
    if (whetherCordinateLegal(blankClipX, blankClipY - 1)) {
        moveClip(blankClipX, blankClipY, blankClipX, blankClipY - 1);
            blankClipY--;
    } else {
        return false;
    }
    return true;
}
function moveBlankClipDown() {
    if (whetherCordinateLegal(blankClipX, blankClipY + 1)) {
        moveClip(blankClipX, blankClipY, blankClipX, blankClipY + 1);
            blankClipY++;
    } else {
        return false;
    }
    return true;
}
function moveRandomly() {
    whetherMoveRandomlyShouleStop();
    setBlankClipXandBlankClipY();
    while (1) {
        var direction = Math.round(Math.random() * 1000) % 4;
        console.log(direction);
        if (direction == 0) {
            if (moveBlankClipLeft()) break;
        } else if (direction == 1) {
            if (moveBlankClipRight()) break;
        } else if (direction == 2) {
            if (moveBlankClipDown()) break;
        } else if (direction == 3) {
            if (moveBlankClipUp()) break;
        }
    }
}
function moveClipWithoutChangePositionClassNameLeft() {
    if (moveClipWithoutChangePositionClassName(blankClipX,
                blankClipY, blankClipX - 1, blankClipY))
                --blankClipX;
}
function moveClipWithoutChangePositionClassNameRight() {
    if (moveClipWithoutChangePositionClassName(blankClipX,
                blankClipY, blankClipX + 1, blankClipY))
                ++blankClipX;
}
function moveClipWithoutChangePositionClassNameUp() {
    if (moveClipWithoutChangePositionClassName(blankClipX,
                blankClipY, blankClipX, blankClipY - 1))
                --blankClipY;
}
function moveClipWithoutChangePositionClassNameDown() {
    if (moveClipWithoutChangePositionClassName(blankClipX,
                blankClipY, blankClipX, blankClipY + 1))
                ++blankClipY;
}
function randomlyLocateClip() {
    setBlankClipXandBlankClipY();
    for (var i = 0; i < difficulty; ++i) {
        var direction = Math.round(Math.random() * 1000) % 4;
        console.log(direction);
        if (direction == 0) {
            moveClipWithoutChangePositionClassNameUp();
        } else if (direction == 1) {
            moveClipWithoutChangePositionClassNameDown();
        } else if (direction == 2) {
            moveClipWithoutChangePositionClassNameRight();
        } else if (direction == 3) {
            moveClipWithoutChangePositionClassNameLeft();
        }
    }
    moveAllCilpInplaceAtOneTime();
}
function positionClassNameGenerator(x, y) {
    return ("row" + x.toString() + " "+ "col" + y.toString());
}

function positionClassNameToCordinate(className) {
    return {
      x:className[3],
      y:className[8]
    };
}
function idGenerator(x, y) {
    return ("img" + x.toString() + y.toString())
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
    return clip[x][y].attr("id") == blankClipId;
}
function checkWhetherWin() {
    for (var i = 0; i < MAXSIZE; ++i) {
        for (var j = 0; j < MAXSIZE; ++j) {
            if ((function() {
                return idGenerator(i, j) != clip[i][j].attr("id");
            })())
                return false;
        }
    }
    return true;
}
function moveClip(x1, y1, x2, y2) {
    clip[x1][y1].removeClass().addClass(positionClassNameGenerator(x2, y2));
    clip[x2][y2].removeClass().addClass(positionClassNameGenerator(x1, y1));
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
    for (var i = 0; i < MAXSIZE; ++i)
        for (var j = 0; j < MAXSIZE; ++j)
            clip[i][j].removeClass().addClass(positionClassNameGenerator(i, j));
}
function shutDown() {
    whetherStartGame = false;
    setTimeout("alert('恭喜你！你已经成功复原拼图!')" , 300);
    startButton.html("开始游戏");
}
function shutDownWithoutWin() {
    startButton.html("开始游戏");
    initClip();
    whetherStartGame = false;
}
function changeBackGroundImage (imgName) {
    var className;
    if (imgName == "panda")
        className = "imgPanda";
    else if (imgName == "Star")
        className = "imgStar";
    else
        className = "imgWater";
    $("#demo").removeClass().addClass(className);
    $("#pazzle-container").removeClass().addClass(className);
}
startButton.bind("click", function () {
    if (whetherStartGame) {
        shutDownWithoutWin();
    } else {
        time = 0, step = 0;
        displayTimeAndStep();
        timeCounter = window.setInterval(timeCount, 1000);
        $(this).html("结束游戏");
        randomlyLocateClip();
        whetherStartGame = true;
    }
});
autoRecoveryButton.bind("click", function () {
    if (whetherStartGame)
        autoRecovery();
});
$("#difficulties-selector").bind("change", function() {
    if (this.selectedIndex == 0)
        difficulty = 10;
    else if (this.selectedIndex == 1)
        difficulty = 100;
    else if (this.selectedIndex == 2)
        difficulty = 1000;
});
$("#img-selector").bind("onchange",function() {
    if (this.selectedIndex == 0)
        changeBackGroundImage("panda");
    else if (this.selectedIndex == 1)
        changeBackGroundImage("Star");
    else if (this.selectedIndex == 2)
        changeBackGroundImage("Water");
});
$("#pazzle-container").delegate("div", "click", function() {
    if (whetherStartGame) {
                var temp = positionClassNameToCordinate(this.className);
                var i = parseInt(temp.x), j = parseInt(temp.y);
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
});
$(init);