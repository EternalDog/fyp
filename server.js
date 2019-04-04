// R00137275
// Dominik Bahrynowski
// server

//imports
var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
const port = 8880;
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
//data assignment
//


var config = JSON.parse(fs.readFileSync("backend/config.json"));
var provinceData = JSON.parse(fs.readFileSync("static/json/uk.json"));

var provinces = [];
var nations = {};
var state = {
    config: {},
    provinces: [],
    nations: {},
};
state.config = config;
state.nations = config.nations;


//province constructor
function province(id, name, region, owner){
    this.id = id;
    this.name = name;
    this.region = region;
    this.owner = owner;
    this.pop = Math.floor(Math.random() * ((config.population_range) - 1 + 1)) + 1;
    this.buildings = [];
}

function poulateProvinceArray(){
    var dog;
    var owner;
    var obj = config.nations;

    for (i = 0; i < config.provinces; i++) {
        owner = "";
        dog = provinceData.objects.UK.geometries[i].properties;
        for (i2 = 0; i2 < Object.keys(config.nations).length; i2++){
            if (owner != ""){break}
            for (var prop in config.nations) {
                if ((obj[prop].provinces).indexOf(i) != -1){
                    //console.log("province " + i +" true, owner: " + prop)
                    owner = prop;                    
                }
                //else {console.log("province " + i +" false")}
            }
        }
        //if (owner == ""){console.log("province " + i +" false")}

        provinces.push(new province(i, dog.NAME_2, dog.NAME_1, owner));
    }
    provinces.push(new province((provinces.length), "London", "England", "Lutae"));
    state.provinces = provinces;
}

function findOwner(provinceID){
    //for (i = 0; i < config.nations.length; i++){
      //  console.log(config.nations[i]);
    //}
    return "dog";
}
poulateProvinceArray();


//nation constructor
function populateNationArray(){
    if (state != {}){
        state.nations = config.nations;
    }
}
populateNationArray();

//
// Socket
//

const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8881 })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
    
    if (message == "state") {
        ws.send(JSON.stringify(state));
    }
    else {
        ws.send("socket request err");
    }

  })
})

//
//auxiliary functions 
//

function p(text){
    console.log(text);
}


