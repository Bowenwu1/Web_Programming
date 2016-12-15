(function() {
	var namePattern = new RegExp(/^[a-zA-Z](\w){5,17}$/);
	var passwordPattern = new RegExp();
    var whetherUserNameLegal = false;
    var whetherPasswordCorrect = false;
    document.getElementById("userName").onchange = function() {
		if (!namePattern.test(this.value)) {
			document.getElementById("userNameInfo").innerHTML = "该用户不存在！";
			whetherUserNameLegal = false;
			return;
		} else {
            whetherUserNameLegal = true;
			document.getElementById("userNameInfo").innerHTML = "";
		}
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var text = xmlhttp.responseText;
				if (text != "repeated") {
					document.getElementById("userNameInfo").innerHTML = "该用户不存在！";
                    whetherUserNameLegal = false;
                } else {
					document.getElementById("userNameInfo").innerHTML = "";
                    whetherUserNameLegal = true;
                }
            }
		}
		xmlhttp.open("POST", "/query", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("userName=" + this.value);
	}

    document.getElementById("password").onchange = function() {
        if (!whetherUserNameLegal) return false;
        var sendMassage = "";
        sendMassage += "userName=" + document.getElementById("userName").value;
        sendMassage += "&password=" + document.getElementById("password").value;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var text = xmlhttp.responseText;
                if (text == "loginsuccess") {
                    alert("loginsuccess");
                    document.getElementById("loginPasswordInfo").innerHTML = "";
                    whetherPasswordCorrect = true;
                } else {
                    whetherPasswordCorrect = false;
                    document.getElementById("loginPasswordInfo").innerHTML = "密码不正确";
                }
            }
        }
        xmlhttp.open("POST", "/loginquery", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(sendMassage);
    }
    function deleteCookie() {
        alert("deleteCookie");
        $.cookie("userName", "");
        $.cookie("password", "");
    }
    function writeCookie() {
        alert("writeCookie");
        $.cookie("userName", $("#userName").val(), {expires: 7});
        $.cookie("password", $("#password").val(), {expires: 7});
    }
    document.getElementById("login").onsubmit = function() {
        alert("onsubmit");
        $("#userName").change();
        $("#password").change();
        // bug fix
        // problem of asys
        if (whetherPasswordCorrect && whetherUserNameLegal) {
            deleteCookie();
            writeCookie();
            return true;
        }
        return false;
    }
    document.getElementById("regist").onclick = function() {
        window.location.href = "http://localhost:8000/regist";
    }
})();