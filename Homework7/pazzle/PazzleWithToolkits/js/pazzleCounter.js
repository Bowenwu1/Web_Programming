/* 记录操作的数量和时间并显示 */


var timeElement = $("#time");
var stepElement = $("#step");

function displayTimeAndStep() {
    displayTimeInformation();
    displayStepInformation();
}
function displayTimeInformation() {
    var minute = Math.floor(time / 60);
    var seconds = parseInt(time % 60);
    var timeResult = "";
    if (minute < 10)
        timeResult += "0";
    timeResult += minute.toString();
    timeResult += ":";
    if (seconds < 10)
        timeResult += "0";
    timeResult += seconds.toString();
    timeElement.html(timeResult);    
}
function displayStepInformation() {
    var stepResult = "";
    if (step < 10)
        stepResult += "000";
    else if (step < 100)
        stepResult += "00";
    else if (step < 1000)
        stepResult += "0";
    stepResult += step.toString();
    stepElement.html(stepResult);   
}
function timeCount() {
    displayTimeAndStep();
    if (whetherStartGame) {
        time++;
    } else {
        window.clearInterval(timeCounter);
    }
}