const url = 'ws://localhost:8881';
const connection = new WebSocket(url);
let state = {};


connection.onopen = () => {
  connection.send("state");
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
}

connection.onmessage = (e) => {
  if (e.data == "Turn end"){
    console.log("Turn has ended, starting new round");
    getStateFromServer();
  }
  else {
    state = JSON.parse(e.data);
    refreshUI();
  }
}    

function getStateFromServer(){
  try{
    connection.send("state");
  }
  catch(err) {
    console.log(err)
  }  
}

function sendStateToServer(){
  $("#end_turn").prop("disabled", true);
  try{
    connection.send(JSON.stringify(state));
  }
  catch(err) {
    console.log(err)
  }  
}