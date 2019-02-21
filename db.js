//import module
const sqlite3 = require('sqlite3').verbose();
var CircularJSON = require('circular-json');

//create object
let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

app.get('/data', function(req, res){
    
  res.json(rows);
  
  db.all(`SELECT id, name, price, img FROM products LIMIT 300`, (err, rows) => {
      if(rows && err === null){
          console.log(rows);
          res.json(rows);
      }
      else {
          console.log('Error', err);
      }
  }
);
});
