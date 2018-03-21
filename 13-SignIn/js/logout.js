(function() {
    function clearCookie() {
        $.cookie("userName", "");
        $.cookie("password", "");
    }
    document.getElementById("logout").onclick = function() {
        clearCookie();
        window.location.href = 'http://localhost:8000';
    }
})();