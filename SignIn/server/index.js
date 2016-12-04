var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");
var util = require("util");
var queryString = require("querystring");
/* My Module */
var storage = new (require("./Storage"))();
var type = require("./types").types;
var validator = new (require("./Validator"))(storage);
var page = require("./page");

// http.createServer(function (request, response) {
// 	var pathname = url.parse(request.url).pathname;
// 	console.log("request from" + pathname);
// 	if (request.method.toLowerCase() == 'post' && pathname == "/submit") {
// 		// post路由 返回详情
// 		submitHandler(request, response);
// 	} else if (pathname == "/" || pathname == "") {
// 		// 初始路由
// 		indexHandler(request, response);
// 	} else if (request.method.toLowerCase() == 'post' && pathname == "/query") {
// 		// AJAX 查询用户是否合法
// 		queryHandler(request, response);
// 	} else {
// 		// 文件路由
// 		staticFileRequestHandler(request, response);
// 	}
// }).listen(8000);
var express = require("express");
var app = express();
app.get("/submit", submitHandler);
app.get("/", indexHandler);
app.get("", indexHandler);
app.get("/query", queryHandler);
app.listen(8000, function() {
	console.log("Server is running!");
})

function submitHandler(request, response) {
	var post = '';
	request.on('data', function(chunk) {
		post += chunk;
	});
	request.on('end', function() {
		post = queryString.parse(post);
		console.log(post);
		if (checkWhetherSubmitDataIsValid(post)) {
			storage.createUser(post["userName"], post["userNumber"], post["userPhone"], post['userEmail']);
			page.showDetailPage(response, post);
		} else {
			page.show400Page(response);
		}
	});
}

function checkWhetherSubmitDataIsValid(data) {
		if (!validator.whetherContainAllProperty(data))
			return false;
		return ((validator.checkName(data['userName'])) &&
				(validator.checkEmail(data['userEmail'])) &&
				(validator.checkNumber(data['userNumber'])) &&
				(validator.checkPhone(data['userPhone'])) );
}

function indexHandler(request, response) {
	var info = queryString.parse(url.parse(request.url).query);
	var infoSize = Object.getOwnPropertyNames(info).length;
	if (!infoSize) {
		page.showIndexPage(response);
	} else {
		var post = storage.queryUser(info);
		console.log("after queryUser");
		console.log(post);
		if (!post) {
				page.showIndexPage(response);
		} else {
			page.showDetailPage(response, post);
		}
	}
}

function queryHandler(request, response) {
	var post = '';
	request.on('data', function(chunk) {
		post += chunk;
	});
	request.on('end', function() {
		post = queryString.parse(post);
		// 没有校验post中的所有属性是否为user的合法属性
		console.log(post);
		response.writeHead(200, {'content-type':'text/plain'});
		var queryUser = storage.queryUser(post);
		if (queryUser == undefined) response.end("true");
		else response.end("repeated");
	});
}

function staticFileRequestHandler(request, response, pathname) {
	var pathname = url.parse(request.url).pathname;
	var contentType = getContentType(pathname);
		fs.readFile("." + pathname, function(err, data) {
			if (err) {
				page.show404Page(response);
			} else {
				response.writeHead(200, {"content-type":contentType});
				response.end(data);
			}
		});
}

function getContentType(pathname) {
	var postFix = path.extname(pathname);
	postFix = postFix?postFix.slice(1):"unknown";
	var contentType = type[postFix] || "text/plain";
	return contentType;
}