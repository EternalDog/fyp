const url = 'ws://localhost:8881';
const connection = new WebSocket(url);
let state = {};


connection.onopen = () => {
  //console.log("Socketopen");
  connection.send("state");
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
}

connection.onmessage = (e) => {
  
  //console.log(e.data);

  if (e.data == "Turn end"){
    console.log("Turn has ended, starting new round");
    getStateFromServer();
  }
  else {
    state = JSON.parse(e.data);
    refreshUI();
    //console.log(state);
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