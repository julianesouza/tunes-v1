 
const express = require("express"); 
const path = require("path");
const bodyParser = require("body-parser"); 
const ejs = require("ejs");
const https = require("https");
const {config} = require('./config.js'); 
const mykey = config.MY_KEY;

const app = express();
const baseURL = "https://api.musixmatch.com/ws/1.1/";
const endURL = "&apikey=" + mykey;

let letra = "";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
    res.render("index", {
        success: false
    });
});

app.post("/", function(req, res){

    https.get("baseURL + "track.search?q_track=mad%20woman&q_artist=taylor%20swift&" + endURL", function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const tData = JSON.parse(data);
            console.log(tData);
        });

    });

    res.render("index", {
        success: true,
        lyrics: letra
    })
});

app.listen(3000, function(){
    console.log("server running on port 3000");
});

