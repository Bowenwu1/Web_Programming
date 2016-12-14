var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");
var util = require("util");
var queryString = require("querystring");
function handler(storage, validator, page) {
    this.checkWhetherSubmitDataIsValid = function(data) {
            if (!validator.whetherContainAllProperty(data))
                return false;
            return ((validator.checkName(data['userName'])) &&
                    (validator.checkEmail(data['userEmail'])) &&
                    (validator.checkNumber(data['userNumber'])) &&
                    (validator.checkPhone(data['userPhone'])) );
    }.bind(this);
    this.submitHandler = function(request, response) {
        var post = '';
        request.on('data', function(chunk) {
            post += chunk;
        });
        request.on('end', function() {
            post = queryString.parse(post);
            if (this.checkWhetherSubmitDataIsValid(post)) {
                storage.createUser(post["userName"], post["userNumber"], post["userPhone"], post['userEmail']);
                page.showIndexPage(response);
            } else {
                page.show400Page(response);
            }
        }.bind(this));
    }.bind(this);

    this.indexHandler = function(request, response) {
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
    this.registHandler = function(request, response) {
        page.showRegistPage(response);
    }
    this.queryHandler = function(request, response) {
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

    this.staticFileRequestHandler = function(request, response, pathname) {
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

    this.getContentType = function(pathname) {
        var postFix = path.extname(pathname);
        postFix = postFix?postFix.slice(1):"unknown";
        var contentType = type[postFix] || "text/plain";
        return contentType;
    }
}

module.exports = handler;