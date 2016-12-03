function User(userName, userNumber, userPhone, userEmail) {
	var Name = userName;
	var _Number = userNumber;
	var Phone = userPhone;
	var Email = userEmail;
	// 填坑
	this.userName = userName;
	this.userNumber = userNumber;
	this.userPhone = userPhone;
	this.userEmail = userEmail;
	this.getName = function() {
		return Name;
	}
	this.getNumber = function() {
		return _Number;
	}
	this.getPhone = function() {
		return Phone;
	}
	this.getEmail = function() {
		return Email;
	}
}
module.exports = User;