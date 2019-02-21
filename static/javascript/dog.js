//const url = 'wss://flavio-websockets-server-example.glitch.me';
//const url = 'wss://8080';
const url = 'ws://localhost:8080';
const connection = new WebSocket(url);

let dog = {1: "dog", 2: "dog"};

connection.onopen = () => {
  connection.send(dog);
  console.log("open");
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
  console.log("err");
}

connection.onmessage = (e) => {
  console.log(e.data);
}