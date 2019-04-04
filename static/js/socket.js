const url = 'ws://localhost:8881';
const connection = new WebSocket(url);


connection.onopen = () => {
  console.log("Socketopen");
  connection.send("state");
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
}

connection.onmessage = (e) => {
    //console.log("socket message: ");
    //console.log(e.data)
  state = JSON.parse(e.data);
  console.log(state)
}    

function getStateFromServer(){
  
  //todo

  /*
  do {
    try {
    connection.send("state");
    }
    catch(err){
     console.log(err)
    }
  }
  while (connection.readyState == 0){

  }
  //console.log(connection.readyState)
  //

  */
}