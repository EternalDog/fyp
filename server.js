// R00137275
// Dominik Bahrynowski
// node.js

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
    turn: 0,
    nations_left: 8,
    config: {},
    provinces: [],
    nations: {},
    movement: [],
    player_nations: []
};
state.config = config;
state.nations = config.nations;


//province constructor
function province(id, name, region, owner){
    this.id = id;
    this.name = name;
    this.region = region;
    this.owner = owner;
    this.pop = Math.round( Math.floor(Math.random() * ((config.population_range) - 1 + 1)) + 1 );
    this.buildings = [];
    this.army = 0;
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

function extraProvinceData(){
    var prv;
    var nt;
    for (var i = 0; i < config.small_provinces.length; i++){
        prv = parseInt(config.small_provinces[i]);  
        state.provinces[prv].pop = Math.round(state.provinces[prv].pop * 0.3);
        //console.log(state.provinces[prv].pop);
    }
    for (var i2 = 0; i2 < config.capital_provinces.length; i2++){
        prv = config.capital_provinces[i2];  
        if (state.provinces[prv].pop < 2500) {
            state.provinces[prv].pop = (state.provinces[prv].pop + 2500) * 1.2;
        }
        else {
            state.provinces[prv].pop = (state.provinces[prv].pop + 1000) * 1.3;
        }
        Math.round(state.provinces[prv].pop);
    }
    for (i3 = 0; i3 < config.nation_names.length; i3++){
        nt = config.nations[config.nation_names[i3]];
        prv = nt.capital;
        state.provinces[prv].army = nt.army;
    }



}
extraProvinceData();

//
// Socket
//

const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8881 })
let clients = [];


wss.on('connection', (ws) => {
    console.log("Number of clients: " + wss.clients.size)
    clients.push(ws);
    ws.on('message', (message) => {
        if (message == "state") {
            console.log(`Received message => ${message}`);
            ws.send(JSON.stringify(state));
        }
        else {
            try {
                //state = JSON.parse(message);
                console.log("Received message => object")
                //movement.concat(JSON.parse(message).movement)
                state = process(JSON.parse(message), state); 
                PlayersEndedTurns++;
                if (TryEndTurn() == 1) { 
                    clients.forEach(function(client) {
                        PlayersEndedTurns = 0;
                        state.movement = [];
                        
                        client.send("Turn end");
                    });
                }
            }
            catch (err){
                console.log(err)
            }

        }

  })
})

//
//turn change
//
let PlayersEndedTurns = 0;
let doglet = {};
let movement = [];
let combatResults = [];
var attackedCapital = "";
let combatWinner = "";

function TryEndTurn(){
    if (PlayersEndedTurns < wss.clients.size){
        return 0;
    }
    else {
        state.turn++;
        return 1;
    }
}


function process(dog, dog2){

    if (dog.movement.length < 1) {
        return dog2;
    }

    doglet = dog;

    for (let I4 = 0; I4 < doglet.movement.length; I4++) {
        movement.push(doglet.movement[I4]);  
    }


    //movement += doglet.movement;
    attackedCapital = "";
    combatWinner = "";
    
    for (var i = 0; i < movement.length; i++){
        console.log("test");



        for (let index = 0; index < doglet.config.capital_provinces.length; index++) {
            if (doglet.provinces[movement[i][1]].id == doglet.config.capital_provinces[index]){
                console.log("attacking capital");
                attackedCapital = doglet.provinces[movement[i][1]].owner;
            }
        } 


        if (doglet.provinces[movement[i][1]].army == 0){//target province is empty
            //console.log("prov empty");
            combatWinner = "attacker";
            console.log("Combat winner: " + combatWinner);
            if (doglet.provinces[movement[i][1]].owner != doglet.provinces[movement[i][0]].owner ){
                doglet.provinces[movement[i][1]].army = RNG(doglet.provinces[movement[i][0]].army * 0.95, doglet.provinces[movement[i][0]].army); 
            }
            else {doglet.provinces[movement[i][1]].army = doglet.provinces[movement[i][0]].army}
            doglet.provinces[movement[i][1]].owner = doglet.provinces[movement[i][0]].owner;
            doglet.provinces[movement[i][0]].army = 0;
        }
        else{
            console.log("combat, army1: " + doglet.provinces[movement[i][0]].army + " army2: " + doglet.provinces[movement[i][1]].army);
            combatResults = combat( doglet.provinces[movement[i][0]].army, doglet.provinces[movement[i][1]].army);
            Math.round(combatResults[0]);
            Math.round(combatResults[1]);
            console.log("combat res, army1: " + combatResults[0] + " army2: " + combatResults[1]);
            //console.log(combatResults);
            if ( combatResults[0] == 0){//attacker looses
                combatWinner = "defender";
                console.log("Combat winner: " + combatWinner);
                doglet.provinces[movement[i][0]].army = 0; 
            }
            else {//attacker wins
                combatWinner = "attacker";
                console.log("Combat winner: " + combatWinner);
                doglet.provinces[movement[i][1]].owner = doglet.provinces[movement[i][0]].owner;             
                doglet.provinces[movement[i][1]].army = combatResults[0];
                doglet.provinces[movement[i][0]].army = 0;    
            } 
        } 

        for (let i3 = 0; i3 < doglet.provinces.length; i3++) {
            try {
                doglet.nations[doglet.provinces[i3].owner].funds += Math.round( doglet.provinces[i3].pop * 0.025 );
                doglet.provinces[i3].pop += Math.round( doglet.provinces[i3].pop * 0.005 );
                doglet.provinces[i3].pop = Math.round(doglet.provinces[i3].pop);
            } catch (error) {
                console.log(error)
            }   
        }


    }
    return doglet;
}

