// R00137275
// Dominik Bahrynowski

//imports
var express = require("express");
var path = require("path");
var fs = require("fs");


var app = express();

let port = 8888;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/static', express.static('static'));
var router = express.Router();
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/front/index.html'));
});

app.use('/', router);
app.listen(port);
console.log("Router running at Port " + port);

var dog = fs.readFileSync("backend/config.json");
console.log(JSON.parse(dog).name);


