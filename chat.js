const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8882 })
let clients = [];
let chatlog = [];

wss.on('connection', (ws) => {
    console.log("Number of clients: " + wss.clients.size)
    clients.push(ws);
    ws.on('message', (message) => {
        console.log(message);

        chatlog.push(message);

        clients.forEach(function(client) {
            client.send( message);
        });
  })
})