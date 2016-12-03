(function () {
	var timeLeft = 3;
	window.setTimeout("window.location.href = 'http://localhost:8000/html/index.html'", 3000);
	function countTime() {
		timeLeft--;
		document.getElementById("timeLeft").innerText = timeLeft;
	}
	window.setInterval(countTime, 1000);
})();