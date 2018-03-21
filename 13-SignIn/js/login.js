(function() {
	var namePattern = new RegExp(/^[a-zA-Z](\w){5,17}$/);
	var passwordPattern = new RegExp();
    var whetherUserNameLegal = false;
    var whetherPasswordCorrect = false;
    document.getElementById("userName").onchange = function() {
        if (this.value == "") return;
		if (!namePattern.test(this.value)) {
			document.getElementById("userNameInfo").innerHTML = "该用户不存在！";
			whetherUserNameLegal = false;
			return;
		} else {
            whetherUserNameLegal = true;
			document.getElementById("userNameInfo").innerHTML = "";
		}
        $.post("/query", "userName=" + this.value ,function(text) {
            if (text != "repeated") {
					document.getElementById("userNameInfo").innerHTML = "该用户不存在！";
                    whetherUserNameLegal = false;
                } else {
					document.getElementById("userNameInfo").innerHTML = "";
                    whetherUserNameLegal = true;
                }
        });
	}
    $("#submit").click(function() {
        if (!whetherUserNameLegal) {
            $("#userName").change();
            return;
        }
        deleteCookie();
        var sendMassage = "";
        sendMassage += "userName=" + document.getElementById("userName").value;
        sendMassage += "&password=" + document.getElementById("password").value;
        $.post("/loginquery", sendMassage, function(text) {
            if (text == "loginsuccess") {
                    console.log("loginsuccess");
                    document.getElementById("loginPasswordInfo").innerHTML = "";
                    whetherPasswordCorrect = true;
                    window.location.href = "http://localhost:8000"
                    deleteCookie();
                    writeCookie();
                } else {
                    whetherPasswordCorrect = false;
                    $("#loginPasswordInfo").html("错误的用户名或密码");
                    // document.getElementById("loginPasswordInfo").innerHTML = "错误的用户名或密码";
                }
        });
    });
    function deleteCookie() {
        $.cookie("userName", "");
        $.cookie("password", "");
    }
    // forbidden submit of form
    $("#login").submit(function() {
        return false;
    });
    function writeCookie() {
        $.cookie("userName", $("#userName").val(), {expires: 7});
        $.cookie("password", $("#password").val(), {expires: 7});
    }
    document.getElementById("regist").onclick = function() {
        window.location.href = "http://localhost:8000/regist";
    }
})();