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
    res.sendFile(path.join(__dirname + '/static/html/index.html'));
});

app.use('/', router);
app.listen(port);
console.log("Router running at Port " + port);

//

//

var provinces = [];
var nations = {};

var config = JSON.parse(fs.readFileSync("backend/config.json"));
var provinceData = JSON.parse(fs.readFileSync("static/json/uk.json"));
//console.log(provinceData.objects.UK.geometries);
//console.log(JSON.parse(dog).name);

//province constructor
function province(id, name, region){
    this.id = id;
    this.name = name;
    this.region = region;
    this.owner = "";
    this.pop = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    this.buildings = [];
}

function poulateProvinceArray(){
    var dog;
    for (i = 0; i < config.provinces; i++) {
        dog = provinceData.objects.UK.geometries[i].properties;
        provinces.push(new province(i, dog.NAME_2, dog.NAME_1));
    }
    //console.log(provinces);
}
poulateProvinceArray();


//nation constructor
function nation(id, name){
    this.id = id;
    this.name = name;
    
}

