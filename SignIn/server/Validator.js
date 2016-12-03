function Validator(s) {
	var storage = s;
	var namePattern = new RegExp(/^[a-zA-Z](\w){5,17}$/);
	// var emailPattern = new RegExp(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/);
	var emailPattern = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
	var numberPattern = new RegExp(/^[1-9][0-9]{7}$/);
	var phonePattern = new RegExp(/^[1-9][0-9]{10}$/);
	this.checkName = function(name) {
		if (!namePattern.test(name))
			return false;
		if (storage.queryUserByName(name))
			return false;
		return true;
	}
	this.checkEmail = function(email) {
		if (!emailPattern.test(email))
			return false;
		if (storage.queryUserByEmail(email))
			return false;
		return true;
	}
	this.checkNumber = function(number) {
		if (!numberPattern.test(number))
			return false;
		if (storage.queryUserByNumber(number))
			return false;
		return true;
	}
	this.checkPhone = function(phone) {
		if (!phonePattern.test(phone))
			return false;
		if (storage.queryUserByPhone(phone))
			return false;
		return true;
	}
	this.whetherContainAllProperty = function(data) {
		if (undefined == data['userName']) return false;
		if (undefined == data['userNumber']) return false;
		if (undefined == data['userPhone']) return false;
		if (undefined == data['userEmail']) return false;
		return true;
	}
}

module.exports = Validator;