const url = 'ws://localhost:8881';
const connection = new WebSocket(url);

//let dog = {1: "dog", 2: "dog"};

let doge = "dogge"
let dog = doge.replace("g", "")
//console.log("'" + dog + "'");


connection.onopen = () => {
  console.log("Socketopen");
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
}

connection.onmessage = (e) => {
    console.log("socket message: " + e.data);
  }    

function getStateFromServer(){
    connection.send(dog);
}