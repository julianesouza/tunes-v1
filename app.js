 
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

    https.get("https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=red&q_artist=taylor%20swift&apikey=50dd12f56ed7a95a81d0b721f70b19e2", function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            var a = data.toString('utf8');
            JSON.stringify(a);
            console.log(a);
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

