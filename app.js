 
const express = require("express"); 
const path = require("path");
const bodyParser = require("body-parser"); 
const ejs = require("ejs");
const {config} = require('./config.js'); 
const mykey = config.MY_KEY;
const axios = require('axios');
const app = express();
const baseURL = "https://api.musixmatch.com/ws/1.1/";
const endURL = "&apikey=" + mykey;

let letra = "";
let id = 0;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
    res.render("index", {
        success: false
    });
});

app.post("/", function(req, res){

axios
  .get(baseURL + "track.search?callback=callback&q_track=red&q_artist=taylor%20swift&apikey=" + endURL)
  .then((response) => {
    console.log(response.data.message.body.track_list[0].track.track_id);
  })
  .catch((error) => {
    console.log(error);
  });
    
    res.render("index", {
        success: true,
        lyrics: letra
    })
});

app.listen(3000, function(){
    console.log("server running on port 3000");
});

