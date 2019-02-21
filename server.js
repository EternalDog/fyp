// R00137275
// Dominik Bahrynowski

var express = require("express");
var app = express();
var path = require("path");
let port = 3000;

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
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/', router);
app.listen(port);
console.log("Router running at Port " + port);

//
//
//


var CircularJSON = require('circular-json');

app.get('/dog', function(req, res){
    
    var input = (CircularJSON.stringify(req.query.str).replace('"','')).replace('"','');
    console.log(input);

    //console.log(req.params.str);

    
    if (input == "dog"){
        res.send("dog confirmed");
    } 
    else {
        res.send("not dog"); 
    }

    
});

app.post('/pies', function(req, res){
    
    res.send(rows);
    
    
});


