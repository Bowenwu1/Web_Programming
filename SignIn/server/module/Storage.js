var user = require("./User.js");

function Storage() {
	// private:
	var userList = new Array();

	this.createUser = function(userName, userNumber, userPhone, userEmail, password) {
		console.log("new user has been created !");
		userList.push(new user(userName, userNumber, userPhone, userEmail, password));
		console.log(new user(userName, userNumber, userPhone, userEmail, password));
	};

	/* if the user is already existed, return this user
	 * else return undefined
	 */
	this.queryUserByName = function(userName) {
		for (var x in userList) {
			if (userList[x].getName() == userName)
				return userList[x];
		}
	}
	this.queryUserByNumber = function(userNumber) {
		for (var x in userList) {
			if (userList[x].getNumber() == userNumber)
				return userList[x];
		}	
	}
	this.queryUserByEmail = function(userEmail) {
		for (var x in userList) {
			if (userList[x].getEmail() == userEmail)
				return userList[x];
		}	
	}
	this.queryUserByPhone = function(userPhone) {
		for (var x in userList) {
			if (userList[x].getPhone() == userPhone)
				return userList[x];
		}	
	}
	this.queryUser = function(infomation) {
		// 检查是否所有均为合法属性
		for (var keys in infomation) {
			if (!whetherContainProperty(keys))
				return;
		}
		// 是否所有提供的属性都匹配
		for (var i in userList) {
			var flag = true;
			for (var keys in infomation) {
				if (infomation[keys] != userList[i][keys]) {
					console.log(infomation[keys]);
					console.log("!=");
					console.log(userList[i][keys]);
					flag = false;
					break;
				}
			}
			if (flag)
				return userList[i];
		}
		return;
	}
	function whetherContainProperty(property) {
		if (property == 'userName') return true;
		if (property == 'userNumber') return true;
		if (property == 'userPhone') return true;
		if (property == 'userEmail') return true;
		if (property == 'password') return true;
		return false;
	}
}

module.exports = Storage;