function annex(nation1, nation2){
    var n2 = doglet.nations[nation2];
    var prvs = doglet.nations[nation2].provinces;
    console.log(nation1, nation2);
    (doglet.nations[nation1].provinces).concat(prvs)
    for (let index = 0; index < prvs.length; index++) {
        if (doglet.provinces[prvs[index]].owner != nation1){
            doglet.provinces[prvs[index]].army = 0;
        }
        doglet.provinces[prvs[index]].owner = nation1;
        
    }
    //console.log("n2: " + n2);
    //console.log("prvs: " + prvs);
    //doglet.config.capital_provinces.splice(doglet.config.capital_provinces.indexOf(doglet.nations[nation2].capital)); 
    //doglet.config.nation_names.splice(doglet.config.nation_names.indexOf(nation2)); 
    //delete doglet.nations[nation2];
    doglet.nations_left--; 
}

function combat(army1, army2){
    if ( army1 >= army2 ){
        console.log("army1 >= army2");
        if ( (army1) > (army2 * 10) ){
            return [army1, 0];
        }
        else if ( (army1) > (army2 * 4) ){
            if (roll_d(6) == 1){return [ RNG( army1 * 0.75, army1 ), 0];}
            else {return [ RNG( army1 * 0.9, army1 ), 0];}
        }
        else if ( (army1) > (army2 * 2) ){
            if (roll_d(6) == 1){return [ RNG( army1 * 0.5, army1 ), 0];}
            else {return [ RNG( army1 * 0.7, army1 ), 0];}
        }
        else if ( (army1) > (army2 * 1.5) ){
            if (roll_d(6) == 1){return [ RNG( army1 * 0.2, army1 ), 0];}
            else {return [ RNG( army1 * 0.6, army1 ), 0];}
        }
        else if ( (army1) > (army2 * 1.2) ){
            if (roll_d(6) == 1){return [ RNG( army1 * 0.05, army1 ), 0];}
            else {return [ RNG( army1 * 0.3, army1 ), 0];}
        }
        else if ( (army1) >= (army2 * 1) ){
            //console.log("even fight");
            while (army1 > 1 && army2 > 1){
                army1 = RNG(0, army1 * 0.5);
                if (army1 < 1){army1 = 0}
                army2 = RNG(0, army2 * 0.5);
                if (army2 < 1){army2 = 0}
            }
            return [army1, army2];
        }
    }

    if ( army1 < army2 ){
        console.log("army1 < army2");
        if ( (army2) > (army1 * 10) ){
            return [0, army2];
        }
        else if ( (army2) > (army1 * 4) ){
            if (roll_d(6) == 1){return [0, RNG( army2 * 0.75, army2 )];}
            else {return [0,  RNG( army2 * 0.9, army2 )];}
        }
        else if ( (army2) > (army1 * 2) ){
            if (roll_d(6) == 1){return [0,  RNG( army2 * 0.5, army2 )];}
            else {return [0, RNG( army2 * 0.7, army2 )];}
        }
        else if ( (army2) > (army1 * 1.5) ){
            if (roll_d(6) == 1){return [ 0,  RNG( army2 * 0.2, army2 )];}
            else {return [0, RNG( army2 * 0.6, army2 )];}
        }
        else if ( (army2) > (army1 * 1.2) ){
            if (roll_d(6) == 1){return [ 0, RNG( army2 * 0.05, army2 )];}
            else {return [0,  RNG( army2 * 0.3, army2 )];}
        }
        else if ( (army2) > (army1 * 1) ){
            while (army1 > 1 && army2 > 1){
                army1 = RNG(0, army1 * 0.5);
                if (army1 < 1){army1 = 0}
                army2 = RNG(0, army2 * 0.5);
                if (army2 < 1){army2 = 0}
            }
            return [army1, army2];
        }
    }
}


//
//auxiliary functions 
//

function roll_d(max){
    return Math.floor(Math.random() * (max) + 1);
}

function RNG(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function p(text){
    console.log(text);
}


