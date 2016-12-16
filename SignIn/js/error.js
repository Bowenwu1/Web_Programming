(function () {
	var timeLeft = 3;
	window.setTimeout("window.location.href = 'http://localhost:8000'", 3000);
	function countTime() {
		timeLeft--;
		document.getElementById("timeLeft").innerText = timeLeft;
	}
	window.setInterval(countTime, 1000);
})();