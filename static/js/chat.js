const churl = 'ws://localhost:8882';
const chconnection = new WebSocket(churl);
let chat = [];


chconnection.onopen = () => {
  //console.log("Socketopen");

}

chconnection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
}

chconnection.onmessage = (e) => {
    console.log(e.data);
    chat.push(e.data);
    document.getElementById("TE").innerHTML = document.getElementById("TE").innerHTML + e.data + "\n"
}    

function sendMessage(){
  console.log("sending message: " + $("#TI").val())
  try{
    chconnection.send( playerNation + ": " + $("#TI").val());
  }
  catch(err) {
    console.log(err)
  }  
}
