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
	response.render('login');
};
exports.showRegistPage = function(response) {
	response.render('regist');
}
exports.showLogInFailPage = function(response) {
	response.render('login');	
}
exports.showDetailPage = function(request, response, user) {
	var temp = querystring.parse(url.parse(request.url).query).userName;
	if (temp) {
		user['warning'] = "只能查看自己的详情！";
	} else {
		user['warning'] = "";
	}
	response.render('detail', user);
};

exports.show400Page = function(response) {
	response.render('400');
}