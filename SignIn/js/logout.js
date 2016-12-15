(function() {
    document.getElementById("logout").onclick = function() {
        clearCookie();
        window.location.href = 'http://localhost:8000';
    }
})();