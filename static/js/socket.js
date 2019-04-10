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
    console.log(state);
  }

  /*
  if (e.data == "turn") {
    getStateFromServer();
    console.log("turn");
  }

  try {
    let message = JSON.parse(e.data);
  }
  catch (err) {

  }


/*
  if (JSON.parse(e.data).tag == "state"){
    state = JSON.parse(e.data);
    console.log(state);
  }
  else {
    console.log(e.data)
  }
 */
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
  try{
    connection.send(JSON.stringify(state));
  }
  catch(err) {
    console.log(err)
  }  
}