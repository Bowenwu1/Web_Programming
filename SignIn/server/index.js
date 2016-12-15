var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");
var util = require("util");
var queryString = require("querystring");
/* My Module */
var storage = new (require("./module/Storage"))();
var type = require("./types").types;
var validator = new (require("./module/Validator"))(storage);
var page = require("./view/page");
var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();
var handler = new (require("./controller/handlers"))(storage, validator, page);

app.use(cookieParser());
app.use(express.static('.'));
app.use(handler.checkCookie);
app.post("/submit", handler.submitHandler);
app.get("/", handler.indexHandler);
app.get("", handler.indexHandler);
app.get("/regist", handler.registHandler);
app.post("/query", handler.queryHandler);
app.post("/loginquery", handler.loginQueryHandler);
app.post("/login", handler.loginHandler);
// loginquery
// login
app.listen(8000, function() {
	console.log("Server is running!");
})
