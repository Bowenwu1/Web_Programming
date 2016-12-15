(function() {
	var legal = [false, false, false, false, false, false];
	var namePattern = new RegExp(/^[a-zA-Z](\w){5,17}$/);
	// var emailPattern = new RegExp(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/);
	var emailPattern = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
	var numberPattern = new RegExp(/^[1-9][0-9]{7}$/);
	var phonePattern = new RegExp(/^[1-9][0-9]{10}$/);
	// passwordPattern here !!!
	var passwordPattern = new RegExp();

	document.getElementById("userName").onchange = function() {
		if (!namePattern.test(this.value)) {
			document.getElementById("userNameInfo").innerHTML = "用户名应该含有8到18个字母和下划线，且首位不能为下划线";
			legal[0] = false;
			return;
		} else {
			document.getElementById("userNameInfo").innerHTML = "";
			legal[0] = true;
		}
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				legal[0] = false;
				var text = xmlhttp.responseText;
				if (text == "repeated")
					document.getElementById("userNameInfo").innerHTML = "该用户名已经存在！";
				else
					legal[0] = true;
			}
		}
		xmlhttp.open("POST", "/query", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("userName=" + this.value);
	}

	document.getElementById("userNumber").onchange = function() {
		if (!numberPattern.test(this.value)) {
			document.getElementById("userNumberInfo").innerHTML = "学号由8位数字组成，且首位不为0";
			legal[1] = false;
			return;
		} else {
			document.getElementById("userNumberInfo").innerHTML = "";
			legal[1] = true;
		}
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				legal[1] = false;
				var text = xmlhttp.responseText;
				if (text == "repeated")
					document.getElementById("userNumberInfo").innerHTML = "该学号已经存在！";
				else
					legal[1] = true;
			}
		}
		xmlhttp.open("POST", "/query", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("userNumber=" + this.value);
	}

	document.getElementById("userPhone").onchange = function() {
		if (!phonePattern.test(this.value)) {
			document.getElementById("userPhoneInfo").innerHTML = "手机号由11位数字组成，且首位不为0";
			legal[2] = false;
			return;
		} else {
			document.getElementById("userPhoneInfo").innerHTML = "";
			legal[2] = true;
		}
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				legal[2] = false;
				var text = xmlhttp.responseText;
				if (text == "repeated")
					document.getElementById("userPhoneInfo").innerHTML = "该手机号已经存在！";
				else
					legal[2] = true;
			}
		}
		xmlhttp.open("POST", "/query", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("userPhone=" + this.value);
	}

	document.getElementById("userEmail").onchange = function() {
		if (!emailPattern.test(this.value)) {
			document.getElementById("userEmailInfo").innerHTML = "邮箱格式不正确!";
			legal[3] = false;
			return;
		} else {
			document.getElementById("userEmailInfo").innerHTML = "";
			legal[3] = true;
		} 
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				legal[3] = false;
				var text = xmlhttp.responseText;
				if (text == "repeated")
					document.getElementById("userEmailInfo").innerHTML = "该邮箱已经存在！";
				else
					legal[3] = true;
			}
		}
		xmlhttp.open("POST", "/query", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("userEmail=" + this.value);
	}
	document.getElementById("userPassword").onchange = function() {
		if (!passwordPattern.test(this.value)) {
			document.getElementById("passwordInfo").innerHTML = "密码格式不正确！";
			legal[4] = false;
			return;
		} else {
			document.getElementById("passwordInfo").innerHTML = "";
			legal[4] = true;
		}
	};
	document.getElementById("confimePassword").onchange =  function() {
		if (this.value != document.getElementById("userPassword").value) {
			document.getElementById("confimePasswordInfo").innerHTML = "两次输入的密码不一致！";
			legal[5] = false;
			return;	
		} else {
			document.getElementById("confimePasswordInfo").innerHTML = "";
			legal[5] = true;
		}
	};
	document.getElementById("submit").onsubmit = function() {
		for (var i in legal)
			if (!legal[i]) return false;
		return true;
	}
})();