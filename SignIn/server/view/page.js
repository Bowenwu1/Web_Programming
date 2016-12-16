var fs = require("fs");
var page = require('./page');
var querystring = require('querystring');
var url = require('url');
exports.show404Page = function(response) {
	response.writeHead(404, {"content-type":'text/html'});
		fs.readFile("./html/404.html", function(err, data) {
			response.end(data);
		});
};

exports.showIndexPage = function(response) {
	fs.readFile('./html/login.html', 'utf-8', function(err, data) {
		if (err) page.show404Page(response);
		else {
			response.writeHead(200, {'content-type':'text/html'});
			response.end(data);
		}
	});
};
exports.showRegistPage = function(response) {
	fs.readFile("./html/regist.html", 'utf-8', function(err, data) {
		if (err) page.show404Page(response);
		else {
			response.writeHead(200, {'content-type':'text/html'});
			response.end(data);
		}
	});
}
exports.showLogInFailPage = function(response) {
	fs.readFile('./html/login.html', 'utf-8', function(err, data) {
		if (err) page.show404Page(response);
		else {
			response.writeHead(200, {'content-type':'text/html'});
			response.end(data);
		}
	});
}
exports.showDetailPage = function(request, response, user) {
	fs.readFile('./html/detail.html', 'utf-8', function(err, data) {
		if (err) page.show404Page(response);
		else {
			data = data.replace(/@userName/, user['userName']);
			data = data.replace(/@userNumber/, user['userNumber']);
			data = data.replace(/@userPhone/, user['userPhone']);
			data = data.replace(/@userEmail/, user['userEmail']);
			var temp = querystring.parse(url.parse(request.url).query).userName;
			console.log("in show detail page");
			console.log(temp);
			if (temp) {
				data = data.replace(/@warning/, "只能查看自己的详情！");
			} else {
				data = data.replace(/@warning/, "");
			}
			response.writeHead(200, {'content-type':'text/html'});
			response.end(data);
		}
	});
};

exports.show400Page = function(response) {
	response.writeHead(400, {"content-type":'text/html'});
		fs.readFile("./html/400.html", function(err, data) {
			response.end(data);
		});	
}