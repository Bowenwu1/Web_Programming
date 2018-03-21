var user = require("./User.js");
var crypto = require('crypto');
function Storage() {
	var userList = new Array();
	var MongoClient = require('mongodb').MongoClient,
		assert = require('assert');
	var dbUrl = "mongodb://localhost:27017/signin";
	MongoClient.connect(dbUrl, function(err, db) {
		if (err) {
			console.log("can't connect to mongoDB!");
			return;
		}
		console.log("connected correctly to mongoDB");
		var collection = db.collection('signin');
		collection.find({}).toArray(function(err, docs) {
				console.log("find all records");
				console.dir(docs);
				userList = docs;
			});
			db.close();
	})
	function MD5Encrypt(info) {
		var md5 = crypto.createHash('md5');
		md5.update(info);
		var result = md5.digest('hex');
		console.log("Encrypt to : ");
		console.log(result);
		return result;
	}
	// private:
	var insertUser = function(user) {
		MongoClient.connect(dbUrl, function(err, db) {
			if (err) {
			console.log("can't connect to mongoDB!");
			return;
		}
			console.log("connected correctly to mongoDB");
			console.log("ready to insert a user");
			var collection = db.collection('signin');
			user['password'] = MD5Encrypt(user['password']);
			collection.insertMany([user], function(err, result) {
				if (err)
					console.log("insert user fail");
				else
					console.log("insert user success");
			})
			collection.find({}).toArray(function(err, docs) {
				console.log("find all records");
				console.dir(docs);
				userList = docs;
			});
			db.close();
		});
	}

	this.createUser = function(userName, userNumber, userPhone, userEmail, password) {
		console.log("new user has been created !");
		insertUser(new user(userName, userNumber, userPhone, userEmail, password));
		// userList.push(new user(userName, userNumber, userPhone, userEmail, password));
		console.log(new user(userName, userNumber, userPhone, userEmail, password));
	};

	/* if the user is already existed, return this user
	 * else return undefined
	 */
	this.queryUserByName = function(userName) {
		for (var x in userList) {
			if (userList[x].userName == userName)
				return userList[x];
		}
	}
	this.queryUserByNumber = function(userNumber) {
		for (var x in userList) {
			if (userList[x].userNumber == userNumber)
				return userList[x];
		}	
	}
	this.queryUserByEmail = function(userEmail) {
		for (var x in userList) {
			if (userList[x].userEmail == userEmail)
				return userList[x];
		}	
	}
	this.queryUserByPhone = function(userPhone) {
		for (var x in userList) {
			if (userList[x].userPhone == userPhone)
				return userList[x];
		}	
	}
	this.queryUser = function(information) {
		// 检查是否所有均为合法属性
		for (var keys in information) {
			if (!whetherContainProperty(keys))
				return;
		}
		if (information['password'])
			information['password'] = MD5Encrypt(information['password']);
		// 是否所有提供的属性都匹配
		for (var i in userList) {
			var flag = true;
			for (var keys in information) {
				if (information[keys] != userList[i][keys]) {
					console.log(information[keys]);
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