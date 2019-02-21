//const url = 'wss://flavio-websockets-server-example.glitch.me';
//const url = 'wss://8080';
const url = 'ws://localhost:8080';
const connection = new WebSocket(url);

let dog = "Hello";
let input = {str: ""};

connection.onopen = () => {
  connection.send(text);
  console.log("open");
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
  console.log("err");
}

connection.onmessage = (e) => {
  console.log(e.data);
  document.getElementById("ret").innerHTML = e.data;
}

function send(){
  input.str = document.getElementById("txtinput").value;

  connection.send(document.getElementById("txtinput").value);

  $.get("/dog", (input) , function(data, status){
    document.getElementById("ret2").innerHTML = data;
    console.log("Data: " + data + "\nStatus: " + status);
  });
}