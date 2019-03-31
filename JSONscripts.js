let fs = require("fs");

let map = (JSON.parse(fs.readFileSync("static/json/uk.json")));

let pse = [];


for (let i = 0; i < map.objects.UK.geometries.length; i++) {
    dog = map.objects.UK.geometries[i].properties;
    if (dog.TYPE_2 == "London Borough" 
        || dog.TYPE_2 == "London Borough (city)" 
        || dog.TYPE_2 == "London Borough (royal)") {
        console.log(i);
        map.objects.UK.geometries.splice(i, 1);
    }

    for (let index = 0; index < (pse.length); index++) {
        if (dog.ID_2 == pse[index]){
            console.log("dog: " + i);
            pse.splice(index, 1);
            map.objects.UK.geometries.splice(i, 1);
        }
    }

    if (dog.hasOwnProperty('Province_ID')){
        map.objects.UK.geometries[i].properties.Province_ID = i;
    }
    else {
        map.objects.UK.geometries[i].properties.Province_ID = i;
    }

}


wf();

function wf() {
    fs.writeFile("static/json/uk.json", JSON.stringify(map), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });  
}




