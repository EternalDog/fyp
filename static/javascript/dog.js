console.log("dog");

//const url = 'wss://flavio-websockets-server-example.glitch.me';
//const url = 'wss://8080';
const url = 'wss://localhost:8080';

const connection = new WebSocket(url);

connection.onopen = () => {
  connection.send('hey') 
  console.log("open");
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
  console.log(e.data)
}