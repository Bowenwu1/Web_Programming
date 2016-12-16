var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");
var util = require("util");
var queryString = require("querystring");
function handler(s, v, p) {
    this.storage = s;
    this.validator = v;
    this.page = p;
    this.checkWhetherSubmitDataIsValid = function(data) {
            if (!this.validator.whetherContainAllProperty(data))
                return false;
            return ((this.validator.checkName(data['userName'])) &&
                    (this.validator.checkEmail(data['userEmail'])) &&
                    (this.validator.checkNumber(data['userNumber'])) &&
                    (this.validator.checkPhone(data['userPhone'])) &&
                    this.validator.checkPassword(data['password']) );
    }.bind(this);

    this.submitHandler = function(request, response) {
        var post = '';
        request.on('data', function(chunk) {
            post += chunk;
        });
        request.on('end', function() {
            post = queryString.parse(post);
            if (this.checkWhetherSubmitDataIsValid(post)) {
                this.storage.createUser(post["userName"], post["userNumber"], post["userPhone"],
                post['userEmail'], post['password']);
                this.page.showIndexPage(response);
            } else {
                this.page.show400Page(response);
            }
        }.bind(this));
    }.bind(this);
    this.loginHandler = function(request, response) {
        var post = '';
        request.on('data', function(chunk) {
            post += chunk;
        });
        request.on('end', function() {
            post = queryString.parse(post);
            var user = this.storage.queryUser(post);
            if (user == undefined) {
                // login fail
                console.log("log in fail");
                this.page.showLogInFailPage(response);
            } else {
                this.page.showDetailPage(request, response,user);
            }
        }.bind(this));
    }.bind(this);
    this.indexHandler = function(request, response) {
        var info = queryString.parse(url.parse(request.url).query);
        var infoSize = Object.getOwnPropertyNames(info).length;
        if (!infoSize) {
            this.page.showIndexPage(response);
        } else {
            var post = this.storage.queryUser(info);
            console.log("after queryUser");
            console.log(post);
            if (!post) {
                    this.page.showIndexPage(response);
            } else {
                this.page.showDetailPage(request, response, post);
            }
        }
    }.bind(this);
    this.registHandler = function(request, response) {
        this.page.showRegistPage(response);
    }.bind(this);
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
            var queryUser = this.storage.queryUser(post);
            if (queryUser == undefined) response.end("true");
            else response.end("repeated");
        }.bind(this));
    }.bind(this);
    this.loginQueryHandler = function(request, response) {
        console.log("on loginQueryHandler");
        var post = '';
        request.on('data', function(chunk) {
            post += chunk;
        });
        var that = this;
        request.on('end', function() {
            response.writeHead(200, {'content-type':'text/plain'});
            console.log(post);
            post = queryString.parse(post);
            var queryUser = this.storage.queryUser(post);
            if (queryUser == undefined) response.end("fail");
            else response.end("loginsuccess");
        }.bind(that));
    }.bind(this);
    this.checkCookie = function(request, response, next) {
        console.log("in checkCookie middleware");
        var cookie = request.cookies;
        var obj = {userName : cookie['userName'], password : cookie['password']};
        var user = this.storage.queryUser(obj);
        if (user) {
            this.page.showDetailPage(request, response, user);
        } else {
            console.log("no legal cookie");
            return next();
        }
        // var userName = cookie['userName'];
        // var password = cookie['password'];
        // console.log(userName);
        // console.log(password);
    }.bind(this);
    this.errorHandler = function(request, response) {
        this.page.show404Page(response);
    }.bind(this);
}

module.exports = handler;