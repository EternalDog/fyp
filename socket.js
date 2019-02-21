const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })

console.log("Web socket open on port 8080");

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    
    console.log(`Received message => ${message}`)

    if (message == "dog"){
      ws.send('dog confirmed');
    }
    else {
      ws.send('not dog');
    }

  })
  //ws.send('Hello')
})